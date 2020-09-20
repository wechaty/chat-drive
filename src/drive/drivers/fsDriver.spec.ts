import fs from 'fs-extra'
import path from 'path'
import { test }  from 'tstest'
import { FileBox } from 'wechaty'

import { FSDriver } from './fsDriver'

const mockFileUrl = 'https://www.juzibot.com/img/work-logo.png'
// const mockName1 = 'work-logo.png'
const mockName2 = 'test2.png'
const mockName3 = 'test5.png'

const projectRoot = path.join(__dirname, '..', '..', '..')
const driveRoot = path.join(projectRoot, 'fs-drive')
const fullPath =  path.join(driveRoot, 'roomid', 'contactid')

test.only('should save file correctly', async t => {
  const fileBox = FileBox.fromUrl(mockFileUrl)
  await fileBox.ready()

  const driver = new FSDriver({ folder: '/tmp' })
  await driver.saveFile(fileBox)

  const savedFile = FileBox.fromFile(`${fullPath}/test.jpg`)
  t.assert(savedFile)

  fileBox.name = mockName2
  await driver.saveFile(fileBox)
  fileBox.name = mockName3
  await driver.saveFile(fileBox)

  const files = await driver.searchFile('test')
  t.assert(files.length === 2)

  const fileBoxes = await Promise.all(files.map(f => driver.getFile(f.key)))
  t.assert(fileBoxes.length === 2)
})

test.onFinish(async () => {
  await fs.remove(driveRoot)
})
