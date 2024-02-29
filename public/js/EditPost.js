document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-write-post')
  const urlParams = new URLSearchParams(window.location.search)
  const postId = urlParams.get('postId')

  if (postId) {
    loadPostData(postId)
  } else {
    console.error('No se proporcionó el ID del post.')
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
      const response = await fetch(`http://127.0.0.1:3000/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        alert('Post actualizado exitosamente!')
        window.location.href = '../index.html'
      } else {
        throw new Error('Error actualizando el post')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al actualizar el post. Por favor, inténtalo de nuevo.')
    }
  })
})

async function loadPostData(postId) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/posts/${postId}`)
    const posts = await response.json()

    posts.forEach((post) => {
      document.getElementById('input-title').value = post.title
      document.getElementById('input-image').value = post.banner_image_url
      document.getElementById('input-category').value = post.category
      document.getElementById('input-content').value = post.content
    })
  } catch (error) {
    console.error('Error cargando el post:', error)
  }
}
