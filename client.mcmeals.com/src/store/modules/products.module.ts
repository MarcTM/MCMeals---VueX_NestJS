import store from "@/store";
import ApiService from "@/common/api.service";
import auth from "./auth.module";
import {
    GET_PRODUCTS,
    GET_RELATED_PRODUCTS,
    GET_PRODUCT,
    ADD_COMMENT,
    DELETE_COMMENT,
    GET_MOST_VISITED,
} from "@/store/actions.type";
import {
  SET_PRODUCTS,
  SET_RELATED_PRODUCTS,
  SET_MOST_VISITED,
  SET_PRODUCT,
  SET_LIMIT,
  SET_SEARCH,
  SET_COMMENT,
  REMOVE_COMMENT,
  SET_ERROR,
} from "@/store/mutations.type";


const state = {
  errors: null,
  products: null,
  related_to_product: null,
  most_visited: null,
  product: null,
  limit: 1,
  search: null
};


const getters = {
  // Get products
  products(state: any) {
    return state.products;
  },

  // Get related to product
  related_to_product(state: any) {
    return state.related_to_product;
  },

  // Return limit of products
  limit(state: any) {
    return state.limit;
  },

  // Return search query
  search(state: any) {
    return state.search;
  },

  // Get most visited products
  most_visited(state: any) {
    return state.most_visited;
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
  [GET_PRODUCTS](context: any, data: any) {
    return new Promise(resolve => {
      context.commit(SET_LIMIT, data['limit']);
      context.commit(SET_SEARCH, data['search']);

      let query = `product?limit=${data['limit']}`;
      if (data['categoryId']) {
        query += `&categoryId=${data['categoryId']}`;
      }
      if (data['subcategoryId']) {
        query += `&subcategoryId=${data['subcategoryId']}`;
      }
      if (data['search']) {
        query += `&search=${data['search']}`;
      }

      ApiService.get(query)
      .then(({ data }) => {
        context.commit(SET_PRODUCTS, data);
        resolve(data);
      })
      .catch(({ response }) => {
        context.commit(SET_ERROR, response);
      });
    });
  },


  // Get all products
  [GET_MOST_VISITED](context: any) {
    return new Promise(resolve => {
      ApiService.get("product/popular")
        .then(({ data }) => {
          context.commit(SET_MOST_VISITED, data);
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
          context.commit(SET_PRODUCT, data);
          store.dispatch(GET_RELATED_PRODUCTS, { slug: data.slug, type: data.type, category: data.categories[0] });
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },


  // Get related products
  [GET_RELATED_PRODUCTS](context: any, data: any) {
    return new Promise(resolve => {
      ApiService.get(`product/related?slug=${data.slug}&type=${data.type}&category=${data.category}`)
        .then(({ data }) => {
          context.commit(SET_RELATED_PRODUCTS, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },


  // Add a comment
  [ADD_COMMENT](context: any, data: any) {
    const comment = {
      user: auth.getters.user(auth.state),
      product: state.product,
      title: data.title,
      body: data.body
    };

    return new Promise(resolve => {
      ApiService.post("comment", comment)
        .then(({ data }) => {
          context.commit(SET_COMMENT, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },


  // Delete comment
  [DELETE_COMMENT](context: any, comment: any) {
    return new Promise(resolve => {
      ApiService.delete("comment/" + comment.id)
        .then(({ data }) => {
          context.commit(REMOVE_COMMENT, comment);
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

  // Set products
  [SET_PRODUCTS](state: any, products: any) {
    state.errors = {};
    (products.length > 0) ? state.products = products : state.products = null;
  },

  // Set products
  [SET_RELATED_PRODUCTS](state: any, related: any) {
    state.errors = {};
    (related.length > 0) ? state.related_to_product = related : state.related_to_product = null;
  },

  // Set limit
  [SET_LIMIT](state: any, limit: number) {
    state.errors = {};
    state.limit = limit;
  },

  // Set search query
  [SET_SEARCH](state: any, search: string) {
    state.errors = {};
    state.search = search;
  },

  // Set most visited products
  [SET_MOST_VISITED](state: any, popular: any) {
    state.errors = {};
    state.most_visited = popular;
  },

  // Set product
  [SET_PRODUCT](state: any, product: any) {
    state.errors = {};
    state.product = product;
  },

  // Set comment
  [SET_COMMENT](state: any, comment: any) {
    state.errors = {};
    state.product.comments.push(comment);
  },

  // Set comment
  [REMOVE_COMMENT](state: any, data: any) {
    state.errors = {};
    state.product.comments = state.product.comments.filter((comment: any) => comment.id !== data.id);
  },
};


export default {
  state,
  actions,
  mutations,
  getters
};