import { PDate } from '../src/index'

const fecha = new PDate('2024-10-28')
console.log(fecha.toString())

const fecha2 = new PDate('2024-10-28 23:57:10.056')
console.log(fecha2.toString())

console.log(fecha2.minutesDifference(fecha))