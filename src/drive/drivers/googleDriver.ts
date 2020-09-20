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

export class GoogleDriver extends BaseDriver {

  // eslint-disable-next-line camelcase
  private drive: drive_v3.Drive

  constructor (
    protected options: BaseDriverOptions,
  ) {
    super(options)
    log.verbose(PRE, 'constructor(%s)', JSON.stringify(options))

    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL
    const privateKey  = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY

    if (!clientEmail || !privateKey) {
      throw new Error(`
      GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL & GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY must be set before using GDrive!
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
          parents: [this.options.folder],
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
