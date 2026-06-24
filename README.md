# Pols-Date

Clase en TypeScript/JavaScript para encapsular y simplificar el manejo, operaciones y formato de fechas (`Date`) de forma segura, eficiente y agnóstica a la zona horaria. Utiliza internamente el paquete `pols-utils`.

## Características principales
- 🌍 **Agnóstico a Zona Horaria:** Evita el molesto "error del día anterior" al parsear fechas desde base de datos. Procesa los strings en hora local exacta y guarda de forma preventiva la zona horaria original.
- ⚙️ **Alto rendimiento:** Optimización de manipulación del reloj (`setClockTime`, `clearClockTime`) de manera directa sin recomposición innecesaria de strings.
- 🛡️ **Seguridad de tipos:** Completamente compatible con el modo estricto (`strict`) de TypeScript.
- 💬 **Formateo flexible:** Soporte para traducción de nombres de meses/días y formato de desfase de zona horaria mediante máscaras.

---

## Instalación

```bash
npm install pols-date
```

---

## Inicialización (Constructor)

La clase `PDate` acepta múltiples formatos de entrada:

### 1. Fecha y hora actual
```javascript
import { PDate } from 'pols-date'

const now = new PDate()
```

### 2. Cadenas de fecha (Strings)
El parser detecta formatos estándar (ISO) y humanos, utilizando automáticamente separadores flexibles (`/`, `-`, `.`).

```javascript
// Formato Estándar (ISO)
const date1 = new PDate('2026-06-24')                    // 24 de junio de 2026 00:00:00.000 Local
const date2 = new PDate('2026/06/24 18:30:00')           // Soporta barras inclinadas
const date3 = new PDate('2026-06-24T12:00:00.000Z')      // Captura desfase UTC (0) pero mantiene hora local (12:00:00)

// Formato Humano (dd/mm/yyyy, dd-mm-yyyy, dd.mm.yyyy)
// Nota: Los caracteres de separación son opcionales
const date4 = new PDate('24-06-2026')                    // 24 de junio de 2026 00:00:00
const date5 = new PDate('24/06/2026 15:45:00.4')         // Milisegundos con relleno automático (.4 -> 400ms)
const date6 = new PDate('15')                            // Día 15 del mes y año actual
const date7 = new PDate('15/09')                         // 15 de septiembre del año actual
const date8 = new PDate('159')                           // 15 de septiembre (mes 9) del año actual (sin separador)
const date9 = new PDate('1509')                          // 15 de septiembre (mes 09) del año actual (sin separador)
const date10 = new PDate('112')                          // 11 de febrero (mes 2) del año actual (sin separador)
const date11 = new PDate('0112')                         // 1 de diciembre (mes 12) del año actual (sin separador)
```

### 3. Timestamps numéricos
Permite pasar un timestamp numérico (milisegundos desde la época Unix) directamente.
```javascript
const mydate = new PDate(1719234028000)
```

### 4. Clona objetos `Date` y `PDate`
```javascript
const nativeDate = new Date()
const pdate1 = new PDate(nativeDate)

const pdate2 = new PDate(pdate1) // Clona preservando propiedades como el timezoneOffset
```

### 5. Objeto de parámetros
```javascript
const customDate = new PDate({
  year: 2026,
  month: 6,
  day: 24,
  hour: 12,
  minute: 30
})
```

---

## Gestión de Zonas Horarias

Para evitar desajustes causados por la conversión automática a UTC de JavaScript, `PDate` procesa las fechas **estrictamente como hora local** tal y como vienen escritas en la cadena, pero almacena de forma preventiva la zona horaria original en la propiedad `timezoneOffset`.

```javascript
// La fecha se crea exactamente a las 12:00:00 hora local, sin restar desfases.
const date = new PDate('2026-06-24T12:00:00.000+02:00')

console.log(date.hour) // 12
console.log(date.timezoneOffset) // 120 (minutos de desfase)
```

---

## Propiedades

- `engine`: Acceso al objeto `Date` nativo interno.
- `year`: Obtiene o asigna el año.
- `month`: Obtiene o asigna el mes (rango `1` a `12`).
- `day`: Obtiene o asigna el día del mes.
- `weekDay`: Obtiene el día de la semana (`0` para domingo, `6` para sábado).
- `week`: Obtiene el número de semana del año (sistema US).
- `hour`: Obtiene o asigna las horas.
- `minute`: Obtiene o asigna los minutos.
- `second`: Obtiene o asigna los segundos.
- `millisecond`: Obtiene o asigna los milisegundos.
- `timestamp`: Obtiene el valor numérico en milisegundos.
- `timezoneOffset`: Obtiene o asigna el desfase de zona horaria en minutos (ej: `-300` para `GMT-5`, `0` para UTC).
- `isInvalidDate`: Retorna `true` si la fecha no es válida.

---

## Métodos

### Manipulación de fechas (Mutables, retornan `this`)
- `addYear(value)` / `setYear(value)`
- `addMonth(value)` / `setMonth(value)`
- `addDay(value)` / `setDay(value)`
- `addHour(value)` / `setHour(value)`
- `addMinute(value)` / `setMinute(value)`
- `addSecond(value)` / `setSecond(value)`
- `addMillisecond(value)` / `setMillisecond(value)`

```javascript
const date = new PDate('2026-06-24')
date.addMonth(2).addDay(5) // Añade 2 meses y 5 días -> 2026-08-29

// Manipulación con valores negativos (restar tiempo)
date.addMonth(-3).addDay(-10) // Resta 3 meses y 10 días -> 2026-05-19

// Usando modificación directa de propiedades
date.month -= 1 // Resta 1 mes -> 2026-04-19
date.day += 15 // Suma 15 días (desborda automáticamente al mes siguiente) -> 2026-05-04
```

### Reloj y tiempo
- `clearClockTime()`: Reinicia la hora a `00:00:00.000` de forma eficiente.
- `setClockTime(value)`: Establece la hora a partir de strings como `'15'`, `'1545'`, `'15:45:30'`, etc.

### Utilidades y comparación
- `daysDifference(otherPDate): number`: Diferencia absoluta en días.
- `minutesDifference(otherPDate): number`: Diferencia absoluta en minutos.
- `difference(otherPDate?): PDateDifference`: Retorna un objeto con la descomposición detallada de la diferencia.
- `clone()`: Devuelve una copia exacta del objeto `PDate`.
- `toDate()`: Devuelve una copia del objeto `Date` nativo interno.

### Formateo con `toString(mask?, language?)`
Permite formatear la fecha usando comodines y traduciendo textos. Soporta los siguientes comodines de formato:

| Comodín | Descripción | Ejemplo |
| :--- | :--- | :--- |
| `@y` | Año completo | `2026` |
| `@m` / `@mm` | Mes (número) / Con cero a la izquierda | `6` / `06` |
| `@mmm` / `@mmmm` | Nombre del mes corto / largo | `Jun` / `Junio` |
| `@d` / `@dd` | Día del mes / Con cero a la izquierda | `24` / `24` |
| `@ddd` / `@dddd` | Día de la semana corto / largo | `Mié` / `Miércoles` |
| `@w` | Número de semana del año | `26` |
| `@h` / `@hh` | Horas (formato 24h) / Con cero a la izquierda | `12` / `12` |
| `@i` / `@ii` | Minutos / Con cero a la izquierda | `30` / `30` |
| `@s` / `@ss` | Segundos / Con cero a la izquierda | `45` / `45` |
| `@l` / `@lll` | Milisegundos / Con tres dígitos | `9` / `009` |
| `@tz` | Desfase horario (corto) | `+02`, `-05`, `+00` |
| `@TZ` | Desfase horario (completo) | `+02:00`, `-05:00`, `+00:00` |
| `@ee` / `@EE` | Indicador AM/PM minúscula / MAYÚSCULA | `pm` / `PM` |

```javascript
const date = new PDate('2026-06-24 18:30:00.000Z')

console.log(date.toString()) // '2026-06-24 18:30:00.000' (default)
console.log(date.toString('@dd/@mm/@y')) // '24/06/2026'
console.log(date.toString('@dddd, @d de @mmmm @TZ')) // 'Miércoles, 24 de Junio +00:00'
```

---

## Gestión de Fechas Inválidas

Si inicializas `PDate` con un valor inválido (ej: `new PDate('invalid')`):
- `isInvalidDate` devolverá `true`.
- Los getters de campos (`year`, `month`, etc.) y métodos como `toDate()` y `clone()` devolverán `undefined`.
- El método `toString()` devolverá una cadena vacía `''`.
- Intentar usar setters o métodos modificadores (`addMonth`, `year = ...`) en una fecha inválida **lanzará una excepción** de tipo `Error` para prevenir comportamientos inesperados en tu aplicación.

---

## Propiedades Estáticas Globales

Puedes modificar el comportamiento por defecto de todas las instancias de `PDate`:
- `PDate.defaultLanguage`: Idioma por defecto para formateo (`PLanguages.SPANISH` por defecto).
- `PDate.defaultMask`: Máscara de formateo por defecto (`'@y-@mm-@dd @hh:@ii:@ss.@lll'`).