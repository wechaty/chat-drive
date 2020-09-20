import { FileBox } from 'wechaty'

export interface DriveFile {
  name: string,
  key : string,
}

export interface BaseDriverOptions {
  folder?: string,
}

export abstract class BaseDriver {

  constructor (protected options: BaseDriverOptions) {
  }

  public abstract async saveFile (fileBox: FileBox): Promise<void>
  public abstract async searchFile (query: string): Promise<DriveFile[]>
  public abstract async getFile (key: string): Promise<FileBox>

}
