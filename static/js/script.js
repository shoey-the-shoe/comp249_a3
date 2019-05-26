(function () {
        const templateText = $("#tableTemplate").html();
        const tableTemplate = Handlebars.compile(templateText);
        const cartTemplateText = $("#cartTemplate").html()
        const cartTemplate = Handlebars.compile(cartTemplateText)
        const fullCartTemplateText = $("#fullCartTemplate").html()
        const fullCartTemplate = Handlebars.compile(fullCartTemplateText)
        const productDisplayTemplateText = $("#productDisplayTemplate").html()
        const productDisplayTemplate = Handlebars.compile(productDisplayTemplateText)
        const dataChangedEventProducts = new Event('dataChangedProducts')
        const dataChangedEventCart = new Event('dataChangedCart')
        var myProducts = new Products()
        var myCart = new Cart()

        $(document).ready(function () {
            myCart.getCart()
            // Serves to display cart state ONLY on page reload.
            $(window).on("dataChangedCart", function () {
                myCart.displayCartPreview()
            })
            myProducts.getProductList()
            $(window).on("dataChangedProducts", function () {
                // Display table of products
                myProducts.displayProductList()
                $(".productRow").click(function () {
                    // Retrieve first child --> product ID
                    var id = $(this).children('td:first-child').html()
                    // Use the ID as a key to retrieve product object
                    var product = myProducts.list.products[id]
                    $('#productDisplay').empty()
                    $('#fullCart').empty()
                    $('#productDisplay').html(productDisplayTemplate({ //Display detailed product info
                        productName: product.name, productCost: product.unit_cost,
                        productDescription: product.description, imageUrl: product.image_url
                    }))
                    // Add to cart functionality
                    $("#addToCart").click(function () {
                        var quantity = $('#quantity').val()
                        // If checkbox is checked, enable cart 'update'
                        if ($("#modifyCart").is(':checked')) {
                            myCart.postCart(product.id, quantity, 1)
                        } else {
                            myCart.postCart(product.id, quantity, -1)
                        }
                    });
                    $("#remove").click(function () {
                        $("#productDisplay").empty()
                    });
                })
            })

            // Cart preview functionality
            $("#cartDisplay").click(function () {
                var costTotal = 0
                myCart.list.forEach(x => costTotal += x.cost);
                costTotal = costTotal.toFixed(2)
                $("#productDisplay").empty()
                if (myCart.list.length == 0) {
                    $('#fullCart').html("Your cart is empty.")
                } else {
                    $('#fullCart').html(fullCartTemplate({array: myCart.list, costTotal}))
                }
            })
        })

        function Products() {
            this.url = '/products'
            this.list = []
        }

        // Sends GET to server, updates global product list.
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

        function Cart() {
            this.url = '/cart'
            this.list = []
        }

        // Sends GET to server, updates global cart list.
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
                    // Updates state of cart
                    self.list = response.cart
                    // Displays cart state asynchronously when product is added to cart (POST is successful).
                    myCart.displayCartPreview()
                }
            })
        }

        Cart.prototype.displayCartPreview = function () {
            var costTotal = 0;
            var quantTotal = 0;
            myCart.list.forEach((x) => {
                costTotal += x.cost;
                quantTotal += x.quantity;
            });
            $("#cartDisplay").html(cartTemplate({totalCost: costTotal.toFixed(2), noItems: quantTotal}))
        }
    }
)()




