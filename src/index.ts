import { PLanguages, PUtilsDate, PUtilsNumber, PUtilsString } from "pols-utils"

/**
 * Type for the constructor parameter.
 */
export type PDateParams = string | number | Date | PDate | {
	year?: number
	month?: number
	day?: number
	hour?: number
	minute?: number
	second?: number
	millisecond?: number
}

const ERROR_MESSAGES = {
	isInvalidDate: `The date is invalid`
}

const UNITS_SCALE = {
	days: 24 * 60 * 60 * 1000,
	hours: 60 * 60 * 1000,
	minutes: 60 * 1000,
	seconds: 1000,
	milliseconds: 1
} as const

/**
 * Helper function to parse timezone offset strings (e.g. "Z", "+02:00", "-0500") into minutes.
 * Returns the local system timezone offset if no offset string is provided.
 */
function parseOffset(tzStr: string | undefined): number {
	if (!tzStr) {
		return -new Date().getTimezoneOffset()
	}
	if (tzStr === 'Z') return 0
	const match = tzStr.match(/^([+-])(\d{2}):?(\d{2})?$/)
	if (match) {
		const sign = match[1] === '+' ? 1 : -1
		const hours = Number(match[2])
		const minutes = Number(match[3] ?? 0)
		return sign * (hours * 60 + minutes)
	}
	return -new Date().getTimezoneOffset()
}

/**
 * Class for managing date and time.
 */
export class PDate {
	static defaultLanguage: PLanguages = PLanguages.SPANISH
	static defaultMask: string = '@y-@mm-@dd @hh:@ii:@ss.@lll'
	engine?: Date
	timezoneOffset: number = -new Date().getTimezoneOffset()

	get isInvalidDate() {
		return this.engine == null || isNaN(this.engine.getTime())
	}

	get year(): number | undefined {
		return this.engine?.getFullYear()
	}

	set year(value: number) {
		if (this.isInvalidDate || !this.engine) throw new Error(ERROR_MESSAGES.isInvalidDate)
		this.engine.setFullYear(value)
	}

	addYear(value: number) {
		if (this.isInvalidDate || !this.engine) throw new Error(ERROR_MESSAGES.isInvalidDate)
		this.year = (this.year ?? 1) + value
		return this
	}

	setYear(value: number) {
		this.year = value
		return this
	}

	get month(): number | undefined {
		if (this.isInvalidDate) return
		return (this.engine?.getMonth() ?? 0) + 1
	}

	set month(value: number) {
		if (this.isInvalidDate || !this.engine) throw new Error(ERROR_MESSAGES.isInvalidDate)
		this.engine.setMonth(value - 1)
	}

	addMonth(value: number) {
		if (this.isInvalidDate || !this.engine) throw new Error(ERROR_MESSAGES.isInvalidDate)
		this.month = (this.month ?? 1) + value
		return this
	}

	setMonth(value: number) {
		this.month = value
		return this
	}

	get week(): number | undefined {
		if (this.isInvalidDate || !this.engine) return
		return PUtilsDate.getWeek(this.engine)
	}

	get day(): number | undefined {
		return this.engine?.getDate()
	}

	set day(value: number) {
		if (this.isInvalidDate || !this.engine) throw new Error(ERROR_MESSAGES.isInvalidDate)
		this.engine.setDate(value)
	}

	addDay(value: number) {
		if (this.isInvalidDate || !this.engine) throw new Error(ERROR_MESSAGES.isInvalidDate)
		this.day = (this.day ?? 1) + value
		return this
	}

	setDay(value: number) {
		this.day = value
		return this
	}

	get weekDay(): number | undefined {
		return this.engine?.getDay()
	}

	get hour(): number | undefined {
		return this.engine?.getHours()
	}

	set hour(value: number) {
		if (this.isInvalidDate || !this.engine) throw new Error(ERROR_MESSAGES.isInvalidDate)
		this.engine.setHours(value)
	}

	addHour(value: number) {
		if (this.isInvalidDate || !this.engine) throw new Error(ERROR_MESSAGES.isInvalidDate)
		this.hour = (this.hour ?? 0) + value
		return this
	}

	setHour(value: number) {
		this.hour = value
		return this
	}

	get minute(): number | undefined {
		return this.engine?.getMinutes()
	}

	set minute(value: number) {
		if (this.isInvalidDate || !this.engine) throw new Error(ERROR_MESSAGES.isInvalidDate)
		this.engine.setMinutes(value)
	}

	addMinute(value: number) {
		if (this.isInvalidDate || !this.engine) throw new Error(ERROR_MESSAGES.isInvalidDate)
		this.minute = (this.minute ?? 0) + value
		return this
	}

	setMinute(value: number) {
		this.minute = value
		return this
	}

	get second(): number | undefined {
		return this.engine?.getSeconds()
	}

	set second(value: number) {
		if (this.isInvalidDate || !this.engine) throw new Error(ERROR_MESSAGES.isInvalidDate)
		this.engine.setSeconds(value)
	}

	addSecond(value: number) {
		if (this.isInvalidDate || !this.engine) throw new Error(ERROR_MESSAGES.isInvalidDate)
		this.second = (this.second ?? 0) + value
		return this
	}

	setSecond(value: number) {
		this.second = value
		return this
	}

	get millisecond(): number | undefined {
		return this.engine?.getMilliseconds()
	}

	set millisecond(value: number) {
		if (this.isInvalidDate || !this.engine) throw new Error(ERROR_MESSAGES.isInvalidDate)
		this.engine.setMilliseconds(value)
	}

	addMillisecond(value: number) {
		if (this.isInvalidDate || !this.engine) throw new Error(ERROR_MESSAGES.isInvalidDate)
		this.millisecond = (this.millisecond ?? 0) + value
		return this
	}

	setMillisecond(value: number) {
		this.millisecond = value
		return this
	}

	get timestamp(): number | undefined {
		return this.engine?.getTime()
	}

	get utcTimestamp() {
		if (this.isInvalidDate || !this.engine) return null
		return this.engine.getTime() - this.engine.getTimezoneOffset() * 60000
	}

	constructor(params?: PDateParams) {
		if (!params) {
			this.engine = new Date
			this.timezoneOffset = -this.engine.getTimezoneOffset()
		} else {
			if (typeof params == 'string' || typeof params == 'number' || params instanceof Date || params instanceof PDate) {
				this.setFrom(params)
			} else {
				this.engine = new Date(params.year ?? 1, (params.month ?? 1) - 1, params.day ?? 1, params.hour ?? 0, params.minute ?? 0, params.second ?? 0, params.millisecond ?? 0)
				this.timezoneOffset = -this.engine.getTimezoneOffset()
			}
		}
	}

	setFrom(value: string | number | Date | PDate) {
		if (typeof value == 'string') {
			let year: number
			let month: number
			let day: number
			let hours: number
			let minutes: number
			let seconds: number
			let miliseconds: number

			// 1. Timestamp representation as a string (e.g. "1719234028000")
			if (/^\d{9,}$/.test(value)) {
				const temp = new Date(Number(value))
				if (!isNaN(temp.getTime())) {
					this.engine = temp
					this.timezoneOffset = -temp.getTimezoneOffset()
					return this
				}
			}

			// 2. Standard ISO-like format starting with Year: yyyy-mm-dd or yyyy/mm/dd
			// The time part and offset are optional.
			let parts = value.match(/^([0-9]{4})[-/]([0-9]{1,2})[-/]([0-9]{1,2})((T|\s)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(\.([0-9]{1,3}))?(Z|[+-]\d{2}(?::?\d{2})?)?)?$/)
			if (parts) {
				year = Number(parts[1])
				month = Number(parts[2]) - 1
				day = Number(parts[3])
				hours = Number(parts[6] ?? 0)
				minutes = Number(parts[7] ?? 0)
				seconds = Number(parts[8] ?? 0)
				const msStr = parts[10]
				miliseconds = msStr ? Number(msStr.padEnd(3, '0')) : 0
				
				this.engine = new Date(year, month, day, hours, minutes, seconds, miliseconds)
				this.timezoneOffset = parseOffset(parts[11])
				return this
			}

			// 3. Human format starting with Day: dd/mm/yyyy, dd-mm-yyyy, dd.mm.yyyy
			// The month, year, and offset are optional (e.g., "15", "15/09", "15/09/2025 12:00:00+02:00").
			const today = new Date
			parts = value.match(/^(3[0-1]|[1-2][0-9]|0?[1-9])([-/.])?(1[0-2]|0?[1-9])?\2?([0-9]{1,4})?(\s([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(\.([0-9]{1,3}))?(Z|[+-]\d{2}(?::?\d{2})?)?)?$/)
			if (parts) {
				day = Number(parts[1])
				month = parts[3] ? (Number(parts[3]) - 1) : today.getMonth()
				/* Identificación del año */
				if (parts[4]) {
					let yearString = ''
					const fullYear = today.getFullYear().toString()
					for (let i = 0; i < 4; i++) {
						yearString += parts[4][parts[4].length - 4 + i] ?? fullYear[i]
					}
					year = Number(yearString)
				} else {
					year = today.getFullYear()
				}
				hours = Number(parts[6] ?? 0)
				minutes = Number(parts[7] ?? 0)
				seconds = Number(parts[8] ?? 0)
				const msStr = parts[10]
				miliseconds = msStr ? Number(msStr.padEnd(3, '0')) : 0

				this.engine = new Date(year, month, day, hours, minutes, seconds, miliseconds)
				this.timezoneOffset = parseOffset(parts[11])
				return this
			}

			// 4. Fallback: try native Date parsing for other valid formats (like RFC2822)
			const fallbackDate = new Date(value)
			if (!isNaN(fallbackDate.getTime())) {
				this.engine = fallbackDate
				this.timezoneOffset = -fallbackDate.getTimezoneOffset()
			} else {
				this.engine = undefined
			}
		} else if (typeof value == 'number') {
			this.engine = new Date(value)
			this.timezoneOffset = -this.engine.getTimezoneOffset()
		} else if (value instanceof Date) {
			this.engine = new Date(value)
			this.timezoneOffset = -this.engine.getTimezoneOffset()
		} else if (value instanceof PDate) {
			this.engine = value.toDate()
			this.timezoneOffset = value.timezoneOffset
		}
		return this
	}

	setNow() {
		this.engine = new Date
		this.timezoneOffset = -this.engine.getTimezoneOffset()
		return this
	}

	setClockTime(value?: string) {
		if (this.isInvalidDate || !this.engine) throw new Error(ERROR_MESSAGES.isInvalidDate)
		if (value != null) {
			value = value.replace(/:/g, '')
			let hours = 0
			let minutes = 0
			let seconds = 0
			let matched = false
			
			const match1 = value.match(/^(\d{1,2})$/)
			if (match1) {
				hours = Number(match1[1])
				matched = true
			} else {
				const match2 = value.match(/^(\d{1,2})(\d{2})$/)
				if (match2) {
					hours = Number(match2[1])
					minutes = Number(match2[2])
					matched = true
				} else {
					const match3 = value.match(/^(\d{1,2})(\d{2})(\d{2})$/)
					if (match3) {
						hours = Number(match3[1])
						minutes = Number(match3[2])
						seconds = Number(match3[3])
						matched = true
					}
				}
			}
			if (matched) {
				this.engine.setHours(hours, minutes, seconds, 0)
			} else {
				this.engine = new Date(NaN) // sets to Invalid Date
			}
		} else {
			this.clearClockTime()
		}
		return this
	}

	clearClockTime() {
		this.engine?.setHours(0, 0, 0, 0)
		return this
	}

	daysDifference(other: PDate) {
		return this.difference(other).days
	}

	minutesDifference(other: PDate) {
		return this.difference(other).minutes
	}

	difference(other?: PDate) {
		if (this.isInvalidDate || !this.engine) throw new Error(ERROR_MESSAGES.isInvalidDate)
		let otherDate: PDate
		if (other) {
			if (other.isInvalidDate) throw new Error(`El objeto de comparación es un InvalidDate`)
			otherDate = other
		} else {
			otherDate = new PDate
		}

		const result = new PDateDifference

		const thisTime = this.timestamp
		const otherTime = otherDate.timestamp
		if (thisTime === undefined || otherTime === undefined) {
			return result
		}

		let value = Math.abs(thisTime - otherTime)
		for (const unit of Object.keys(UNITS_SCALE) as Array<keyof typeof UNITS_SCALE>) {
			result[unit] = Math.floor(value / UNITS_SCALE[unit])
			value %= UNITS_SCALE[unit]
		}

		return result
	}

	toString(mask?: string, language?: PLanguages) {
		if (this.isInvalidDate || !this.engine) return ''
		let targetMask = mask ?? PDate.defaultMask
		const offset = this.timezoneOffset
		
		const sign = offset >= 0 ? '+' : '-'
		const absMinutes = Math.abs(offset)
		const hours = Math.floor(absMinutes / 60)
		const minutes = absMinutes % 60
		
		const tzStr = `${sign}${String(hours).padStart(2, '0')}`
		const TZStr = `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
		
		targetMask = targetMask.replace(/@tz/g, tzStr).replace(/@TZ/g, TZStr)
		
		return PUtilsDate.format(this.engine, targetMask, language ?? PDate.defaultLanguage)
	}

	toDate() {
		if (this.isInvalidDate || !this.engine) return
		return new Date(this.engine)
	}

	clone() {
		if (this.isInvalidDate || !this.engine) return
		const cloned = new PDate(this.engine)
		cloned.timezoneOffset = this.timezoneOffset
		return cloned
	}

	toJSON() {
		return this.toString()
	}
}


export type PToStringOptions = {
	labels?: Partial<Record<keyof typeof UNITS_SCALE, [string, string]>>

	/** Mostrar plural automáticamente */
	pluralize?: boolean

	/** Mostrar elementos con valor 0 */
	showZero?: boolean

	/** Número máximo de unidades a mostrar (por defecto ilimitado) */
	maxParts?: number
}

export class PDateDifference {
	[key: string]: any
	days = 0
	hours = 0
	minutes = 0
	seconds = 0
	milliseconds = 0

	toString(mask = '@hh:@ii:@ss.@lll') {
		const totalHours = this.days * 24 + this.hours
		return mask
			.replace(/@hh/g, PUtilsNumber.padStart(totalHours, 2))
			.replace(/@h/g, totalHours.toString())
			.replace(/@ii/g, PUtilsNumber.padStart(this.minutes, 2))
			.replace(/@i/g, this.minutes.toString())
			.replace(/@ss/g, PUtilsNumber.padStart(this.seconds, 2))
			.replace(/@s/g, this.seconds.toString())
			.replace(/@lll/g, PUtilsNumber.padStart(this.milliseconds, 3))
			.replace(/@ll/g, PUtilsNumber.padStart(this.milliseconds, 2))
			.replace(/@l/g, this.milliseconds.toString())
	}

	toText(options: PToStringOptions = {}) {
		const {
			labels = {},
			pluralize = true,
			showZero = false,
			maxParts = Infinity
		} = options

		const defaultLabels: Record<keyof typeof UNITS_SCALE, [string, string]> = {
			days: ["día", "días"],
			hours: ["hora", "horas"],
			minutes: ["minuto", "minutos"],
			seconds: ["segundo", "segundos"],
			milliseconds: ["milisegundo", "milisegundos"]
		}

		const parts: string[] = []

		for (const unit of Object.keys(UNITS_SCALE) as Array<keyof typeof UNITS_SCALE>) {
			const value = this[unit] as number
			if (!showZero && value === 0) continue

			const labelPair = labels[unit] ?? defaultLabels[unit]
			const [single, plural] = labelPair
			const label = pluralize
				? (value === 1 ? single : plural)
				: single // si no se pluraliza, usa siempre la primera forma

			parts.push(`${value} ${label}`)
		}

		return parts.slice(0, maxParts).join(", ")
	}
}