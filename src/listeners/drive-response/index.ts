import { Message } from 'wechaty'
import parseDate from './parse-date'
import parseNumber from './parse-number'
import keywordsGenerate from './keywords-generate'

interface DriveAction {
  action: 'search' | 'list' | 'reply',
  limit?: number,
  keywords?: string,
  date?: string,
  dateRange?: string[],
  text?: string
}

const StopWords = new RegExp(`
相关的文件
相关的内容
相关的文档
相关文件
相关内容
相关文档
的文件
的内容
的文档
我想看
搜索
查看
查找
查询
`.split(/\n/).map(x => x.trim()).filter(x => x).join('|'), 'g')
const BeforeRe = /之前|前面|以前|早于/ig
const AfterRe = /之后|后面|以后|晚于/ig

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

  if (/^(我想看|搜索|查看|查找|查询)/i.test(text)) {
    let keywords
    if (date) {
      keywords = date.clean.replace(StopWords, '')
    } else {
      keywords = text.replace(StopWords, '')
    }
    keywords = keywords.replace(/的/g, ' ').trim()
    keywords = keywords.replace(BeforeRe, ' ').trim()
    keywords = keywords.replace(AfterRe, ' ').trim()
    const ret: DriveAction = {
      action: 'search',
      keywords,
    }
    if (date) {
      if (date.date) {
        ret.date = date.date
      } else if (date.dateRange) {
        ret.dateRange = date.dateRange
      }
    }
    return ret
  }

  return null
}

function actionToQuery (text: string, action: DriveAction): string|null {
  if (action.action === 'list') {
    return 'orderBy createdTime desc'
  }
  if (action.action === 'search' && action.keywords) {
    const keywords = action.keywords.replace("'", '')
    const ands: string[] = []
    ands.push(keywordsGenerate(keywords))

    if (action.dateRange) {
      ands.push(`(createdTime >= '${action.dateRange[0]}T00:00:00' and createdTime <= '${action.dateRange[1]}T23:59:59')`)
    } else if (action.date) {
      if (AfterRe.test(text)) {
        ands.push(`(createdTime >= '${action.date}T00:00:00')`)
      } else if (BeforeRe.test(text)) {
        ands.push(`(createdTime <= '${action.date}T23:59:59')`)
      } else {
        ands.push(`(createdTime >= '${action.date}T00:00:00' and createdTime <= '${action.date}T23:59:59')`)
      }
    }
    return ands.join(' and ')
  }
  return null
}

export default async function driveResponse (message: Message) {
  const text = await message.mentionText()
  const response = matchResponse(text)
  if (response) {
    if (response.action === 'reply') {
      if (response.text) {
        await message.say(response.text)
      }
    } else {
      const query = actionToQuery(text, response)
      if (query) {
        await message.say(query)
      }
    }
  }
}
