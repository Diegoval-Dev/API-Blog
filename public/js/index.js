document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('post-list')
  const formSearchPost = document.getElementById('form-search-post')
  const inputIdPost = document.getElementById('input-id-post')

  function displayPost(post) {
    postsContainer.innerHTML = ''

    const postElement = document.createElement('article')
    postElement.classList.add('post-container')

    postElement.innerHTML = `
          <h3 class="post-title"><span class="post-id">${post.id}</span>. ${post.title}</h3>
          <p class="post-date">${post.created_at}</p> <!-- Asegúrate de ajustar según la estructura de tu post -->
          <img src="${post.banner_image_url}" alt="" class="post-img">
          <p class="post-category">${post.category}</p>
          <p class="post-content">${post.content}</p>
          <div class="post-actions">
              <button class="btn-edit-post" onclick="location.href='../html/EditPost.html?postId=${post.id}'">Editar</button>
              <button class="btn-delete-post" data-post-id="${post.id}" >Eliminar</button>
          </div>
      `

    postsContainer.appendChild(postElement)
  }

  async function loadPosts() {
    try {
      const response = await fetch('https://22309.arpanetos.lol/posts')
      let posts = await response.json()

      posts = posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

      while (postsContainer.children.length > 1) {
        postsContainer.removeChild(postsContainer.lastChild)
      }

      posts.forEach((post) => {
        const postElement = document.createElement('article')
        postElement.classList.add('post-container')

        postElement.innerHTML = `
                        <h3 class="post-title"><span class="post-id">${post.id}</span>. ${post.title}</h3>
                        <p class="post-date">${new Date(post.created_at)}</p>
                        <img src="${post.banner_image_url}" alt="" class="post-img">
                        <p class="post-category">${post.category}</p>
                        <p class="post-content">${post.content}</p>
                        <div class="post-actions">
                            <button class="btn-edit-post" onclick="location.href='../html/EditPost.html?postId=${post.id}'">Editar</button>
                            <button class="btn-delete-post" data-post-id="${post.id}" >Eliminar</button>
                        </div>
                    `

        postsContainer.appendChild(postElement)
      })
    } catch (error) {
      console.error('Error fetching posts:', error)
      alert('Error al cargar los posts. Por favor, inténtalo de nuevo.')
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
      const response = await fetch(`https://22309.arpanetos.lol/posts/${postId}`)
      if (!response.ok) {
        if (response.status === 404) {
          alert('Post no encontrado.')
          return
        }
        throw new Error('Error en la búsqueda del post.')
      }

      const posts = await response.json()

      posts.forEach((post) => {
        displayPost(post)
      })
    } catch (error) {
      console.error('Error fetching post:', error)
      alert('Error al buscar el post. Por favor, inténtalo de nuevo.')
    }
  })

  postsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete-post')) {
      const postId = e.target.getAttribute('data-post-id')
      deletePost(postId)
    }
  })
})

async function deletePost(postId) {
  try {
    const response = await fetch(`https://22309.arpanetos.lol/posts/${postId}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      location.reload()
    } else {
      throw new Error('El post no pudo ser eliminado.')
    }
  } catch (error) {

  }
}
