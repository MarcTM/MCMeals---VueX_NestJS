import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  VALIDATE,
  GET_PROFILE,
  GET_CART,
  ADD_CART,
  REMOVE_CART
} from "./actions.type";
import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR,
  SET_PROFILE,
  SET_CART
} from "./mutations.type";


const state = {
  errors: null,
  user: {},
  profile: {},
  cart: {},
  isAuthenticated: !!JwtService.getToken()
};


const getters = {
  // Current user
  currentUser(state: any) {
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

  // Get cart
  cart(state: any) {
    return state.cart;
  }
};


const actions = {
  // Login
  [LOGIN](context: any, credentials: any) {
    console.log(credentials);
    return new Promise(resolve => {
      ApiService.post("users/login", credentials)
        .then(({ data }) => {
          context.commit(SET_AUTH, data.token);
          resolve(data);
        })
        .catch(({ response }) => {
          console.log(response.data.non_field_errors);
          context.commit(SET_ERROR, response.data.non_field_errors);
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
      ApiService.post("users/register", credentials)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data);
          reject(response);
        });
    });
  },

  // Check auth
  [VALIDATE](context: any) {
    if (JwtService.getToken()) {
      ApiService.get("users/validate", true)
        .catch(({ response }) => {
          console.log(response);
          context.commit(PURGE_AUTH);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },

  // Get profile
  [GET_PROFILE](context: any) {
    return new Promise(resolve => {
      ApiService.get("users/profile", true)
        .then(({ data }) => {
          context.commit(SET_PROFILE, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },

  // Get cart
  [GET_CART](context: any) {
    return new Promise(resolve => {
      ApiService.get("users/cart", true)
        .then(({ data }) => {
          console.log(data);
          context.commit(SET_CART, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },

  // Get cart
  [ADD_CART](context: any, id: number) {
    return new Promise(resolve => {
      ApiService.post("users/cart/" + id, {}, true)
    });
  },

  // Get cart
  [REMOVE_CART](context: any, id: number) {
    return new Promise(resolve => {
      ApiService.delete("users/cart/" + id, true)
        .then(({ data }) => {
          resolve(data);
        })
    });
  },
};


const mutations = {
  // Set errors
  [SET_ERROR](state: any, error: any) {
    state.errors = error;
  },

  // Set auth
  [SET_AUTH](state: any, token: string) {
    state.isAuthenticated = true;
    state.user.token = token;
    state.errors = {};
    JwtService.saveToken(state.user.token);
  },

  // Purge auth
  [PURGE_AUTH](state: any) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  },

  // Set profile
  [SET_PROFILE](state: any, profile: any) {
    state.profile = profile;
    state.errors = {};
  },

  //  Set cart
  [SET_CART](state: any, cart: any) {
    state.cart = cart;
    state.errors = {};
  },
};


export default {
  state,
  actions,
  mutations,
  getters
};