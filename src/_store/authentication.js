import {config, requestHeader} from "../_helpers";
import axios from 'axios'

const kryptoLS = localStorage.getItem('krypto');

let initialState = {
    authenticated: false
};

if ( kryptoLS ) {
    initialState['authenticated'] = true;
}

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        login( { commit }, { email, password } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/users/authenticate',
                    method: 'POST',
                    headers: requestHeader(),
                    data: {
                        email: email,
                        password: password
                    }
                }).then(response => {
                    let requestResponse = response.data;

                    if ( requestResponse && requestResponse.token) {
                        localStorage.setItem('krypto', requestResponse.token);
                    }

                    commit('authenticationSuccess');

                    resolve("You have logged in successfully!");
                }).catch(error => {
                    let errorMessage = "Something went wrong. Please try again later.";

                    if ( error.response && error.response.data.response ) {
                        errorMessage = error.response.data.response;
                    }

                    commit('authenticationError');

                    reject(errorMessage);
                });
            })
        },

        register( { commit }, { email, password, repeatpassword } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/users',
                    method: 'POST',
                    headers: requestHeader(),
                    data: {
                        email: email,
                        password: password,
                        repeatpassword: repeatpassword,
                    }
                }).then(response => {
                    let requestResponse = response.data;

                    if ( requestResponse && requestResponse.token) {
                        localStorage.setItem('krypto', requestResponse.token);
                    }

                    commit('authenticationSuccess');

                    resolve("You have registered successfully!");
                }).catch(error => {
                    let errorMessage = "Something went wrong. Please try again later.";

                    if ( error.response && error.response.data.response ) {
                        errorMessage = error.response.data.response;
                    }

                    commit('authenticationError');

                    reject(errorMessage);
                });
            })
        },

        resetPassword( { commit }, { email } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/password-reset',
                    method: 'POST',
                    headers: requestHeader(),
                    data: {
                        email: email
                    }
                }).then(response => {
                    let requestResponse = response.data;

                    if ( requestResponse && requestResponse.message) {
                        resolve(requestResponse.message);
                    } else {
                        resolve("Something went wrong. Please try again later.");
                    }

                }).catch(error => {
                    let errorMessage = "Something went wrong. Please try again later.";

                    if ( error.response && error.response.data.response ) {
                        errorMessage = error.response.data.response;
                    }

                    reject(errorMessage);
                });
            })
        },
        
        resetPasswordFlow( { commit }, { token, email, newpassword, repeatpassword } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/password-reset/' + token,
                    method: 'POST',
                    headers: requestHeader(),
                    data: {
                        email: email,
                        newpassword: newpassword,
                        repeatpassword: repeatpassword
                    }
                }).then(response => {
                    let requestResponse = response.data;

                    console.log(requestResponse)
                    if ( requestResponse && requestResponse.message) {
                        resolve(requestResponse.message);
                    } else {
                        resolve("Something went wrong. Please try again later.");
                    }

                }).catch(error => {
                    let errorMessage = "Something went wrong. Please try again later.";

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },

        logout({ commit }) {
            localStorage.removeItem('krypto');

            commit('logout');
        }
    },
    mutations: {
        authenticationSuccess(state) {
            state.authenticated = true;
        },
        authenticationError(state) {
            state.authenticated = false;
        },
        logout(state) {
            state.authenticated = false;
        }
    }
};