(function () {
        const templateText = $("#tableTemplate").html();
        const tableTemplate = Handlebars.compile(templateText);
        const cartTemplateText = $("#cartTemplate").html()
        const cartTemplate = Handlebars.compile(cartTemplateText)
        const fullCartTemplateText = $("#fullCartTemplate").html()
        const fullCartTemplate = Handlebars.compile(fullCartTemplateText)
        const productDisplayTemplateText = $("#productDisplayTemplate").html()
        const productDisplayTemplate = Handlebars.compile(productDisplayTemplateText)
        var myProducts = new Products()
        var myCart = new Cart()

        $(document).ready(function () {
            myCart.getCart()
            $(window).on("dataChangedCart", function () {
                myCart.displayCartPreview()
            })
            myProducts.getProductList()
            $(window).on("dataChangedProducts", function () {
                myProducts.displayProductList()
                $(".pro").click(function () {
                    var id = $(this).children('td:first-child').html()
                    var product = myProducts.list.products[id]
                    $('#productDisplay').empty()
                    $('#fullCart').empty()
                    $('#productDisplay').html(productDisplayTemplate({productName: product.name, productCost: product.unit_cost,
                        productDescription: product.description, imageUrl: product.image_url}))
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
                        $("#productDisplay").empty()
                    });
                })
            })

            $("#cartDisplay").click(function () {
                //console.log(myCart.list)
                var costTotal = 0
                for (var i = 0; i < myCart.list.length; i++) {
                    costTotal += myCart.list[i].cost
                }
                $("#productDisplay").empty()
                //console.log(Object.keys(myCart.list).length)
                if (myCart.list.length == 0) {
                    $('#fullCart').html("Your cart is empty.")
                } else {
                    $('#fullCart').html(fullCartTemplate({array: myCart.list, costTotal}))
                }
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
                    self.list = data.cart
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
                    self.list = response.cart
                    myCart.displayCartPreview()
                    console.log(self.list)
                }
            })
        }

        Cart.prototype.displayCartPreview = function () {
            var costTotal = 0;
            var quantTotal = 0;
            for (var i = 0; i < myCart.list.length; i++) {
                costTotal += myCart.list[i].cost
                quantTotal += myCart.list[i].quantity
            }
            $("#cartDisplay").html(cartTemplate({totalCost: costTotal, noItems: quantTotal}))
        }
    }
)()




