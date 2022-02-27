import {config, requestHeader} from "../_helpers";
import axios from "axios/index";

export const user = {
    namespaced: true,
    state: {
        user: null
    },
    actions: {
        getAuthenticatedUser( { commit } ) {
            commit('getAuthenticatedUserRequest');

            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/users/me',
                    method: 'GET',
                    crossDomain: true,
                    headers: requestHeader(true)
                }).then(response => {
                    let requestResponse = response.data;

                    commit('getAuthenticatedUserSuccess', requestResponse);

                    resolve(requestResponse);
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.response ) {
                        errorMessage = error.response.data.response;
                    }

                    commit('getAuthenticatedUserError');

                    reject(errorMessage);
                });
            })
        },

        changeEmail( context, { email } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/users/me/email',
                    method: 'POST',
                    headers: requestHeader(true),
                    data: {
                        email: email
                    }
                }).then(response => {
                    resolve("Email has been changed successfully! You will need to login again using new details.");
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },

        changePassword( context, { currentpassword, newpassword, repeatpassword } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/users/me/password',
                    method: 'POST',
                    headers: requestHeader(true),
                    data: {
                        currentpassword: currentpassword,
                        newpassword: newpassword,
                        repeatpassword: repeatpassword
                    }
                }).then(response => {
                    resolve("Password has been changed successfully! You will need to login again using new details.");
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },

    },
    mutations: {
      getAuthenticatedUserRequest(state) {
        state.user = null;
      },
      getAuthenticatedUserSuccess(state, response) {
        state.user = response;
      },
      getAuthenticatedUserError(state) {
          state.user = null;
      }
    }
};