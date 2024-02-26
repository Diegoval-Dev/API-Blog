import express from 'express';
import { getAllPosts } from '../database/db.js';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
});

app.use(express.json());

app.get('/posts', async (req, res) => {
    console.log(getAllPosts())
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('An error occurred while fetching posts');
    }
});


app.use((req, res) => {
    res.status(404).send('404 Not Found');
});