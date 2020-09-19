import { FileBox } from 'wechaty'

import { BaseDriver, DriveFile } from './baseDriver'
import { log } from '../../config'

const PRE = 'GoogleDriver'

export class GoogleDriver extends BaseDriver {

  public async saveFile (path: string, fileBox: FileBox) {
    log.verbose(PRE, `saveFile(${path}, ${fileBox})`)
    // TODO: wait for Huan to fill in this logic
  }

  public async searchFile (path: string, query: string): Promise<DriveFile[]> {
    log.verbose(PRE, `searchFile(${path}, ${query})`)
    // TODO: wait for Huan to fill in this logic
    return []
  }

  public async getFile (key: string): Promise<FileBox> {
    log.verbose(PRE, `getFile(${key})`)
    // TODO: wait for Huan to fill in this logic
    throw new Error('Not implemented')
  }

}
