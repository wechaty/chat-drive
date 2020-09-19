import fs from 'fs-extra'
import path from 'path'
import { FileBox } from 'wechaty'

import { BaseDriver, DriveFile } from './baseDriver'
import { log } from '../../config'

const PRE = 'FSDriver'
const DRIVE_FOLDER_NAME = 'fs-drive'
const FILE_FOLDER = path.join(__dirname, '..', '..', '..', DRIVE_FOLDER_NAME)

export class FSDriver extends BaseDriver {

  public async saveFile (filePath: string, fileBox: FileBox) {
    log.verbose(PRE, `saveFile(${path}, ${fileBox})`)
    const fullPath = this.getFullPath(filePath)
    const name = fileBox.name
    await fs.mkdirp(fullPath)
    await fileBox.toFile(`${fullPath}/${name}`, true)
  }

  public async searchFile (filePath: string, query: string): Promise<DriveFile[]> {
    log.verbose(PRE, `searchFile(${filePath}, ${query})`)
    const fullPath = this.getFullPath(filePath)
    const files = await fs.readdir(fullPath)
    const targetFiles = files.filter(f => RegExp(query).test(f))

    return targetFiles.map(f => ({
      key: `${fullPath}/${f}`,
      name: f,
    }))
  }

  public async getFile (key: string): Promise<FileBox> {
    log.verbose(PRE, `getFile(${key})`)
    const fileBox = FileBox.fromFile(key)
    return fileBox
  }

  private getFullPath (filePath: string) {
    const fullPath = path.join(FILE_FOLDER, filePath)
    return fullPath
  }

}
