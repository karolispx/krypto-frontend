import { createStore } from 'vuex'

import { alert } from './alert';
import { authentication } from './authentication';
import { loader } from './loader';

export const store = createStore({
  modules: {
    alert,
    authentication,
    loader
  }
})