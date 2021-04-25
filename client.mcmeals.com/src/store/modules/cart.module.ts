import ApiService from "@/common/api.service";
import auth from "./auth.module";
import products from "./products.module";
import {
    GET_CART,
    ADD_CART,
} from "@/store/actions.type";
import {
  SET_ERROR,
  SET_CART,
} from "@/store/mutations.type";


const state = {
  errors: null,
  cart: null,
};


const getters = {
  // Get user's cart
  cart(state: any) {
    return state.cart;
  },
};


const actions = {
  // Get user's cart
  [GET_CART](context: any) {
    return new Promise(resolve => {
      ApiService.get("cart/" + auth.getters.user(auth.state).id)
        .then(({ data }) => {
          context.commit(SET_CART, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },


  // Add product to cart
  [ADD_CART](context: any, quantity: number) {
    const cart = {
      user: auth.getters.user(auth.state),
      product: products.getters.product(products.state),
      quantity
    };

    return new Promise(resolve => {
      ApiService.post("cart", cart)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },
};


const mutations = {
  // Set errors
  [SET_ERROR](state: any, error: any) {
    state.errors = error;
  },


  // Set user's cart
  [SET_CART](state: any, cart: any) {
    state.errors = null;
    state.cart = cart;
  },
};


export default {
  state,
  actions,
  mutations,
  getters
};