import { FileBox } from 'wechaty'

import { BaseDriver } from './drivers/baseDriver'
import { FSDriver } from './drivers/fsDriver'
import { GoogleDriver } from './drivers/googleDriver'

export type DriverType = 'google' | 'fs'

export class Drive {

  private driver: BaseDriver

  public constructor (driverType = process.env.DRIVE_TYPE || 'fs') {
    switch (driverType) {
      case 'fs':
        this.driver = new FSDriver({ root: '/tmp' })
        break

      case 'google':
        this.driver = new GoogleDriver()
        break

      default:
        throw new Error(`Unsupported driver type: ${driverType}, can not create drive with it.`)
    }
  }

  public async saveFile (folder: string, fileBox: FileBox) {
    await this.driver.saveFile(folder, fileBox)
  }

  public async searchFile (folder: string, query: string) {
    return this.driver.searchFile(folder, query)
  }

  public async getFile (fileId: string): Promise<FileBox> {
    return this.driver.getFile(fileId)
  }

}
