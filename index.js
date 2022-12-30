const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y6l8m1u.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const postCollection = client.db('birdsEye').collection('postInfo');

        app.post('/posts', async(req, res) => {
            const post = req.body;
            const result = await postCollection.insertOne(post);
            res.send(result);
        })

        app.get('/posts', async(req, res) => {
            const query = {};
            const options = await postCollection.find(query).toArray();
            res.send(options);
        })

        app.get('/selectedpost', async(req, res) => {
            const query = {};
            const options = await postCollection.find(query).limit(3).toArray();
            res.send(options);
        })

        app.get('/posts/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id:ObjectId(id) };
            const post = await postCollection.findOne(query);
            res.send(post);
        })

    }
    finally{

    }
}
run().catch(console.log())


app.get('/', async(req, res) => {
    res.send(`Birds' Eye server is running`)
})

app.listen(port, () => console.log('My server is running'))