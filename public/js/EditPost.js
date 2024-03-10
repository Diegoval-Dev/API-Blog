document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-write-post')
  const urlParams = new URLSearchParams(window.location.search)
  const postId = urlParams.get('postId')

  async function loadPostData() {
    try {
      const response = await fetch(`https://22309.arpanetos.lol/posts/${postId}`)
      const posts = await response.json()
      posts.forEach((post) => {
        document.getElementById('input-title').value = post.title
        document.getElementById('input-image').value = post.banner_image_url
        document.getElementById('input-category').value = post.category
        document.getElementById('input-content').value = post.content
      })
    } catch (error) {
      form.innerHTML = `<h2>Error creando el post: ${error.message}</h2>`
    }
  }

  if (postId) {
    loadPostData(postId)
  } else {
    form.innerHTML = '<h2>Error cargando el post</h2>'
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const postData = {
      title: document.getElementById('input-title').value,
      banner_image_url: document.getElementById('input-image').value,
      category: document.getElementById('input-category').value,
      content: document.getElementById('input-content').value,
    }

    try {
      const response = await fetch(`https://22309.arpanetos.lol/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        window.location.href = '../index.html'
      } else {
        throw new Error('Error actualizando el post')
      }
    } catch (error) {
      form.innerHTML = `<h2>Error creando el post: ${error.message}</h2>`
    }
  })
})
