
import * as Recognizers from '@microsoft/recognizers-text-suite'
import * as DateTimeRecognizers from '@microsoft/recognizers-text-date-time'

const recognizer = new DateTimeRecognizers.DateTimeRecognizer(Recognizers.Culture.Chinese)
const model = recognizer.getDateTimeModel()

interface DateResult {
  clean: string,
  date: string,
}

export default function parseDate (text: string): DateResult|null {
  const result = model.parse(text)
  if (result && result.length) {
    const before = text.slice(0, result[0].start)
    const after = text.slice(result[0].end + 1)

    return {
      clean: before + after,
      date: result[0].resolution.values[0].timex,
    }
  }
  return null
}
