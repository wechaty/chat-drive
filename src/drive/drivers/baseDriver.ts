import { FileBox } from 'wechaty'

export interface DriveFile {
  name: string,
  key : string,
}

export interface BaseDriverOptions {
  root?: string,
}

export abstract class BaseDriver {

  constructor (protected options: BaseDriverOptions) {
  }

  public abstract async saveFile (folder: string, fileBox: FileBox): Promise<void>
  public abstract async searchFile (folder: string, query: string): Promise<DriveFile[]>
  public abstract async getFile (key: string): Promise<FileBox>

}
