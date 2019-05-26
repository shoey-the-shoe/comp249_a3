COMP249 Web Technology 2019: JavaScript Web Application
===

## Implementation Description


- **Script.js**
	+ `script.js` contains all of the front-end JavaScript code that runs in the browser to provide an interface to the online store front.
	
- **Techniques**
	+ Product table 'click' functionality
		* A Handlebars template was used to structure and format the array of products into a table. Each row was referenced using a hidden `id` element. Upon clicking on a row, the `id` is used as a key to reference the chosen product, which is then displayed in the browser.
	+ Add to cart functionality
		* Add to cart and `displayCartPreview` are inherently linked due to the asynchronous nature of the implementation. Upon clicking 'Add to cart' in the browser, a POST request is sent to the server with the relevant arguments. Upon 'success', the current cart is immediately updated with the `/cart` response and the `displayCartPreview` is invoked. Changes to the cart are immediately reflected in the browser.
		- Page reloads are handled by a GET request to cart. The GET request is only used on page reloads. After the user 'adds to cart' the cart updates (including cart preview) are handled by POST responses (GET /cart).
		* *Extension feature* - `update_cart()` in `session.py` is used to implement the cart update / product removal functionality. A checkbox included with the POST form represents a -1 for 'unchecked' and a 1 for 'checked'. If 'checked', the quantity of the selected product will be updated in the cart upon the next POST to the server. This information is reflected in both the cart preview and full cart display.

