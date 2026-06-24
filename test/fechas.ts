import { PDate } from '../src/index'

function assert(condition: boolean, message: string) {
	if (!condition) {
		console.error(`❌ FAIL: ${message}`)
		process.exit(1)
	} else {
		console.log(`✅ PASS: ${message}`)
	}
}

console.log("Starting tests for PDate...\n")

// 1. Parsing of timezone-agnostic standard ISO formats (should parse as local time)
const date1 = new PDate('2026-06-24T12:30:45.123Z')
assert(date1.year === 2026, "Year should be 2026")
assert(date1.month === 6, "Month should be 6")
assert(date1.day === 24, "Day should be 24")
assert(date1.hour === 12, "Hour should be 12 (local)")
assert(date1.minute === 30, "Minute should be 30")
assert(date1.second === 45, "Second should be 45")
assert(date1.millisecond === 123, "Millisecond should be 123")
assert(date1.timezoneOffset === 0, "Timezone offset for 'Z' should be 0")
assert(date1.toString('@y-@mm-@dd @hh:@ii:@ss @TZ') === '2026-06-24 12:30:45 +00:00', "Format with @TZ should output +00:00")
assert(date1.toString('@y-@mm-@dd @hh:@ii:@ss @tz') === '2026-06-24 12:30:45 +00', "Format with @tz should output +00")

// 2. Parsing offset timezone indicators (e.g. +02:00, -0500)
const date2 = new PDate('2026-06-24T12:30:45.123+02:00')
assert(date2.hour === 12, "Hour should be 12 (ignores offset for local date)")
assert(date2.timezoneOffset === 120, "Timezone offset for '+02:00' should be 120 minutes")
assert(date2.toString('@TZ') === '+02:00', "toString @TZ should format +02:00")
assert(date2.toString('@tz') === '+02', "toString @tz should format +02")

const date3 = new PDate('2026-06-24T12:30:45-0500')
assert(date3.hour === 12, "Hour should be 12 (local)")
assert(date3.timezoneOffset === -300, "Timezone offset for '-0500' should be -300 minutes")
assert(date3.toString('@TZ') === '-05:00', "toString @TZ should format -05:00")
assert(date3.toString('@tz') === '-05', "toString @tz should format -05")

// 3. Support for flexible separators (slashes, hyphens) in ISO-like and human-like dates
const dateIsoSlashes = new PDate('2026/06/24 12:30:00')
assert(dateIsoSlashes.year === 2026 && dateIsoSlashes.month === 6 && dateIsoSlashes.day === 24, "Should parse ISO-like format with slashes")

const dateHumanHyphens = new PDate('24-06-2026 12:30:00')
assert(dateHumanHyphens.year === 2026 && dateHumanHyphens.month === 6 && dateHumanHyphens.day === 24, "Should parse human-like format with hyphens")

const dateHumanDots = new PDate('24.06.2026 12:30:00')
assert(dateHumanDots.year === 2026 && dateHumanDots.month === 6 && dateHumanDots.day === 24, "Should parse human-like format with dots")

// 4. Number parsing as timestamps
const timestamp = 1719234028000 // June 24, 2024 13:00:28 UTC
const dateTimestamp = new PDate(timestamp)
assert(!dateTimestamp.isInvalidDate, "Timestamp should be parsed as a valid date")
assert(dateTimestamp.timestamp === timestamp, "Parsed timestamp should match input")

// 5. Getter/setter validation and consistency
const dateVal = new PDate('2026-06-24')
try {
	dateVal.month = 15 // should not roll over because of stricter validations? Wait, JS Date.setMonth(14) rolls over, but is it allowed here?
	// The setter does this.engine.setMonth(value - 1) which JS rolls over.
	// But let's check invalid date setter error throwing:
	const invalidDate = new PDate('invalid')
	assert(invalidDate.isInvalidDate, "Should be invalid date")
	
	let threw = false
	try {
		invalidDate.month = 5
	} catch (e) {
		threw = true
	}
	assert(threw, "Setting month on invalid date should throw an error")
} catch (e) {
	assert(false, "Getter/setter tests failed: " + e)
}

// 6. week getter
const dateWeek = new PDate('2026-01-01') // January 1st
assert(dateWeek.week === 1, "Week of January 1st should be 1")

const dateFull = new PDate('2026-01-01 00:00') // January 1st
assert(dateFull.toString() === '2026-01-01 00:00:00.000', "Regular date")

// 7. setClockTime / clearClockTime optimization
const clockDate = new PDate('2026-06-24')
clockDate.setClockTime('123045') // 12:30:45
assert(clockDate.hour === 12 && clockDate.minute === 30 && clockDate.second === 45, "setClockTime('123045') should set 12:30:45")

clockDate.setClockTime('1545') // 15:45:00
assert(clockDate.hour === 15 && clockDate.minute === 45 && clockDate.second === 0, "setClockTime('1545') should set 15:45:00")

clockDate.setClockTime('10') // 10:00:00
assert(clockDate.hour === 10 && clockDate.minute === 0 && clockDate.second === 0, "setClockTime('10') should set 10:00:00")

clockDate.clearClockTime()
assert(clockDate.hour === 0 && clockDate.minute === 0 && clockDate.second === 0 && clockDate.millisecond === 0, "clearClockTime should reset all time units to 0")

// 8. MS padding parsing
const dateMsPadding = new PDate('24/06/2026 12:00:00.4')
assert(dateMsPadding.millisecond === 400, "Millisecond with single digit .4 should be parsed as 400ms")

const dateMsPadding2 = new PDate('24/06/2026 12:00:00.04')
assert(dateMsPadding2.millisecond === 40, "Millisecond with double digit .04 should be parsed as 40ms")

// 9. Invalid month validation in human format regex
const dateInvalidMonth = new PDate('15/15/2026')
assert(dateInvalidMonth.isInvalidDate, "Should treat month 15 as invalid in human format")

assert(new PDate('7').toString() === '2026-06-07 00:00:00.000', 'Fast create')

console.log("\nAll tests completed successfully! 🎉")