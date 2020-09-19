
import { test }  from 'tstest'
import { matchResponse } from './index'

test('list test', async t => {
  const q = '列出最近5个文件'
  const ret = matchResponse(q)
  t.notEqual(ret, null,  `${q} return`)
  if (ret) {
    t.equal(ret.action, 'list', `${q} action: list`)
    t.equal(ret.limit, 5, `${q} limit: 5`)
  }
})

test('search test', async t => {
  const q = '查看汽车相关的文件'
  const ret = matchResponse(q)
  t.notEqual(ret, null,  `${q} return`)
  if (ret) {
    t.equal(ret.action, 'search', `${q} action: search`)
    t.equal(ret.keywords, '汽车', `${q} keywords: 汽车`)
  }
})

test('search date test', async t => {
  const q = '查看2020/09/12汽车相关的文件'
  const ret = matchResponse(q)
  t.notEqual(ret, null,  `${q} return`)
  if (ret) {
    t.equal(ret.action, 'search', `${q} action: search`)
    t.equal(ret.keywords, '汽车', `${q} keywords: 汽车`)
    t.equal(ret.date, '2020-09-12', `${q} date: 2020-09-12`)
  }
})
