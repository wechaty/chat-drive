import { Message } from 'wechaty'
import { log } from '../config'
import driveResponse from './drive-response'

export const messageListener = (message: Message) => {
  log.info(`Message: ${message}`)
  driveResponse(message)
}
