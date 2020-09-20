import { FileBox } from 'wechaty'

import { BaseDriver } from './drivers/baseDriver'
import { FSDriver } from './drivers/fsDriver'
import { GoogleDriver } from './drivers/googleDriver'

export type DriverType = 'google' | 'fs'

export class Drive {

  private driver: BaseDriver

  public constructor (driverType = 'fs') {
    switch (driverType) {
      case 'fs':
        this.driver = new FSDriver({ folder: '/tmp' })
        break

      case 'google':
        this.driver = new GoogleDriver()
        break

      default:
        throw new Error(`Unsupported driver type: ${driverType}, can not create drive with it.`)
    }
  }

  public async saveFile (path: string, fileBox: FileBox) {
    await this.driver.saveFile(path, fileBox)
  }

  public async searchFile (path: string, query: string) {
    return this.driver.searchFile(path, query)
  }

}
