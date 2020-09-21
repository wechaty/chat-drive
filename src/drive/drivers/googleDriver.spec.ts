#!/usr/bin/env node -r ts-node/register

// import path from 'path'

import { test }  from 'tstest'

import { FileBox } from 'file-box'

import { GoogleDriver } from './googleDriver'

class GoogleDriverTest extends GoogleDriver {

  async folderId      (name: string) { return super.folderId(name)     }
  async folderCreate  (name: string) { return super.folderCreate(name) }

}

test('folderId()', async t => {
  const FOLDER_ID = '1fiz8NzgIqtzym2lDjQDoCbFGN2KsU6kn'
  const FOLDER_NAME = 'unit_testing'

  const gd = new GoogleDriverTest()
  const id = await gd.folderId(FOLDER_NAME)

  t.equal(id, FOLDER_ID, 'should get the folder id')
})

test('folderCreate()', async t => {
  const gd = new GoogleDriverTest()
  const id = await gd.folderCreate('test')
  t.ok(id, 'should get id: ' + id)
})

test('saveFile()', async t => {
  const gd = new GoogleDriverTest()
  const box = FileBox.fromBuffer(Buffer.from('test'), 'test.txt')
  try {
    await gd.saveFile('test', box)
    t.pass('should save file successful')
  } catch (e) {
    t.fail('save file failed: ' + e)
  }
})

test('searchFile()', async t => {
  const gd = new GoogleDriverTest()
  const driveFileList = await gd.searchFile('test', "fullText contains 'test'")
  t.ok(driveFileList.length > 0, 'should get drive file list: ' + JSON.stringify(driveFileList))
})

test('getFile()', async t => {
  const gd = new GoogleDriverTest()
  const fileBox = await gd.getFile('1-1qlo3D9n511-ASVDIHN4-2zZYxffxsq')
  const base64 = await fileBox.toBase64()
  t.ok(base64.length > 0, 'should get base64 data')
})
