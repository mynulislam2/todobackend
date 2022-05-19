const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config()
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.nnlxe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const collection = client.db("TodoList").collection("list");
    app.get('/Todo', async (req, res) => {
      const query = {}
      const cursor = collection.find(query);
      const result = await cursor.toArray();

      res.send(result)

    })
    app.delete('/Todo/:id', async (req, res) => {
      const id = req.params.id
      console.log(id);
      const query = { _id: ObjectId(id) }
      const result = await collection.deleteOne(query);
      res.send(result)

    })
    app.put('/Todo', async (req, res) => {
      const Task = req.body
      console.log(Task);
      const doc = {
        TaskName: Task.TaskName,
        TaskDescription: Task.TaskDescription
      }
      const result = await collection.insertOne(doc);
      res.send(result)
    })


  }

  finally {

  }
}
run().catch(console.dir);

app.get('/', (req, res) => { res.send('hey') })
app.listen(port, () => { console.log('listen to port', port) })