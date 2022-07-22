/**
 * Google Response
 * @typedef {Object} GoogleResponse
 * @property {boolean} success
 * @property {number} score
 * @property {string} action
 * @property {string} [challenge_ts] ISO formatted timestamp
 * @property {string[]} [error-codes] errors
 * @property {string} hostname
 */

/**
 * Uses Google Recaptcha v3 to prevent spam from bots
 * @param {string} token
 */
const recaptcha = async token => {
  /** @type {GoogleResponse} */
  const resp = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(resp => {
      return resp.json()
    })
    .catch(e => {
      throw new Error(e.message)
    })

  const { success, score } = resp

  if (!success) {
    throw new Error(resp['error-codes'])
  }

  return success && score > (RECAPTCHA_MINSCORE || 0.5)
}

export default recaptcha
