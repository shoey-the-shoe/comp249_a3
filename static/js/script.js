(function () {
        const templateText = $("#tableTemplate").html();
        const tableTemplate = Handlebars.compile(templateText);
        var myProducts = new Products()
        var myCart = new Cart()

        $(document).ready(function () {
            myProducts.getProductList()
            myCart.getCart()
            $(window).on("dataChangedProducts", function () {
                myProducts.displayProductList()
                $(".pro").click(function () {
                    var id = $(this).children('td:first-child').html()
                    var product = myProducts.list.products[id]
                    $('#info').empty()
                    $("#info").html(
                  product.name + ' : $' + product.unit_cost + product.description
                        + "<img src=" + product.image_url + ">" + "<br>" + "<button id=\"remove\"\n" +
                        "        type=\"button\">\n" +
                        "    Remove\n" +
                        "</button>")

                    $("#info").append(
                        ' <button id="addToCart"\n' +
                        '        type="button">\n' +
                        '    Add to cart\n' +
                        '</button>'
                    )
                    $("#addToCart").click(function () {
                        myCart.postCart(product.id, 1, 1)
                    });
                    $("#remove").click(function () {
                        $("#info").empty()
                    });
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
                    self.list = data
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
                    console.log(response)
                }
            })
        }

        Cart.prototype.displayCart = function () {
            //TODO
        }


    }
)()




