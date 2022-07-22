import { Buffer } from 'buffer'
/**
 * @param {Message} message
 */
const sendMail = async message => {
  if (!message.to || !message.from || (!message.text && !message.html)) {
    throw new Error('to, from, text, and html fields are required!')
  }

  const formData = new FormData()

  Object.keys(message).forEach(key => {
    formData.append(key, message[key])
  })

  return fetch(
    `https://${MAILGUN_API_HOST}/v3/${MAILGUN_API_DOMAIN}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `api:${MAILGUN_API_ACCESS_TOKEN}`,
        ).toString('base64')}`,
      },
      body: formData,
    },
  )
}

export default sendMail
