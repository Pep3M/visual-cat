self.addEventListener('push', e => {
  const { title, message } = e.data.json()
  
  const options = {
    data: 'http://localhost/',
    body: `${message.videos.length} filmes pedidos`,
  }
  
  self.registration.showNotification(title, options)
})