import { Wechaty } from 'wechaty'
import { EventLogger, QRCodeTerminal } from 'wechaty-plugin-contrib'

import { messageListener } from './listeners/message'
import { fileSaverListener } from './listeners/fileSaver'

const bot = new Wechaty()

bot.use(
  QRCodeTerminal({ small: true }),
  EventLogger(),
)

bot
  .on('message', messageListener)
  .on('message', fileSaverListener)
  .start()
  .catch(console.error)
