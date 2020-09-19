import { Message } from 'wechaty'
import { log } from '../config'

export const messageListener = (message: Message) => {
  log.info(`Message: ${message}`)
}
