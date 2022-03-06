// Config Variables
export const config = {
  'defaultMessages': {
    'error': 'Something went wrong. Please try again later.',
  },
  'apiUrl': 'https://final-project-krypto.herokuapp.com/api',
  // 'apiUrl': 'http://localhost:8080/api',
  'appUrl': 'http://krypto-project.online/',
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