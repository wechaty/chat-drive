// import fs from 'fs'
import { FileBox } from 'wechaty'

import { BaseDriver, DriveFile } from './baseDriver'
import { log } from '../../config'

const PRE = 'FSDriver'

export class FSDriver extends BaseDriver {

  public async saveFile (path: string, fileBox: FileBox) {
    log.verbose(PRE, `saveFile(${path}, ${fileBox})`)
    // TODO: wait for Yuan to fill in this logic
  }

  public async searchFile (path: string, query: string): Promise<DriveFile[]> {
    log.verbose(PRE, `searchFile(${path}, ${query})`)
    // TODO: wait for Yuan to fill in this logic
    return []
  }

}
