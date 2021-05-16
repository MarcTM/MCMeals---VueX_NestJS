import ApiService from "@/common/api.service";
import auth from "./auth.module";
import products from "./products.module";
import {
    GET_CART,
    ADD_CART,
    ADD_CUSTOM_TO_CART,
    UPDATE_CART,
    REMOVE_CART,
} from "@/store/actions.type";
import {
  SET_ERROR,
  SET_CART,
  DELETE_CART,
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

  // Get cart subtotal
  subtotal(state: any) {
    let subtotal = 0;
    state.cart.map((article: any) => {
      subtotal += article.product.price * article.quantity;
    })
    return subtotal;
  },
};


const actions = {
  // Get user's cart
  [GET_CART](context: any) {
    return new Promise(resolve => {
      ApiService.get("cart/" + auth.getters.user(auth.state).id)
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
        });
    });
  },


  // Add custom meal to cart
  [ADD_CUSTOM_TO_CART](context: any, data: any) {
    data.user = auth.getters.user(auth.state);
    return new Promise(resolve => {
      ApiService.post("cart/custom", data)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },


  // Update cart quantity
  [UPDATE_CART](context: any, data: any) {
    const cart = data.article;
    cart.quantity = data.quantity;
    if (data.quantity === 0) {
      context.commit(DELETE_CART, data.article);
    }

    return new Promise(resolve => {
      ApiService.put("cart/" + cart.id, cart)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },


  // Remove from cart
  [REMOVE_CART](context: any, cart: any) {
    context.commit(DELETE_CART, cart);

    return new Promise(resolve => {
      ApiService.delete("cart/" + cart.id)
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

  // Delete from cart
  [DELETE_CART](state: any, cart: any) {
    state.cart = state.cart.filter((article: any) => article.id !== cart.id)
  },
};


export default {
  state,
  actions,
  mutations,
  getters
};