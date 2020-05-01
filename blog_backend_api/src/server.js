import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';

//json object - fake db
const articlesInfo = {
    'learn-react': {
        upvotes: 0,
        comments: [],
    },
    'learn-node': {
        upvotes: 0,
        comments: [],
    }
}

const app = express();
app.use(express.static(path.join(__dirname, '/build')));

app.use(bodyParser.json());

const withDB = async (operations, res) => {
    try {
       
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('blog');

        await operations(db);
      
        client.close();

    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
}

app.get('/api/articles/:name', async (req, res) => {
    
    withDB(async (db) => {
        const articleName = req.params.name;
    
        const articlesInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(articlesInfo);
    }, res);   
})

//app.get('/hello', (req, res) => res.send('Hello!'));

// used with Fake DB
// app.post('/api/articles/:name/upvote', (req, res) => {
//     const articleName = req.params.name;

//     articlesInfo[articleName].upvotes += 1;
//     res.status(200).send(`${articleName} now has ${articlesInfo[articleName].upvotes} upvotes!`);
// })

// app.post('/api/articles/:name/add-comment', (req, res) => {
//     const { username, text } = req.body;
//     const articleName = req.params.name;

//     articlesInfo[articleName].comments.push({ username, text });

//     res.status(200).send(articlesInfo[articleName]);
// })

app.post('/api/articles/:name/upvote', async (req, res) => {
   
    withDB(async (db) => {
        const articleName = req.params.name;
       
        const articlesInfo = await db.collection('articles').findOne({name:articleName});
        await db.collection('articles').updateOne({name:articleName}, {
            '$set':{
                upvotes: articlesInfo.upvotes+1,
            },
        });
    
        const updatedArticleInfo = await db.collection('articles').findOne({name:articleName});
        res.status(200).json(updatedArticleInfo);
    },res);    
})

app.post('/api/articles/:name/add-comment', (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;

    withDB(async (db) =>{
        const articlesInfo = await db.collection('articles').findOne({name:articleName});
        await db.collection('articles').updateOne({ name:articleName}, {
            '$set':{
                comments: articlesInfo.comments.concat({username, text }),
            },
        });

        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000'));