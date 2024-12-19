3. Shopping Cart API
   3.1 GET /api/cart – View All Items in Cart

RES:

200 OK

json

[

{

"id": 1,

"productId": 1,

"quantity": 2
}

]

3.2 POST /api/cart – Add Product to Cart

REQ:

Headers:

Authorization: Bearer

Body:

json

{

"productId": 1,

"quantity": 2

}

RES:

201 Created

json

{

"id": 1,

"productId": 1,

"quantity": 2

}

3.3 DELETE /api/cart/:id – Remove Item from Cart

REQ:

Headers:

Authorization: Bearer

RES:

200 OK

json

{ "message": "Item removed from cart." }

3.4. POST /api/checkout – Perform Transaction

REQ:

Headers:

Authorization: Bearer

RES:

200 OK

json

{ "message": "Transaction completed successfully." }
