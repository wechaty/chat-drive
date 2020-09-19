import { Message } from 'wechaty'

import { log } from '../config'
import { Drive } from '../drive'

const PRE = 'fileSaverListener'
const drive = new Drive()

export const fileSaverListener = async (message: Message) => {
  if (message.type() === Message.Type.Attachment) {
    log.verbose(PRE, `Saving file to drive...`)
    const messageFileBox = await message.toFileBox()
    await drive.saveFile(messageFileBox)
  }
}
