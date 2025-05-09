# Pols-Date

Class for managin date and time.

```javascript
import { PDate } from 'pols-date'

const now = new PDate
```

It uses a `Date` object internally.

## Constructor

### Current date and time
```javascript
const mydate = new PDate
```

### Pass string parameter
```javascript
const mydate1 = new PDate('2025-03-06') // Pass only date. Time is 00:00:00.000
const mydate2 = new PDate('2025-03-06 18:30:00') // Pass date and time
const mydate3 = new PDate('2025-03-06 18:30:00.000') // Pass date and time with millisecond
const mydate4 = new PDate('1') // Create a date with current year, current month, 1st, and current clock time
const mydate5 = new PDate('15') // Create a date with current year, current month, 15th, and current clock time
const mydate6 = new PDate('1503') // Create a date with current year, March, 15th, and current clock time
const mydate7 = new PDate('150325') // Create a date with 2025, March, 15th, and current clock time
```

### Use Date object
```javascript
const anotherdate = new Date
const mydate = new PDate(anotherdate) //Copy another Date
```

### Use PDate object
```javascript
const anotherdate = new PDate
const mydate = new PDate(anotherdate) //Copy another PDate
```

### Pass values
```javascript
const mydate = new PDate({
	year: 2025, //optional
	month: 3, //optional
	day: 6, //optional
	hour: 18, //optional
	minute: 30, //optional
	second: 0, //optional
	millisecond: 0, //optional
})
```

## Properties

* `engine`: Get/Set the Date internal object.
* `year`: Get/Set the year.
* `month`: Get/Set the month.
* `day`: Get/Set the day.
* `weekDay`: Get the week day (`0` for Sunday through `6` for Saturday).
* `hour`: Get/Set the hour.
* `minute`: Get/Set the minute.
* `second`: Get/Set the second.
* `millisecond`: Get/Set the millisecond.
* `timestamp`: Get the timestamp value.
* `isInvalidDate`: Returns `true` if the date is invalid.

## Methods

* `setFrom(value): this`: Update the date using `value`, that must be the same type for the constructor.
* `addYear(value): this`: Increase/decrease year.
* `addMonth(value): this`: Increase/decrease month.
* `addDay(value): this`: Increase/decrease day.
* `addHour(value): this`: Increase/decrease hour.
* `addMinute(value): this`: Increase/decrease minute.
* `addSecond(value): this`: Increase/decrease second.
* `addMillisecond(value): this`: Increase/decrease millisecond.
* `clearClockTime(): this`: Set `00:00:00.000` for time.
* `setClockTime(value): this`: Set the clock time.

```javascript
mydate.setClockTime('15:20:30')
/* or */
mydate.setClockTime('15:20:30.000')
```

* `daysDifference(value): number`: Get the days difference between this object and another PDate.

```javascript
const date1 = new PDate('2025-01-01')
const date2 = new PDate('2025-01-10')
console.log(date1.daysDifference(date2)) // -9
console.log(date2.daysDifference(date1)) // 9
```
* `minutesDifference(value): number`: Get the minutes difference between this object and another PDate.

```javascript
const date1 = new PDate('2025-01-01 00:01:00')
const date2 = new PDate('2025-01-01 00:58:30')
console.log(date1.minutesDifference(date2)) // -57
console.log(date2.minutesDifference(date1)) // 57
```

* `clone(): PDate instance`: Get a copy of this object.
* `toDate(): Date instance`: Get a copy of this engine object.
* `toString(mask?, language?): string`: Get string representation.

	* `mask` is a string value, it recognizes those wildcards:
		* `@y`: Year
		* `@m`: Month (`1` for january through `12` for december).
		* `@mm`: Month with leading zero (`01` for january through `12` for december).
		* `@mmm`: Shortname for Month (`Jan` for january through `Dec` for december).
		* `@mmmm`: Name for Month (`January` for january through `December` for december).
		* `@d`: Day (`1` through `31`).
		* `@dd`: Day with leading zero (`01` through `31`).
		* `@ddd`: Short weekday name (`Sun` for sunday through `Sat` for saturday).
		* `@dddd`: Weekday name (`Sunday` for sunday through `Saturday` for saturday).
		* `@w`: Week number on the year.
		* `@h`: 24-Hour format (`0` through `23`).
		* `@hh`: 24-Hour format with leading zero (`00` through `23`).
		* `@o`: 12-Hour format (`1` through `12`).
		* `@oo`: 12-Hour format with leading zero (`01` through `12`).
		* `@i`: Minute (`0` through `59`).
		* `@ii`: Minute with leading zero (`00` through `59`).
		* `@s`: Second one digit (`0` through `59`).
		* `@ss`: Second with leading zero (`00` through `59`).
		* `@l`: Millisecond one digit (`0` through `999`).
		* `@ll`: Millisecond with leading zero (`00` through `999`).
		* `@lll`: Millisecond with leading zero (`000` through `999`).
		* `@e`: 12-Hour format symbol (`a` and `p`).
		* `@ee`: 12-Hour format symbol (`am` and `pm`).
		* `@eee`: 12-Hour format symbol (`a.m.` and `p.m.`).
		* `@E`: 12-Hour format symbol (`A` and `P`).
		* `@EE`: 12-Hour format symbol (`AM` and `PM`).
		* `@EEE`: 12-Hour format symbol (`A.M.` and `P.M.`).
	* `language`: Set the language for the month names and weekday names. If it doesn't use, the static property `PDate.language` prevails.

```javascript
const date = new PDate('2025-03-06 18:30:45.567')

console.log(date.toString()) // 2025-03-06 18:30:45.567
console.log(date.toString('@y-@mm-@dd @hh:@ii:@ss.@lll')) // 2025-03-06 18:30:45.567
console.log(date.toString('@y-@m-@d')) // 2025-3-6
console.log(date.toString('@dd/@mm/@y')) // 06/03/2025
```

* `toJSON(): string`: Like to `toString()`.

## Static Class Properties

* `language`: Set the language for all `toString` methods for all instances `PDate`.

## Date manipulation

### Change some part of the date:

```javascript
const date = new PDate('2025-03-06 18:30:45.567')

date.month = 11 // Set month to 11: 2025-11-06 18:30:45.567
date.month += 2 // Add two months: 2026-01-06 18:30:45.567
date.addMonth(2) // Add two months: 2026-03-06 18:30:45.567; same to date.month += 2
date.addMonth(-3) // Substract three months: 2025-12-06 18:30:45.567; same to date.month -= 3
date.addMonth(1).addDay(3) // Add one month and three days: 2025-01-09 18:30:45.567
```

### Invalid date

```javascript
const date = new PDate('invalid value')

console.log(date.isInvalidDate) // true
date.addMonth(1) // Throws Error: The date is invalid
```
The following methods will throw an error if called on an invalida date:

* `addYear(value)`
* `addMonth(value)`
* `addDay(value)`
* `addHour(value)`
* `addMinute(value)`
* `addSecond(value)`
* `addMillisecond(value)`

The following properties will throw an error if modified on an invalida date:

* `year`
* `month`
* `day`
* `hour`
* `minute`
* `second`
* `millisecond`

The following methods and properties will return `undefined` when called on an invalid date:

```javascript
console.log(date.year) // Returns undefined
console.log(date.month) // Returns undefined
console.log(date.day) // Returns undefined
console.log(date.weekDay) // Returns undefined
console.log(date.hour) // Returns undefined
console.log(date.minute) // Returns undefined
console.log(date.second) // Returns undefined
console.log(date.millisecond) // Returns undefined
console.log(date.toDate()) // Returns undefined
console.log(date.clone()) // Returns undefined
console.log(date.toString()) // Returns ''
```