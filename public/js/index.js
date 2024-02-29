document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('post-list');
    const formSearchPost = document.getElementById('form-search-post');
    const inputIdPost = document.getElementById('input-id-post');

    async function loadPosts() {
        try {
            const response = await fetch('http://127.0.0.1:3000/posts'); 
            let posts = await response.json();

            posts = posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));


            while (postsContainer.children.length > 1) {
                postsContainer.removeChild(postsContainer.lastChild);
            }

            posts.forEach(post => {
                const postElement = document.createElement('article');
                postElement.classList.add('post-container');

                postElement.innerHTML = `
                    <h3 class="post-title"><span class="post-id">${post.id}</span>. ${post.title}</h3>
                    <p class="post-date">${new Date(post.created_at)}</p>
                    <img src="${post.banner_image_url}" alt="" class="post-img">
                    <p class="post-category">${post.category}</p>
                    <p class="post-content">${post.content}</p>
                    <div class="post-actions">
                        <button class="btn-edit-post" onclick="location.href='../html/EditPost.html?postId=${post.id}'">Editar</button>
                        <button class="btn-delete-post">Eliminar</button>
                    </div>
                `;

                postsContainer.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    loadPosts();

    formSearchPost.addEventListener('submit', async (e) => {
        e.preventDefault();

        const postId = inputIdPost.value.trim();

        if (!postId) {
            alert('Por favor, ingresa un ID válido.');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:3000/posts/${postId}`);
            if (!response.ok) {
                if (response.status === 404) {
                    alert('Post no encontrado.');
                } else {
                    throw new Error('Error en la búsqueda del post.');
                }
            }

            const posts = await response.json();

            posts.forEach(post => {
                displayPost(post);
            });
            
            
        } catch (error) {
            console.error('Error fetching post:', error);
            alert('Error al buscar el post. Por favor, inténtalo de nuevo.');
        }
    });

});

function displayPost(post) {
    const postsContainer = document.getElementById('post-list');
    postsContainer.innerHTML = ''; 


    const postElement = document.createElement('article');
    postElement.classList.add('post-container');

    postElement.innerHTML = `
        <h3 class="post-title"><span class="post-id">${post.id}</span>. ${post.title}</h3>
        <p class="post-date">${post.created_at}</p> <!-- Asegúrate de ajustar según la estructura de tu post -->
        <img src="${post.banner_image_url}" alt="" class="post-img">
        <p class="post-category">${post.category}</p>
        <p class="post-content">${post.content}</p>
        <div class="post-actions">
            <button class="btn-edit-post">Editar</button>
            <button class="btn-delete-post">Eliminar</button>
        </div>
    `;

    postsContainer.appendChild(postElement);
}



