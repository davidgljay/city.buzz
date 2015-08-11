angular.module('firebase.config', [])
  .constant('FBURL', 'https://boiling-torch-581.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','facebook','google'])
  .constant('loginRedirectPath', '/login');

