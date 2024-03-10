import express from 'express'
import { getAllPosts, createPost, getPostById, updatePostById, deletePostById } from './database/db'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import {logDetails} from './middlewares/loggingMiddleware'
import cors from 'cors'
import isValidBase64 from './helpers/imageValidator'



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(join(__dirname, 'public')));
app.use(logDetails);
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error serving index.html');
        }
    });
});

app.use(express.json());

// GET /posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('An error occurred while fetching posts');
    }
});

// POST /posts
app.post('/posts', async (req, res) => {
    const { title, content, bannerImageB64, category } = req.body;
    if (!title || !content || !banner_image_base64 || !category) {
        return res.status(400).send("Missing or malformed data in the body");
    }
    if (!isValidBase64(banner_image_base64)) {
        return res.status(400).send("Image is not in Base64 format");
    }
    try {
        const result = await createPost(title, content, bannerImageB64, category);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('An error occurred while creating the post');
    }
});

// GET /posts/:id
app.get('/posts/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await getPostById(postId);
        if (post.length > 0) {
            res.json(post);
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).send('An error occurred while fetching the post');
    }
});

// PUT /posts/:id
app.put('/posts/:postId', async (req, res) => {
    const { postId } = req.params;
    const { title, content, banner_image_base64, category } = req.body;

    if (!title || !content || !banner_image_base64 || !category) {
        return res.status(400).send("Missing or malformed data in the body");
    }
    if (!isValidBase64(banner_image_base64)) {
        return res.status(400).send("Image is not in Base64 format");
    }
    try {
        const result = await updatePostById(postId, title, content, banner_image_base64, category);
        if (result.affectedRows === 0) {
            return res.status(404).send("Post not found");
        }
        const updatedPost = await getPostById(postId);
        res.status(200).json(updatedPost[0]);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).send('An error occurred while updating the post');
    }
});

// DELETE /posts/:id
app.delete('/posts/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const result = await deletePostById(postId);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send('An error occurred while deleting the post');
    }
});

app.use((req, res, next) => {
    res.status(404).send("404 Not Found");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server error!');
});

app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
});