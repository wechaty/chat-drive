import fs from 'fs'
import path from 'path'

// eslint-disable-next-line camelcase
import { google } from 'googleapis'

import { FileBox } from 'file-box'

// import * as readline from 'readline'

const credentials = require('../credentials.json')

const scopes = [
  'https://www.googleapis.com/auth/drive',
]

// (email?: string, keyFile?: string, key?: string, scopes?: string | string[], subject?: string, keyId?: string);
const auth = new google.auth.JWT(
  credentials.client_email,
  undefined,
  credentials.private_key,
  scopes,
)

const drive = google.drive({
  auth,
  version: 'v3',
})

async function del (fileId: string): Promise<void> {
  await drive.files.delete({
    fileId,
  })
}

async function filePathToId (filePath: string): Promise<string> {
  const params = {
    fields: 'files(id)',
    pageSize: 1,
    q: `properties.chatDrivePath has \\'${filePath}\\'`,
    spaces: 'drive',
    // mimeType = 'application/vnd.google-apps.folder'
    // name = 'hello'
  }
  const res = await drive.files.list(params)
  console.info(res.data.files!.map(f => f.parents))
  return 'id'
}

async function fileIdToFileBox (
  fileId: string,
  name: string,
): Promise<FileBox> {
  const res = await drive.files
    .get(
      {
        alt: 'media',
        fileId,
      },
      {
        responseType: 'stream',
      },
    )

  return FileBox.fromStream(res.data, name)
}

const validId = (id: undefined | null | string): id is string => !!id

async function listFiles (): Promise<string[]> {
  const res = await drive.files.list({
    // fields: 'files(name, properties)',
    fields: '*',
    pageSize: 50,
    q: "trashed != true and mimeType != 'application/vnd.google-apps.folder'",
  })

  const idList = res.data.files?.map(f => f.id) || []

  return idList.filter(validId)
}

async function list (q?: string): Promise<string[]> {
  const res = await drive.files.list({
    fields: 'files(id)',
    // pageSize: 50,
    q: q ?? 'not trashed',
  })
  const idList = res.data.files?.map(f => f.id) || []
  return idList.filter(validId)
}

async function fileIdToSchema (fileId: string) {
  const ret = await drive.files.get({
    fields: '*',
    fileId,
  })
  return ret.data
}
// mimeType: 'application/vnd.google-apps.folder',

/**
 * Google Driver API - Files: create
 *  https://developers.google.com/drive/api/v3/reference/files/create
 *
 */
async function upload () {
  // Obtain user credentials to use for the request
  const fileName = 'gdrive.ts'
  // const fileSize = fs.statSync(fileName).size

  const res = await drive.files.create(
    {
      media: {
        body: fs.createReadStream(path.join(__dirname, fileName)),
      },
      requestBody: {
        // a requestBody element is required if you want to use multipart
        mimeType: 'text/plain', // mimeType at Google Drive
        name: fileName,
        originalFilename: `/123@chatroom/456/${fileName}`,
        parents: ['1eQmnWldXtMu0p1jBhOaUi1po9jZlUpDP'],
        properties: {
          chatDrivePath: '/123@chatroom/456/',
        },
      },
      // resource: metadata,
    },
  )
  console.info(res.data)
  return res.data
}

async function main () {
  // await upload()
  const idList = await list("name contains 'gdrive'")
  console.info('idList', idList)

  for (const fileId of idList) {
    const schema = await fileIdToSchema(fileId)
    console.info('schema for ', fileId, schema.appProperties, schema.properties, schema.parents, schema.originalFilename)
  }

  // for (const id of idList) {
  //   if (id !== '1eQmnWldXtMu0p1jBhOaUi1po9jZlUpDP') { // skip `ChatDrive`
  //     await del(id)
  //   }
  // }

  // const id = await filePathToId('/123@chatroom/456')
  // console.info('id', id)
}

main()
  .catch(console.error)

void upload
void fileIdToFileBox
void list
void filePathToId
void listFiles
void del
