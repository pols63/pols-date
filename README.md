# Pols-Date

Class for management date and time.

```javascript
import { PDate } from 'pols-date'

const now = new PDate
```

It use a `Date` object internally.

## Constructor

### Current date and time
```javascript
const mydate = new PDate
```

### Pass string parameter
```javascript
const mydate1 = new PDate('2025-03-06') //Pass only date. Time is 00:00:00.000
const mydate2 = new PDate('2025-03-06 18:30:00') //Pass date and time
const mydate3 = new PDate('2025-03-06 18:30:00.000') //Pass date and time with millisecond
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
* `day`: Get/Set the month.
* `weekDay`: Get the week day (`0` for Sunday through `6` for Saturday).
* `hour`: Get/Set the hour.
* `minute`: Get/Set the minute.
* `second`: Get/Set the second.
* `millisecond`: Get/Set the millisecond.
* `timestamp`: Get the timestamp value.
* `isInvalidDate`: Get if is invalid date.

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
* `toString(mask?, language?): string`: Get string representation. `mask` is a string value, it recognizes those wildcards:

	* `@y`: Year
	* `@m`: Month one digit (`1` for january through `12` for december).
	* `@mm`: Month with zero (`01` for january through `12` for december).
	* `@mmm`: Shortname for Month (`Jan` for january through `Dec` for december).
	* `@mmmm`: Name for Month (`January` for january through `Dececember` for december).
	* `@d`: Day one digit (`1` through `31`).
	* `@dd`: Day with zero (`01` through `31`).
	* `@ddd`: Short weekday name (`Sun` for sunday through `Sat` for saturday).
	* `@dddd`: Weekday name (`Sunday` for sunday through `Saturday` for saturday).
	* `@w`: Week number on the year.
	* `@h`: 24-Hour one digit (`0` through `23`).
	* `@hh`: 24-Hour with zero (`00` through `23`).
	* `@o`: 12-Hour one digit (`1` through `12`).
	* `@oo`: 12-Hour with zero (`01` through `12`).
	* `@i`: Minute one digit (`0` through `59`).
	* `@ii`: Minute with zero (`00` through `59`).
	* `@s`: Second one digit (`0` through `59`).
	* `@ss`: Second with zero (`00` through `59`).
	* `@l`: Millisecond one digit (`0` through `999`).
	* `@ll`: Millisecond with zero (`00` through `999`).
	* `@lll`: Millisecond with zero (`000` through `999`).
	* `@e`: 12-Hour symbol (`a` and `p`).
	* `@ee`: 12-Hour symbol (`am` and `pm`).
	* `@eee`: 12-Hour symbol (`a.m.` and `p.m.`).
	* `@E`: 12-Hour symbol (`A` and `P`).
	* `@EE`: 12-Hour symbol (`AM` and `PM`).
	* `@EEE`: 12-Hour symbol (`A.M.` and `P.M.`).
	

```javascript
const date = new PDate('2025-03-06 18:30:45.567')

console.log(date.toString()) // 2025-03-06 18:30:45.567
console.log(date.toString('@y-@mm-@dd @hh:@ii:@ss.@lll')) // 2025-03-06 18:30:45.567
console.log(date.toString('@y-@m-@d')) // 2025-3-6
console.log(date.toString('@dd/@mm/@y')) // 06/03/2025
```

* `toJSON(): string`: Like to `toString()`.

## Date manipulation

Change some part of the date:

```javascript
const date = new PDate('2025-03-06 18:30:45.567')

date.month = 12 // 2025-12-06 18:30:45.567
date.month += 2 // 2026-02-06 18:30:45.567
date.addMonth(2) // 2026-04-06 18:30:45.567; same to date.month += 2
date.addMonth(-3) // 2026-01-06 18:30:45.567; same to date.month -= 3
date.addMonth(1).addDay(3) // 2026-02-09 18:30:45.567
```

Invalid date

```javascript
const date = new PDate('invalid value')

console.log(date.isInvalidDate) // true
date.addMonth(1) // throw Error
console.log(date.toDate()) // null
console.log(date.clone()) // null
console.log(date.toString()) // ''
```