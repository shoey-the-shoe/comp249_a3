(function () {
        const templateText = $("#tableTemplate").html();
        const tableTemplate = Handlebars.compile(templateText);
        const cartTemplateText = $("#cartTemplate").html()
        const cartTemplate = Handlebars.compile(cartTemplateText)
        const fullCartTemplateText = $("#fullCartTemplate").html()
        const fullCartTemplate = Handlebars.compile(fullCartTemplateText)
        var myProducts = new Products()
        var myCart = new Cart()

        $(document).ready(function () {
            myProducts.getProductList()
            myCart.getCart()
            if (myCart.list.length === 0) {
                $("#cartDisplay").html(cartTemplate({totalCost: 0, noItems: 0}))
            }
            $(window).on("dataChangedProducts", function () {
                myProducts.displayProductList()
                $(".pro").click(function () {
                    var id = $(this).children('td:first-child').html()
                    var product = myProducts.list.products[id]
                    $('#info').empty()
                    $('#fullCart').empty()
                    $("#info").html(
                        product.name + ' : $' + product.unit_cost + product.description
                        + "<img src=" + product.image_url + ">" + "<br>" + "<button id=\"remove\"\n" +
                        "        type=\"button\">\n" +
                        "    Remove\n" +
                        "</button>" + ' <button id="addToCart"\n' +
                        '        type="button">\n' +
                        '    Add to / Modify cart\n' +
                        '</button><br>' +
                        '<br><b>Quantity: </b><input type="number" id="quantity" value="1"> <input type="checkbox" id="modifyCart"/> Modify Cart<br>')

                    $("#addToCart").click(function () {
                        var quantity = $('#quantity').val()

                        if ($("#modifyCart").is(':checked')) {
                            myCart.postCart(product.id, quantity, 1)
                        } else {
                            myCart.postCart(product.id, quantity, -1)
                        }
                        //location.reload()
                    });
                    $("#remove").click(function () {
                        $("#info").empty()
                    });
                })
            })
            $(window).on("dataChangedCart", function () {
                $("#cartDisplay").click(function () {
                    console.log(myCart.list)
                    var costTotal = 0
                    for (var i = 0; i < myCart.list.length; i++) {
                        costTotal += myCart.list[i].cost
                    }
                    $("#info").empty()
                    console.log(Object.keys(myCart.list).length)
                    if (myCart.list.length == 0) {
                        $('#fullCart').html("Your cart is empty.")
                    } else {
                        $('#fullCart').html(fullCartTemplate({array: myCart.list.cart, costTotal}))
                    }

                })
            })
        })


        var dataChangedEventProducts = new Event('dataChangedProducts')

        function Products() {
            this.url = '/products'
            this.list = []
        }

        Products.prototype.getProductList = function () {
            var self = this
            $.get({
                url: self.url,
                success: function (data) {
                    self.list = data
                    window.dispatchEvent(dataChangedEventProducts)
                }
            })
        }

        Products.prototype.displayProductList = function () {
            $("#products").html(tableTemplate({array: myProducts.list.products}));
        }

        Products.prototype.productInfo = function (id) {
            //TODO
        }

        var dataChangedEventCart = new Event('dataChangedCart')

        function Cart() {
            this.url = '/cart'
            this.list = []
        }

        Cart.prototype.getCart = function () {
            var self = this
            $.get({
                url: self.url,
                success: function (data) {
                    //self.list = data
                    window.dispatchEvent(dataChangedEventCart)
                }
            })
        }

        Cart.prototype.postCart = function (id, q, u) {
            var self = this
            $.post({
                url: self.url,
                data: {
                    productid: id,
                    quantity: q,
                    update: u,
                },
                success: function (response) {
                    self.list = response
                    myCart.displayCartPreview()
                    //console.log(self.list)
                }
            })
        }

        Cart.prototype.displayCartPreview = function () {
            var costTotal = 0;
            var quantTotal = 0;
            for (var i = 0; i < myCart.list.cart.length; i++) {
                costTotal += myCart.list.cart[i].cost
                quantTotal += myCart.list.cart[i].quantity
            }
            $("#cartDisplay").html(cartTemplate({totalCost: costTotal, noItems: quantTotal}))
        }
    }
)()




