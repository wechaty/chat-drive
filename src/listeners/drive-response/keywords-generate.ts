
const nodejieba = require('nodejieba')

export default function keywordsGenerate (keywords: string) {
  const cut: string[] = nodejieba.cutAll(keywords)
  const words: string[] = []
  for (const c of cut) {
    if (words.indexOf(c) < 0) {
      words.push(c)
    }
  }
  return words.map(k => `(name contains '${k}' or fullText contains '${k}')`).join(' or ')
}
