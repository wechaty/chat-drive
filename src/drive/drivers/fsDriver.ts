import fs from 'fs-extra'
import { FileBox } from 'wechaty'

import {
  BaseDriver,
  BaseDriverOptions,
  DriveFile,
}                   from './baseDriver'
import { log } from '../../config'

const PRE = 'FSDriver'

export class FSDriver extends BaseDriver {

  constructor (protected options: BaseDriverOptions) {
    super(options)
  }

  public async saveFile (fileBox: FileBox) {
    log.verbose(PRE, `saveFile(${fileBox})`)
    const name = fileBox.name
    await fileBox.toFile(`${this.options.folder}/${name}`, true)
  }

  public async searchFile (query: string): Promise<DriveFile[]> {
    log.verbose(PRE, `searchFile(${query})`)
    const files = await fs.readdir(this.options.folder)
    const targetFiles = files.filter(f => RegExp(query).test(f))

    return targetFiles.map(f => ({
      key: `${this.options.folder}/${f}`,
      name: f,
    }))
  }

  public async getFile (key: string): Promise<FileBox> {
    log.verbose(PRE, `getFile(${key})`)
    const fileBox = FileBox.fromFile(key)
    return fileBox
  }

}
