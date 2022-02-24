// Config Variables
export const config = {
  'apiUrl': 'http://localhost:8080/api',
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