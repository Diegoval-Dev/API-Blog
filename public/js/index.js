document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('post-list')
  const formSearchPost = document.getElementById('form-search-post')
  const inputIdPost = document.getElementById('input-id-post')

  const displayPost = (post) => {
    postsContainer.innerHTML = ''

    const postElement = document.createElement('article')
    postElement.classList.add('post-container')

    postElement.innerHTML = `
      <h3 class="post-title"><span class="post-id">${post.id}</span>. ${post.title}</h3>
      <p class="post-date">${post.created_at}</p>
      <img src="${post.banner_image_url}" alt="Post image" class="post-img">
      <p class="post-category">${post.category}</p>
      <p class="post-content">${post.content}</p>
      <div class="post-actions">
        <button class="btn-edit-post" onclick="location.href='../html/EditPost.html?postId=${post.id}'">Editar</button>
        <button class="btn-delete-post" data-post-id="${post.id}">Eliminar</button>
      </div>
    `

    postsContainer.appendChild(postElement)
  }

  const loadPosts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:22309/posts')
      let posts = await response.json()

      posts = posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

      postsContainer.innerHTML = ''

      posts.forEach((post) => displayPost(post))
    } catch (error) {
      postsContainer.innerHTML = `<h2>Error cargando los posts: ${error.message}</h2>`
    }
  }

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`http://127.0.0.1:22309/posts/${postId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('El post no pudo ser eliminado.')
      }

      loadPosts()
    } catch (error) {
      postsContainer.innerHTML = `<h2>Error error eliminando el post: ${error.message}</h2>`
    }
  }

  loadPosts()

  formSearchPost.addEventListener('submit', async (e) => {
    e.preventDefault()

    const postId = inputIdPost.value.trim()

    if (!postId) {
      return
    }

    try {
      const response = await fetch(`http://127.0.0.1:22309/posts/${postId}`)
      if (!response.ok) {
        if (response.status === 404) {
          postsContainer.innerHTML = '<h2>Error, post no encontrado</h2>'
        }
        throw new Error('Error en la búsqueda del post.')
      }

      const post = await response.json()
      displayPost(post)
    } catch (error) {
      postsContainer.innerHTML = `<h2>Error cargando los posts: ${error.message}</h2>`
    }
  })

  postsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete-post')) {
      const postId = e.target.getAttribute('data-post-id')
      deletePost(postId)
    }
  })
})
