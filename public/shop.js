
function fetchProducts (done) {
  $.get('/api/products', function (data) {
    done(data)
  })
}

function addProduct (name, manuf, price, done) {
  $.post('/api/products', {
    name: name,
    manufacturer: manuf,
    price: price
  }, function (data) {
    done(data)
  })
}

function createProductCard (product) {
  return $(`
    <div class="col-3 card mx-2 p-4" style="height:300px;width:300px;margin:30px;">
    <h4 class="product-name" style="background-color:"><b>${product.name}<b></h4>
    <div class="product-manufacturer"><br>${product.manufacturer}<br></div>
    <div class="row" style="padding-top:80px";>
    <div class="col m-3 p-3">
    <b>Rs. ${product.price}</b>
    </div>
    <button class="btn" style="background-color:#c8dd74;" onclick="buy('${product.name}','${product.price}','${product.manufacturer}') ">Buy</button>
    </div>
    </div>`
  )
}

function updateCart(productName,productPrice,manufacturer,done){
  console.log("in");
  console.log(productName,productPrice,manufacturer);
  $.post('/api/update_cart',{
    name:productName,
    manufacturer: manufacturer,
    price: productPrice
  },
  function(data){
    done(data)
  })

}

function fetchCartDetails(done){
  $.get('/api/update_cart',function(data){
    done(data)
  })
}

function cartProductCard(product){
  return $(`
    <li class="items odd">
    <div class="infoWrap">
    <div class="cartSection">
    <img src="http://lorempixel.com/output/technics-q-c-300-300-4.jpg" alt="" class="itemImg" />
    <p class="itemNumber">${product.manufacturer}</p>
    <h3>${product.productName}</h3>
    <p> <input type="text"  class="qty" placeholder="${product.quantity}"/>X ${product.productPrice}</p>
    </div>
    <div class="prodTotal cartSection">
    <p>${parseInt(product.quantity)*parseFloat(product.productPrice)}</p>
    </div>
    <div class="cartSection removeWrap">
    <button class="btn btn-danger" onclick="remove('${product.productName}','${product.productPrice}','${product.manufacturer}')">X</button>
    </div>
    </div>
    </li>

    `
  )
}

function buy(name,price,manufacturer){
  updateCart(name,price,manufacturer,function(data){
    console.log(data);
    window.alert("Added " +data.productName + " to Your Cart")
  })
}


function remove(name,price,manufacturer){
  console.log("in remove");
  console.log(name,price,manufacturer);
  $.post('/api/update_cart/remove',{
    name: name,
    manufacturer: manufacturer,
    price: price
  },
  ()=>{
    window.location = "./cart.html";
  }
)
}
