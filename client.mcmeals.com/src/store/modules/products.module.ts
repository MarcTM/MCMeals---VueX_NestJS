import ApiService from "@/common/api.service";
import {
    GET_PRODUCTS,
    GET_PRODUCTS_BY_SEARCH,
    GET_PRODUCTS_BY_PAGINATION,
    GET_PRODUCT
} from "@/store/actions.type";
import {
  SET_PRODUCTS,
  SET_PRODUCT,
  SET_ERROR,
} from "@/store/mutations.type";


const state = {
  errors: null,
  products: null,
  product: null,
};


const getters = {
  // Get products
  products(state: any) {
    return state.products;
  },

  // Get total of products
  products_count(state: any) {
    return state.products.count;
  },

  // Get product
  product(state: any) {
    return state.product;
  },

  // Get previous page
  previous(state: any) {
    return state.products.previous;
  },

  // Get next page
  next(state: any) {
    return state.products.next;
  }
};


const actions = {
  // Get all products
  [GET_PRODUCTS](context: any) {
    return new Promise(resolve => {
      ApiService.get("product")
        .then(({ data }) => {
          console.log(data) 
          context.commit(SET_PRODUCTS, data);
          resolve(data);
        })
        .catch(({ response }) => {
          console.log(response);
          context.commit(SET_ERROR, response);
        });
    });
  },


  // Gwt products filtered by search
  [GET_PRODUCTS_BY_SEARCH](context: any, query: string) {
    return new Promise(resolve => {
      ApiService.query("meals", query)
        .then(({ data }) => {
          context.commit(SET_PRODUCTS, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },


  // Get products filtered by pagination
  [GET_PRODUCTS_BY_PAGINATION](context: any, query: string) {
    var res = query.split("?");
    return new Promise(resolve => {
      ApiService.query("meals", res[1])
        .then(({ data }) => {
          console.log(data)
          context.commit(SET_PRODUCTS, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },


  // Get one product
  [GET_PRODUCT](context: any, slug: string) {
    return new Promise(resolve => {
      ApiService.get("product/" + slug)
        .then(({ data }) => {
          console.log(data);
          context.commit(SET_PRODUCT, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  }
};


const mutations = {
  // Set errors
  [SET_ERROR](state: any, error: any) {
    state.errors = error;
  },


  // Set meals
  [SET_PRODUCTS](state: any, products: any) {
    state.errors = {};
    state.products = products;
  },


  // Set meal
  [SET_PRODUCT](state: any, product: any) {
    state.errors = {};
    state.product = product;
  },
};


export default {
  state,
  actions,
  mutations,
  getters
};