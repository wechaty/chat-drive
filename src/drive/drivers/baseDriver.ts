import { FileBox } from 'wechaty'

export interface DriveFile {
  name: string,
  key: string,
}

export abstract class BaseDriver {

  public abstract async saveFile (path: string, fileBox: FileBox): Promise<void>
  public abstract async searchFile (path: string, query: string): Promise<DriveFile[]>
  public abstract async getFile (key: string): Promise<FileBox>

}
