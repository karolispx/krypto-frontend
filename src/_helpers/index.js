// Config Variables
export const config = {
  'defaultMessages': {
    'error': 'Something went wrong. Please try again later.',
  },
  'apiUrl': 'http://localhost:8080/api',
  'appUrl': 'http://localhost:3000/',
};

// Add request header
export function requestHeader(authRequired = false) {
  let requestHeaderReturn = {
      'Content-Type': 'application/json'
  };

  if ( authRequired && localStorage.getItem('krypto') ) {
      requestHeaderReturn.Authorization = 'Bearer ' + localStorage.getItem('krypto')
  }

  return requestHeaderReturn
}