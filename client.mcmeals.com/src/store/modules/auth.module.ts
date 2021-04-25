import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  VALIDATE_TOKEN,
} from "@/store/actions.type";
import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR,
} from "@/store/mutations.type";


const state = {
  errors: null,
  user: null,
  profile: null,
  isAuthenticated: false,
};


const getters = {
  // Current user
  user(state: any) {
    return state.user;
  },

  // Is authenticated
  isAuthenticated(state: any) {
    return state.isAuthenticated;
  },

  // Get errors
  getErrors(state: any) {
    return state.errors;
  },

  // Get profile
  profile(state: any) {
    return state.profile;
  },
};


const actions = {
  // Login
  [LOGIN](context: any, credentials: any) {
    return new Promise(resolve => {
      ApiService.post("auth/login", credentials)
        .then(({ data }) => {
          if (data.user) {
            context.commit(SET_AUTH, data);
          }
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },


  // Logout
  [LOGOUT](context: any) {
    context.commit(PURGE_AUTH);
  },


  // Register
  [REGISTER](context: any, credentials: any) {
    return new Promise((resolve, reject) => {
      ApiService.post("auth/register", credentials)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ error }) => {
          // context.commit(SET_ERROR, response.data);
          reject(error);
        });
    });
  },


  // Check auth
  [VALIDATE_TOKEN](context: any) {
    const token = JwtService.getToken();
    if (token) {
      ApiService.post("auth/validate", { token })
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
        })
        .catch(({ error }) => {
          context.commit(PURGE_AUTH);
        });
    }
  },
};


const mutations = {
  // Set errors
  [SET_ERROR](state: any, error: any) {
    state.errors = error;
  },


  // Set auth
  [SET_AUTH](state: any, data: any) {
    state.isAuthenticated = true;
    state.errors = {};
    state.user = data.user;
    if (data.token) {
      JwtService.saveToken(data.token);
    }
  },

  
  // Purge auth
  [PURGE_AUTH](state: any) {
    state.isAuthenticated = false;
    state.errors = {};
    state.user = {};
    JwtService.destroyToken();
  },
};


export default {
  state,
  actions,
  mutations,
  getters
};