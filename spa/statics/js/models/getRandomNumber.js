module.exports = async () => {
  const response = await fetch('/api/getRandomNumber', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
  return await response.json()
}
