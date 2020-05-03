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
  return { greeting: 'Hello world in JSON' }
})

Route
  .post('login', 'UserController.login')
  .middleware('guest')

Route
  .get('users/:id', 'UserController.show')
  .middleware('auth')

Route
  .post('register', 'UserController.register')
  .middleware('guest')


Route.group(() => {
  Route.get('/', 'ListController.index')
  Route.get('/:id', 'ListController.read')
  Route.post('/', 'ListController.create')
  Route.delete('/:id', 'ListController.remove')
  Route.patch('/:id', 'ListController.update')
})
  .prefix('list')
  .middleware('auth')

Route.group(() => {
  Route.get('facebook', 'FacebookController.redirect')
  Route.get('google', 'GoogleController.redirect')

}).prefix('auth')


Route.group(() => {
  Route.get('facebook', 'FacebookController.callback')
  Route.get('google', 'GoogleController.callback')
}).prefix('authenticated')
