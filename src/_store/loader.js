export const loader = {
    namespaced: true,
    state: {
        pageLoader: false
    },
    actions: {
        page({ commit }, action) {
            commit('page', action);
        }
    },
    mutations: {
        page(state, action) {
            if ( action == 'on' ) {
                state.pageLoader = true;
            } else {
                state.pageLoader = false;
            }
        }
    }
};