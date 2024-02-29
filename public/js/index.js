document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('post-list');

    async function loadPosts() {
        try {
            const response = await fetch('http://127.0.0.1:3000/posts'); 
            const posts = await response.json();
            
            console.log(posts);

            while (postsContainer.children.length > 1) {
                postsContainer.removeChild(postsContainer.lastChild);
            }

            posts.forEach(post => {
                const postElement = document.createElement('article');
                postElement.classList.add('post-container');


                postElement.innerHTML = `
                    <h3 class="post-title"><span class="post-id">${post.id}</span>. ${post.title}</h3>
                    <p class="post-date">${post.created_at}</p>
                    <img src="${post.banner_image_url}" alt="" class="post-img">
                    <p class="post-category">${post.category}</p>
                    <p class="post-content">${post.content}</p>
                    <div class="post-actions">
                        <button class="btn-edit-post">Editar</button>
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

});



