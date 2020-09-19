
import * as Recognizers from '@microsoft/recognizers-text-suite'
import * as DateTimeRecognizers from '@microsoft/recognizers-text-date-time'

const recognizer = new DateTimeRecognizers.DateTimeRecognizer(Recognizers.Culture.Chinese)
const model = recognizer.getDateTimeModel()

interface DateResult {
  clean: string,
  date?: string,
  dateRange?: string[],
}

/**
 * 
 * @param text
 * 
 *   {
      "start": 2,
      "end": 5,
      "resolution": {
          "values": [
              {
                  "timex": "XXXX-09-12",
                  "type": "date",
                  "value": "2020-09-12"
              },
              {
                  "timex": "XXXX-09-12",
                  "type": "date",
                  "value": "2021-09-12"
              }
          ]
      },
      "text": "9月12",
      "typeName": "datetimeV2.date"
  }
 */
export default function parseDate (text: string): DateResult|null {
  const result = model.parse(text)
  if (result && result.length) {
    const before = text.slice(0, result[0].start)
    const after = text.slice(result[0].end + 1)

    if (result[0].resolution.values[0].hasOwnProperty('value')) {
      return {
        clean: before + after,
        date: result[0].resolution.values[0].value,
      }
    }

    if (result[0].resolution.values[0].hasOwnProperty('start')) {
      return {
        clean: before + after,
        dateRange: [
          result[0].resolution.values[0].start,
          result[0].resolution.values[0].end,
        ],
      }
    }
  }
  return null
}

// console.log(JSON.stringify(model.parse('查找9月12的汽车'), null, 4))
console.log(JSON.stringify(model.parse('查找上周微信生态的文件'), null, 4))