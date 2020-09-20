import fs from 'fs-extra'
import path from 'path'

import { FileBox } from 'wechaty'

import {
  BaseDriver,
  BaseDriverOptions,
  DriveFile,
}                   from './baseDriver'
import { log } from '../../config'

const PRE = 'FSDriver'

export class FSDriver extends BaseDriver {

  private root: string

  constructor (options: BaseDriverOptions) {
    super(options)
    this.root = options.root || '/tmp'
  }

  public async saveFile (folder: string, fileBox: FileBox) {
    log.verbose(PRE, `saveFile(${folder}, ${fileBox})`)
    const name = fileBox.name
    await fileBox.toFile(
      path.join(
        this.root,
        folder,
        name,
      ),
      true,
    )
  }

  public async searchFile (folder: string, query: string): Promise<DriveFile[]> {
    log.verbose(PRE, `searchFile(${query})`)
    const absFolder = path.join(
      this.root,
      folder,
    )
    const files = await fs.readdir(absFolder)
    const targetFiles = files.filter(f => RegExp(query).test(f))

    return targetFiles.map(f => ({
      key: path.join(absFolder, f),
      name: f,
    }))
  }

  public async getFile (key: string): Promise<FileBox> {
    log.verbose(PRE, `getFile(${key})`)
    const absFilename = path.join(
      this.root,
      key,
    )
    const fileBox = FileBox.fromFile(absFilename)
    return fileBox
  }

}
