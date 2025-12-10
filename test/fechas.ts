import { PDate } from '../src/index'

// const date1 = new PDate('2025-01-01 00:01:00')
// const date2 = new PDate('2025-01-01 00:58:30')
// console.log(date1.minutesDifference(date2)) // -9
// console.log(date2.minutesDifference(date1)) // 9

// console.log(new PDate('2025'))

// console.log(new PDate('13:00:00'))

// console.log(new PDate('2025-03-07').setClockTime('123'))
// console.log(new PDate('2025-03-07').setClockTime('23:80:34'))

// console.log(new PDate('56').toString())
// console.log(new PDate('5624').toString())
// console.log(new PDate('16').toString())
// console.log(new PDate('312').toString())
// console.log(new PDate('15/09/2025').toString())


const date1 = new PDate('2025-01-01 00:01:00')
const date2 = new PDate('2025-01-01 00:58:30')

console.log(date1.difference(date2).toString())
console.log(date1.difference().toString())