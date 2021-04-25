import ApiService from "@/common/api.service";
import {
  GET_USERS,
} from "@/store/actions.type";
import {
  SET_USERS,
  SET_ERROR,
} from "@/store/mutations.type";


const state = {
  errors: null,
  users: null,
};


const getters = {
  // Get users
  users(state: any) {
    return state.users;
  },

  // Get errors
  errors(state: any) {
    return state.errors;
  },
};


const actions = {
  // Get users
  [GET_USERS](context: any, credentials: any) {
    return new Promise((resolve, reject) => {
      ApiService.get("auth/users")
        .then(({ data }) => {
          context.commit(SET_USERS, data.items);
          resolve(data);
        })
        .catch(({ error }) => {
          context.commit(SET_ERROR, error);
          reject(error);
        });
    });
  },
};


const mutations = {
  // Set auth
  [SET_USERS](state: any, data: any) {
    state.errors = {};
    state.users = data;
  },


  // Set errors
  [SET_ERROR](state: any, error: any) {
    state.errors = error;
  },
};


export default {
  state,
  actions,
  mutations,
  getters
};