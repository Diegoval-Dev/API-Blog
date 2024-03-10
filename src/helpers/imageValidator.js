const isValidBase64 = (str) => {
  if (typeof str !== 'string') {
    return false
  }
  const base64Pattern = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
  return base64Pattern.test(str)
}
export default isValidBase64
