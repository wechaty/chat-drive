import { FileBox } from 'wechaty'

import { log } from '../config'

const PRE = 'Drive'

export class Drive {

  public async saveFile (path: string, fileBox: FileBox) {
    await this.saveFileToGoogleDrive(path, fileBox)
  }

  public async searchFile (path: string, query: string) {
    const searchResults = await this.searchFileInGoogleDrive(path, query)
    return searchResults
  }

  private async saveFileToGoogleDrive (path: string, file: FileBox) {
    log.verbose(PRE, `saveFileToGoogleDrive(${path}, ${file})`)
    // TODO: to be filled by Huan
  }

  private async searchFileInGoogleDrive (path: string, query: string) {
    log.verbose(PRE, `searchFileInGoogleDrive(${path}, ${query})`)
    // TODO: to be filled by Huan
  }

}
