import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const filename = fileURLToPath(import.meta.url)
const myDirname = dirname(filename)

const logDetails = (req, res, next) => {
  const now = new Date()
  const timestamp = now.toISOString()

  const originalSend = res.send
  res.send = (...args) => {
    const body = args[0]
    const logEntry = `${timestamp} - Request to ${req.path}, Payload: ${JSON.stringify(req.body)}, Response: ${body}\n`
    fs.appendFile(join(myDirname, 'log.txt'), logEntry, () => {})
    originalSend.apply(res, args)
  }

  next()
}

export default logDetails
