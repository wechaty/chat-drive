import { Message } from 'wechaty'
import parseDate from './parse-date'
import parseNumber from './parse-number'

interface DriveAction {
  action: 'search' | 'list' | 'reply',
  limit?: number,
  keywords?: string,
  date?: string,
  text?: string
}

const StopWords = new RegExp(`
相关的文件
相关的内容
的文件
的内容
我想看
搜索
查看
查找
`.split(/\n/).map(x => x.trim()).filter(x => x).join('|'), 'g')

export function matchResponse (text: string): DriveAction | null {
  const date = parseDate(text)
  const number = parseNumber(text)
  if (/^(如何使用|怎么用|开始使用|使用引导|你能做什么)/i.test(text)) {
    return {
      action: 'reply',
      text: `我是小句子，我能帮你查到群内的信息，你可以尝试这样问我：
        - 查找微信生态的文件
        - 查找 09-10 的文件
        - 查找最新的3个文件`,
    }
  }

  if (/^(列出最近|列出最新|查找最新|查找最近)/i.test(text)) {
    const ret: DriveAction = {
      action: 'list',
    }
    if (number) {
      ret.limit = number
    }
    return ret
  }

  if (/^(我想看|搜索|查看|查找)/i.test(text)) {
    let keywords
    if (date) {
      keywords = date.clean.replace(StopWords, '')
    } else {
      keywords = text.replace(StopWords, '')
    }
    const ret: DriveAction = {
      action: 'search',
      keywords,
    }
    if (date) {
      ret.date = date.date
    }
    return ret
  }

  return null
}

export default function driveResponse (message: Message) {
  const text = message.text()
  const response = matchResponse(text)
  if (response) {
    // message.say(response)
  }
}
