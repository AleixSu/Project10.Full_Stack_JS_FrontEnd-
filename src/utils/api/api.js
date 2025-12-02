const url = 'https://eventiabackendproject10.vercel.app'

export const API = async ({
  endpoint,
  method = 'GET',
  body,
  isJSON = true,
  token = null // Por defecto será null pero en el caso de que lo envíen irá a headers
}) => {
  const headers = {
    Authorization: `Bearer ${token}` //Metemos el token en headers
  }
  isJSON ? (headers['Content-Type'] = 'application/json') : null

  const res = await fetch(url + endpoint, {
    body: isJSON ? JSON.stringify(body) : body,
    method,
    headers
  })

  const data = await res.json()

  return { status: res.status, data }
}
