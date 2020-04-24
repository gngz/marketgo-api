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

Route.get('login/facebook', 'FacebookController.redirect')
Route.get('login/google', 'GoogleController.redirect')

Route.get('facebook/callback', 'FacebookController.callback')
Route.get('google/callback', 'GoogleController.callback')