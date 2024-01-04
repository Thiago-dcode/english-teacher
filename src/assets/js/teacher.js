const handleLoading = (isLoading) => {
  const button = document.getElementById('button-submit')
  const spinning = document.getElementById('loading')
  console.log(spinning)
  if (isLoading) {
    button.style.display = 'none'
    spinning.style.display = 'block'
    return
  }
  button.style.display = 'block'
  spinning.style.display = 'none'
}
document.addEventListener('DOMContentLoaded', () => {
  let isLoading = false
  handleLoading(isLoading)
  const form = document.getElementById('teacher-form')
  const chat = document.querySelector('.chat')
  console.log(form)
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.message.value
    if (!message) return
    ajax('http://localhost:3000/ai', {
      message
    })
    e.target.message.value = ''
    printMessage(message, 'user')
  })

  const ajax = async (url, form) => {
    isLoading = true
    handleLoading(isLoading)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      const data = await response.json()
      console.log(data)

      printMessage(data.content, 'bot')
    } catch (error) {

    } finally {
      isLoading = false
      handleLoading(isLoading)
    }
  }

  const printMessage = (message, role) => {
    const initialText = document.getElementById('text')
    initialText.style.display = 'none'
    const section = document.createElement('section')
    const h4 = document.createElement('h4')
    const p = document.createElement('p')
    switch (role) {
      case 'bot':
        section.classList.add('bot')
        h4.textContent = 'Teacher'
        break
      case 'user':
        section.classList.add('user')
        h4.textContent = 'You'
        break

      default:
        break
    }
    p.textContent = message
    section.appendChild(h4)
    section.appendChild(p)
    chat.append(section)
  }
})
