let alertTimeout;

export const alert = {
    namespaced: true,
    state: {
        type: null,
        message: null,
        display: false,
    },
    actions: {
        success({ commit }, message) {
            commit('success', message);

            clearTimeout(alertTimeout);

            alertTimeout = setTimeout( () => {
                commit('clear');
            }, 4000 );
        },
        error({ commit }, message) {
            commit('error', message);

            clearTimeout(alertTimeout);

            alertTimeout = setTimeout( () => {
                commit('clear');
            }, 4000 );
        },
        warning({ commit }, message) {
            commit('warning', message);

            clearTimeout(alertTimeout);

            alertTimeout = setTimeout( () => {
                commit('clear');
            }, 4000 );
        },
        clear({ commit }) {
            clearTimeout(alertTimeout);

            commit('clear');
        }
    },
    mutations: {
        success(state, message) {
            state.type = 'alert alert-success';
            state.message = message;
            state.display = true;
        },
        error(state, message) {
            state.type = 'alert alert-danger';
            state.message = message;
            state.display = true;
        },
        warning(state, message) {
            state.type = 'alert alert-warning';
            state.message = message;
            state.display = true;
        },
        clear(state) {
            state.type = null;
            state.message = null;
            state.display = false;
        }
    }
};