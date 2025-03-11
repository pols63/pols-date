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

## Methods

* `setFrom(value)`: Update the date using `value`, that must be the same type for the constructor.
* `addYear(value)`: Increase/decrease year.
* `addMonth(value)`: Increase/decrease month.
* `addDay(value)`: Increase/decrease day.
* `addHour(value)`: Increase/decrease hour.
* `addMinute(value)`: Increase/decrease minute.
* `addSecond(value)`: Increase/decrease second.
* `addMillisecond(value)`: Increase/decrease millisecond.
* `clearClockTime()`: Set `00:00:00.000` for time.
* `setClockTime(value)`: Set the clock time.

```javascript
mydate.setClockTime('15:20:30')
/* or */
mydate.setClockTime('15:20:30.000')
```

* `daysDifference(value)`: Get the days difference between this object and another PDate.

```javascript
const date1 = new PDate('2025-01-01')
const date2 = new PDate('2025-01-10')
console.log(date1.daysDifference(date2)) // -9
console.log(date2.daysDifference(date1)) // 9
```
* `minutesDifference(value)`: Get the minutes difference between this object and another PDate.

```javascript
const date1 = new PDate('2025-01-01 00:01:00')
const date2 = new PDate('2025-01-01 00:58:30')
console.log(date1.minutesDifference(date2)) // -57
console.log(date2.minutesDifference(date1)) // 57
```

* `clone()`: Get a copy of this object.
* `toDate()`: Get a copy of this engine object.
* `toString(mask?, language?)`: Get string representation. `mask` is a string value, it recognizes those wildcards:

	* `@y`: Year
	* `@m`: Month with one digit (`1` for january and `12` for december).
	* `@mm`: Month with zero (`01` for january and `12` for december).
	* `@mmm`: Shortname for Month (`Jan` for january and `Dec` for december).
	* `@mmmm`: Name for Month (`January` for january and `Dececember` for december).
	* `@d`: Day with one digit (`1` through `31`).
	* `@dd`: Day with zero (`01` through `31`).

```javascript
const date = new PDate('2025-03-06 18:30:45.567')
```

## Date manipulation