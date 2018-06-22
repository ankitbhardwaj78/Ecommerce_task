const Cart = require('../../db').Cart

const route = require('express').Router();

route.get('/', (req, res) => {
  // Get all products
  Cart.findAll()
  .then((carts) => {
    res.status(200).send(carts)
  })
  .catch((err) => {
    res.status(500).send({
      error: "Could not retrieve products"
    })
  })
})


route.post('/remove',(req,res) => {
  console.log("hhhhhhhhhhhhhhhhhhh",req.body.name,req.body.manufacturer,req.body.price);
  Cart.destroy({
    where: {
      productName: String(req.body.name),
      manufacturer: String(req.body.manufacturer),
      productPrice: parseFloat(req.body.price)
    }
  })
  .then((cart)=>{
    res.send("removed successfully");
  })
  .catch((err)=>{
     res.send("errrrrrr")
  })
})


route.post('/', (req, res) => {
  // Validate the values
  console.log("in cart");
  if (isNaN(req.body.price)) {
    return res.status(403).send({
      error: "Price is not valid number"
    })
  }
  Cart.findOne({
    where: {
      productName: String(req.body.name),
      manufacturer: String(req.body.manufacturer),
      productPrice: parseFloat(req.body.price)
    }
  })
  .then((cart)=>{
    let new_quantity = cart.quantity + 1;
    cart.updateAttributes({quantity: new_quantity})
    res.status(201).send(cart);
  })
  .catch((err)=>{

    Cart.create({
      productName: String(req.body.name),
      manufacturer: String(req.body.manufacturer),
      productPrice: parseFloat(req.body.price),
    }).then((product) => {
      res.status(201).send(product)
    }).catch((error) => {
      res.status(502).send({
        error: "Error adding product"
      })
    })
  })
  // Add a new product

})

exports = module.exports = route
