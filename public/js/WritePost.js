document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-write-post')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const title = document.getElementById('input-title').value
    const bannerImageB64 = document.getElementById('input-image').value
    const category = document.getElementById('input-category').value
    const content = document.getElementById('input-content').value

    const post = {
      title, content, bannerImageB64, category,
    }

    try {
      const response = await fetch('https://22309.arpanetos.lol//posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      })

      if (response.ok) {
        form.reset()
        window.location.href = '/'
      } else {
        const errorText = await response.text()
        throw new Error(errorText)
      }
    } catch (error) {
      form.innerHTML = `<h2>Error creando el post: ${error.message}</h2>`
    }
  })
})
