import { FileBox } from 'wechaty'

import { log } from '../config'

const PRE = 'Drive'

export class Drive {
  public async saveFile (fileBox: FileBox) {
    const fileExists = await this.checkFileInGoogleDrive(fileBox)
    if (!fileExists) {
      await this.saveFileToGoogleDrive(fileBox)
    }
  }

  public async searchFile (args: any) {
    const searchResults = await this.searchFileInGoogleDrive(args)
    return searchResults
  }

  private async checkFileInGoogleDrive (file: FileBox): Promise<boolean> {
    log.verbose(PRE, `checkFileInGoogleDrive(${file})`)
    // TODO: to be filled by Huan
    return false
  }

  private async saveFileToGoogleDrive (file: FileBox) {
    log.verbose(PRE, `saveFileToGoogleDrive(${file})`)
    // TODO: to be filled by Huan
  }

  private async searchFileInGoogleDrive (args: any) {
    log.verbose(PRE, `searchFileInGoogleDrive(${args})`)
    // TODO: to be filled by Huan
  }
}
