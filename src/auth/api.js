
import {router} from '../index'

// URL and endpoint constants
/*const API_URL = 'http://192.168.99.100:3000/'*/
const API_URL = 'http://localhost:3000/'
const LOGIN_URL = API_URL + 'users/login'
const SIGNUP_URL = API_URL + 'users/add'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login(context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds, (data) => {
      if (data.code != 200) {
        alert(data.msg);
        return;
      }
      console.log(data);
      localStorage.setItem('id_token', data.id_token);
      localStorage.setItem('user_id', data.user_id);

      this.user.authenticated = true

      // Redirect to a specified route
      if (redirect) {
        router.go(redirect)
      }

    }).error((err) => {
      context.error = err
    })
  },

  signup(context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('id_token', data.id_token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }

    }).error((err) => {
      context.error = err
    })
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('user_id')
    this.user.authenticated = false
    router.go('login')
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  },
  GetRequest(context, params, callback) {
    context.$http.get(API_URL + params.url, params.data, (data) => {
      callback(data);

    }).error((err) => {
      context.error = err
    })
  },
  PostRequest(context, params, callback) {
    context.$http.post(API_URL + params.url, params.data, (data) => {
      callback(data);

    }).error((err) => {
      context.error = err
    })
  }
}