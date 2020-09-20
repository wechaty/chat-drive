// eslint-disable-next-line camelcase
import { google, drive_v3 } from 'googleapis'

import { FileBox } from 'wechaty'

import {
  BaseDriver,
  BaseDriverOptions,
  DriveFile,
}                     from './baseDriver'

import { log } from '../../config'

const PRE = 'GoogleDriver'

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
]

interface GoogleDriverOptions extends BaseDriverOptions {
  clientEmail?: string,
  privateKey?: string,
}

export class GoogleDriver extends BaseDriver {

  // eslint-disable-next-line camelcase
  private drive: drive_v3.Drive
  private folderId: string

  constructor (
    options: GoogleDriverOptions = {},
  ) {
    super(options)
    log.verbose(PRE, 'constructor(%s)', JSON.stringify(options))

    const clientEmail = options.clientEmail || process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL
    if (!clientEmail) {
      throw new Error(`
      options.clientEmail or process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL must be set before using GDrive!
      See: https://github.com/wechaty/chat-drive#how-to-create-a-service-account
      `)
    }

    const privateKey = options.privateKey || process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
    if (!privateKey) {
      throw new Error(`
      options.privateKey or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY must be set before using GDrive!
      See: https://github.com/wechaty/chat-drive#how-to-create-a-service-account
      `)
    }

    const folderId = options.folder || process.env.GOOGLE_SERVICE_ACCOUNT_FOLDER_ID
    if (!folderId) {
      throw new Error(`
      options.folder or GOOGLE_SERVICE_ACCOUNT_FOLDER_ID must be set before using GDrive!
      See: https://github.com/wechaty/chat-drive#how-to-create-a-service-account
      `)
    }

    const auth = new google.auth.JWT(
      clientEmail, // credentials.client_email,
      undefined,
      privateKey, // credentials.private_key,
      SCOPES,
    )

    this.drive = google.drive({
      auth,
      version: 'v3',
    })
    this.folderId = folderId

  }

  async saveFile (fileBox: FileBox): Promise<void> {
    log.verbose(PRE, `saveFile(${fileBox})`)
    // TODO: wait for Huan to fill in this logic

    await this.drive.files.create(
      {
        media: {
          body: await fileBox.toStream(),
        },
        requestBody: {
          // mimeType: 'text/plain',
          name: fileBox.name,
          parents: [this.folderId],
        },
      },
    )

  }

  async searchFile (query: string): Promise<DriveFile[]> {
    log.verbose(PRE, `searchFile(${query})`)
    // TODO: wait for Huan to fill in this logic
    const res = await this.drive.files.list({
      fields: 'files(id, name)',
      // pageSize: 50,
      q: query,
    })

    const driveFileList: DriveFile[] = res.data.files?.map(f => ({
      key:  f.id,
      name: f.name || 'unknown.dat',
    }) as DriveFile) || []

    return driveFileList.filter(f => !!(f.key))
  }

  async getFile (fileId: string): Promise<FileBox> {
    log.verbose(PRE, `getFile(${fileId})`)
    // TODO: wait for Huan to fill in this logic

    const res1 = await this.drive.files.get({ fileId })
    const filename = res1.data.name || 'unknown.dat'

    const res2 = await this.drive.files.get(
      {
        alt: 'media',
        fileId,
      },
      {
        responseType: 'stream',
      },
    )

    return FileBox.fromStream(res2.data, filename)
  }

}
