#!/usr/bin/env node -r ts-node/register

// import path from 'path'

import { test }  from 'tstest'

import { GoogleDriver } from './googleDriver'

class GoogleDriverTest extends GoogleDriver {

  async folderId      (name: string, root = false) { return super.folderId(name, root)     }
  async folderCreate  (name: string) { return super.folderCreate(name) }

}

test('folderId()', async t => {
  const FOLDER_ID = '1fiz8NzgIqtzym2lDjQDoCbFGN2KsU6kn'
  const FOLDER_NAME = 'unit_testing'

  const gd = new GoogleDriverTest()
  const id = gd.folderId(FOLDER_NAME)

  t.equal(id, FOLDER_ID, 'should get the folder id')
})

test('folderCreate()', async t => {
  t.ok('tbw')
})

test('saveFile()', async t => {
  t.ok('tbw')
})

test('searchFile()', async t => {
  t.ok('tbw')
})

test('getFile()', async t => {
  t.ok('tbw')
})
