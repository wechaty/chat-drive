import { Wechaty } from 'wechaty'
import { EventLogger, QRCodeTerminal } from 'wechaty-plugin-contrib'

import { messageListener } from './listeners/message'

const bot = new Wechaty()

bot.use(
  QRCodeTerminal({ small: true }),
  EventLogger(),
)

bot
  .on('message', messageListener)
  .start()
