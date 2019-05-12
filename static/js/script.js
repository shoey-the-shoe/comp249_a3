(function () {

        $(document).ready(function () {
            var myProducts = new Products()
            var myCart = new Cart()
            myProducts.getProductList()
            myCart.getCart()
            $(window).on("dataChangedProducts", function () {
                console.log(myProducts.list)
                console.log(myProducts.url)
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




