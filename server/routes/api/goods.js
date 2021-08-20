const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
  const goods = await loadGoods();
  res.send(await goods.find({}).toArray());
});

router.post('/', async (req, res)=> {
  const goods = await loadGoods();
  await goods.insertOne({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
  })
  res.status(201).send();
})

router.delete('/:id', async (req, res)=> {
  const goods = await loadGoods();
  await goods.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  })
  res.status(200).send();
})


async function loadGoods() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://filamin:12345@idaproj-app-cluster.gfeag.mongodb.net/idaproj-app-cluster?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      }
    )
  return client.db('idaproj-app-cluster')
    .collection('goods');
}

module.exports = router;
