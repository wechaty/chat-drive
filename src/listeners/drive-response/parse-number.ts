
import * as Recognizers from '@microsoft/recognizers-text-suite'
import * as NumberRecognizers from '@microsoft/recognizers-text-number'

const recognizer = new NumberRecognizers.NumberRecognizer(Recognizers.Culture.Chinese)
const model = recognizer.getNumberModel()

export default function parseNumber (text: string): number|null {
  const result = model.parse(text)
  if (result && result.length) {
    return Number.parseInt(result[0].resolution.value)
  }
  return null
}
