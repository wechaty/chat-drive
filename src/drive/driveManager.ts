import { Message, Room } from 'wechaty'

import { log } from '../config'
import { Drive } from './drive'

const PRE = 'DriveManager'

export class DriveManager {

  private drive = new Drive()

  public async saveFileInMessage (message: Message) {
    if (message.type() !== Message.Type.Attachment) {
      log.verbose(PRE, `saveFileInMessage() skip save file since the message is not attachment type.`)
      return
    }

    if (message.self()) {
      log.verbose(PRE, `saveFileInMessage() skip save file since the message is sent by self.`)
      return
    }

    const room = message.room()
    if (!room) {
      log.verbose(PRE, `saveFileInMessage() skip save file since the message is not in room.`)
      return
    }

    const contact = message.from()
    if (!contact) {
      log.verbose(PRE, `saveFileInMessage() skip save file since there is no contact for the message.`)
      return
    }
    const path = `/${room.id}/${contact.id}/`
    const fileBox = await message.toFileBox()
    await this.drive.saveFile(path, fileBox)
  }

  public async searchFileInRoom (room: Room, query: string) {
    const path = `/${room.id}`
    const result = await this.drive.searchFile(path, query)
    return result
  }
}
