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
  private rootFolderId: string

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

    let privateKey = options.privateKey || process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
    if (!privateKey) {
      throw new Error(`
      options.privateKey or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY must be set before using GDrive!
      See: https://github.com/wechaty/chat-drive#how-to-create-a-service-account
      `)
    }
    privateKey = privateKey.replace(/\\n/g, '\n')

    const rootFolderId = options.root || process.env.GOOGLE_SERVICE_ACCOUNT_FOLDER_ID
    if (!rootFolderId) {
      throw new Error(`
      options.root or GOOGLE_SERVICE_ACCOUNT_FOLDER_ID must be set before using GDrive!
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
    this.rootFolderId = rootFolderId
  }

  protected async folderId (name: string): Promise<undefined | string> {
    log.verbose(PRE, `folderId(${name})`)

    const q = [
      `'${this.rootFolderId}' in parents`,
      ' and ',
      "mimeType = 'application/vnd.google-apps.folder'",
      ' and ',
      `name = '${name}'`,
    ].join('')

    // console.info('q:', q)

    const res = await this.drive.files.list({
      fields: 'files(id, name, parents, mimeType)',
      q,
    })

    // console.info('###')
    // console.info('data:', res.data)

    if (!res.data.files || res.data.files.length <= 0) {
      return undefined
    }

    const idList = res.data.files.map(f => f.id)

    for (const id of idList) {
      if (id) return id
    }
    return undefined
  }

  protected async folderCreate (name: string): Promise<string> {
    log.verbose(PRE, `folderCreate(${name})`)
    const res = await this.drive.files.create(
      {
        requestBody: {
          mimeType: 'application/vnd.google-apps.folder',
          name,
          parents : [await this.rootFolderId],
        },
      },
    )

    if (!res.data.id) {
      throw new Error('folderCreate failed!')
    }
    return res.data.id
  }

  async saveFile (folder: string, fileBox: FileBox): Promise<void> {
    log.verbose(PRE, `saveFile(${folder}, ${fileBox})`)

    let folderId = await this.folderId(folder)

    if (!folderId) {
      folderId = await this.folderCreate(folder)
    }

    const res = await this.drive.files.create(
      {
        media: {
          body: await fileBox.toStream(),
        },
        requestBody: {
          name: fileBox.name,
          parents: [folderId],
        },
      },
    )

    if (!res.data.id) {
      throw new Error('save file failed for ' + fileBox.name)
    }
  }

  async searchFile (
    folder: string,
    query: string,
  ): Promise<DriveFile[]> {
    log.verbose(PRE, `searchFile(${folder}, "${query}")`)

    const folderId = await this.folderId(folder)
    const folderQ = [
      `'${folderId}' in parents`,
      ' and ',
    ].join('')

    const q = folderQ + ' ' + query
    console.info('q:', q)

    const res = await this.drive.files.list({
      fields: 'files(id, name)',
      q,
    })

    console.info('res.data:', res.data)

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
