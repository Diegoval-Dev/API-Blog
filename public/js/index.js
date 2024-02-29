
async function getAllPosts() {
    //cambiar por arpanetos
    const url = 'http://127.0.0.1:3000/posts';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return fetch(url, options)
        .then(response => response.json())
        .catch(error => console.error('Error fetching posts:', error));
}

function loadPosts() {
    const postList = document.getElementById('post-list');
    getAllPosts().then(posts => {
        posts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.appendChild(
                document.createTextNode(`${post.title} - ${post.category}`)
            );
            postList.appendChild(listItem);
        });
    });
}

function createPost(id, title, authon, content, banner_image_url, category, date) {
    const postContainer = document.createElement('article');
    const postTitle = document.createElement('h3');
    const postID = document.createElement('span');
    const postImg = document.createElement('img');
    const postAuthor = document.createElement('h4');
    const postCategory = document.createElement('p');
    const postContent = document.createElement('p');
    const postDate = document.createElement('p');
    const postActions = document.createElement('div');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    postContainer.classList.add('post-container');
    postTitle.className.add('post-title');
    postID.className.add('post-id');
    postImg.className.add('post-img');
    postAuthor.className.add('post-author');
    postCategory.className.add('post-category');
    postContent.className.add('post-content');
    postDate.className.add('post-date');
    postActions.className.add('post-actions');
    editButton.className.add('btn-edit-post');
    deleteButton.className.add('btn-delete-post');

    postTitle.appendChild(postID);

    postTitle.textContent = title;
    postID.textContent = id;
    postImg.src = banner_image_url;
    postAuthor.textContent = authon;
    postCategory.textContent = category;
    postContent.textContent = content;
    postDate.textContent = date;
    editButton.textContent = 'Editar';
    deleteButton.textContent = 'Eliminar';

    postActions.appendChild(editButton);
    postActions.appendChild(deleteButton);
    
    postContainer.appendChild(postTitle);
    postContainer.appendChild(postDate);
    postContainer.appendChild(postImg);
    postContainer.appendChild(postAuthor);
    postContainer.appendChild(postCategory);
    postContainer.appendChild(postContent);
    postContainer.appendChild(postActions);

}



