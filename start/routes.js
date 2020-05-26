'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/', () => {
  return "MarketGO API"
})

Route.group(() => {
  Route.get('/', 'ListController.index')
  Route.get('/:id', 'ListController.read')
  Route.post('/', 'ListController.create')
  Route.delete('/:id', 'ListController.remove')
  Route.patch('/:id', 'ListController.update')
  Route.get('/:id/products/', 'ListController.getProducts')
})
  .prefix('list')
  .middleware('auth')

Route.group(() => {
  Route.get('/', 'CategoryController.getCategories')
})
  .prefix('category')
  .middleware('auth')

Route.group(() => {
  Route.get('/all', 'ProductController.getAll')
  Route.get('/category/:id', 'ProductController.getProductsByCategory')
  Route.get('/:ean', 'ProductController.getProduct')

})
  .prefix('product')


Route.group(() => {
  Route.post('/product', 'ListController.addProducts')
  Route.delete('/product', 'ListController.removeProduct')
  Route.patch('/product', 'ListController.updateProduct')
})
  .prefix('cart')
  .middleware('auth')

Route.group(() => {
  Route.post('facebook', 'UserController.facebookLogin')
  Route.post('google', 'UserController.googleLogin')
  Route.post('/', 'UserController.login')
  Route.post('register', 'UserController.register')
  Route.post('verify', 'UserController.verify')
})
  .prefix('auth')

Route.group(() => {
  Route.get('/', 'CardController.index')
  Route.post('/', 'CardController.create')
  Route.delete('/', 'CardController.delete')
})
  .prefix('cards')
  .middleware('auth')


Route.group(() => {
  Route.post('/', 'PaymentController.payment')
  Route.get('/', 'PaymentController.index')
})
  .prefix('payments')
  .middleware('auth')