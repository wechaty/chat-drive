import { Message } from 'wechaty'
import { log } from '../config'
import driveResponse from './drive-response'

export const messageListener = async (message: Message) => {
  log.info(`Message: ${message}`)
  await driveResponse(message)
}
