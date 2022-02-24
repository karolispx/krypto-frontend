import { createStore } from 'vuex'

import { alert } from './alert';
import { authentication } from './authentication';
import { loader } from './loader';
import { user } from './user';
import { dashboard } from './dashboard';

export const store = createStore({
  modules: {
    alert,
    authentication,
    loader,
    user,
    dashboard
  }
})