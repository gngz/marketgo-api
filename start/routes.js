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

Route.get('auth/facebook', 'FacebookController.redirect')
Route.get('auth/google', 'GoogleController.redirect')

Route.get('authenticated/facebook', 'FacebookController.callback')
Route.get('authenticated/google', 'GoogleController.callback')
