//src/auth/index.js

import {router} from '../index'

// URL and endpoint constants
const API_URL = 'http://localhost:3000/'

export default {

 
  // Send a request to the login URL and save the returned JWT
  GetRequest(context, params, callback) {
    context.$http.get(API_URL+params.url, params.data, (data) => {
      callback(data);

    }).error((err) => {
      context.error = err
    })
  },
   PostRequest(context, params, callback) {
    context.$http.post(API_URL+params.url, params.data, (data) => {
      callback(data);

    }).error((err) => {
      context.error = err
    })
  }

 
}