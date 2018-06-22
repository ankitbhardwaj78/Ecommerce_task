$(function(){
  let cart_detail = $('#cart_detail');
  let total = $('#totalPrice');
  let totalprice = 0;


  fetchCartDetails(function(products){
    cart_detail.empty();
    console.log("htiiii");
    for (product of products) {
      cart_detail.append(cartProductCard(product))
      totalprice  =totalprice + parseInt(product.productPrice)*parseFloat(product.quantity)
    }
    total.html( totalprice );
    console.log(total);
  })
  $('#showshop').click(function(){
    window.location = "./index.html";
  })


});
