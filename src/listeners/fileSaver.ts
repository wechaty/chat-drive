import { Message } from 'wechaty'

import { log } from '../config'
import { DriveManager } from '../drive/driveManager'

const PRE = 'fileSaverListener'
const manager = new DriveManager()

export const fileSaverListener = async (message: Message) => {
  if (message.type() === Message.Type.Attachment) {
    log.verbose(PRE, 'Saving file to drive...')
    await manager.saveFileInMessage(message)
  }
}
