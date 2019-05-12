var products = []


$(document).ready(function(){

   $('#message').html("This text has been inserted using jQuery from /static/js/script.js")
   getProductList()
   console.log(products)

})

function getProductList(){
   const url = '/products'
   $.get({
      url: url,
      success: function (data) {
         products = data;
      }
   })
}

function postCart(){
   //TODO
}

function getCart(){
   //TODO
}

function displayCart(){
   //TODO
}

function displayProductInfo(){
   //TODO
}