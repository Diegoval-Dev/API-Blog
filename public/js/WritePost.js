document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-write-post')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const title = document.getElementById('input-title').value
    const banner_image_url = document.getElementById('input-image').value
    const category = document.getElementById('input-category').value
    const content = document.getElementById('input-content').value

    const post = {
      title, content, banner_image_url, category,
    }

    try {
      const response = await fetch('http://127.0.0.1:3000/posts', {
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
      console.error('Error writing post:', error)
    }
  })
})
