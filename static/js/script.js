(function () {
        const templateText = $("#tableTemplate").html();
        const tableTemplate = Handlebars.compile(templateText);
        var myProducts = new Products()
        var myCart = new Cart()
        $(document).ready(function () {
            myProducts.getProductList()
            myCart.getCart()
            $(window).on("dataChangedProducts", function () {
                console.log(myProducts.list.products)
                console.log(myProducts.url)
                myProducts.displayProductList()
                var id = null;
                $("#pro td").slice(0, 60).click(function () {
                    console.log($(this).parent().find('td:first').html())
                    id = $(this).parent().find('td:first').html()
                })
            })
            $(window).on("dataChangedCart", function () {
                console.log(myCart.list)
                console.log(myCart.url)
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

        Cart.prototype.postCart = function (id, quantity, update) {
            //TODO
        }

        Cart.prototype.displayCart = function () {
            //TODO
        }


    }
)()




