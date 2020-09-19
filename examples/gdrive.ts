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

// async function del () {
//   const res = await drive.files.delete()
// }

async function filePathToId (filePath: string): Promise<string> {
  const params = {
    fields: 'files(id)',
    pageSize: 1,
    q: "mimeType='image/jpeg'",
    // mimeType = 'application/vnd.google-apps.folder'
    // name = 'hello'
  }
  const res = await drive.files.list(params)
  console.info(res.data.files!.map(f => f.parents))
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

async function list () {
  const res = await drive.files.list({
    // fields: 'files(name, webViewLink)',
    fields: '*',
    orderBy: 'createdTime desc',
    pageSize: 5,
  })
  console.info(res.data.files!.map(f => f.parents))
}

// mimeType: 'application/vnd.google-apps.folder',


async function upload () {
  // Obtain user credentials to use for the request
  const fileName = 't.ts'
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
        parents: ['1eQmnWldXtMu0p1jBhOaUi1po9jZlUpDP'],
      },
      // resource: metadata,
    },
  )
  console.info(res.data)
  return res.data
}

async function main () {
  void upload
  // await upload()
  await list()
}

main()
  .catch(console.error)
