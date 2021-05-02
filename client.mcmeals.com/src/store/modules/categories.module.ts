import ApiService from "@/common/api.service";
import {
    GET_CATEGORIES,
    GET_CATEGORY,
    GET_SUBCATEGORIES,
    GET_SUBCATEGORY,
} from "@/store/actions.type";
import {
  SET_ERROR,
  SET_CATEGORIES,
  SET_CATEGORY,
  SET_SUBCATEGORIES,
  SET_SUBCATEGORY,
} from "@/store/mutations.type";


const state = {
  errors: null,
  categories: null,
  category: null,
  subcategories: null,
  subcategory: null,
};


const getters = {
  // Get categories
  categories(state: any) {
    return state.categories;
  },


  // Get category
  category(state: any) {
    return state.category;
  },


  // Get subcategories
  subcategories(state: any) {
    return state.subcategories;
  },


  // Get subcategory
  subcategory(state: any) {
    return state.subcategory;
  },
};


const actions = {
  // Get categories
  [GET_CATEGORIES](context: any) {
    return new Promise(resolve => {
      ApiService.get("category")
        .then(({ data }) => {
          context.commit(SET_CATEGORIES, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },


  // Get category
  [GET_CATEGORY](context: any, slug: string) {
    return new Promise(resolve => {
      ApiService.get("category/" + slug)
        .then(({ data }) => {
          context.commit(SET_CATEGORY, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },


  // Get subcategories
  [GET_SUBCATEGORIES](context: any, categoryId = null) {
    if (categoryId) {
      return new Promise(resolve => {
        ApiService.get("subcategory?categoryId=" + categoryId)
          .then(({ data }) => {
            context.commit(SET_SUBCATEGORIES, data);
            resolve(data);
          })
          .catch(({ response }) => {
            context.commit(SET_ERROR, response);
          });
      });
    } else {
      return new Promise(resolve => {
        ApiService.get("subcategory")
          .then(({ data }) => {
            context.commit(SET_SUBCATEGORIES, data);
            resolve(data);
          })
          .catch(({ response }) => {
            context.commit(SET_ERROR, response);
          });
      });
    }
    
  },


  // Get category
  [GET_SUBCATEGORY](context: any, slug: string) {
    return new Promise(resolve => {
      ApiService.get("subcategory/" + slug)
        .then(({ data }) => {
          context.commit(SET_SUBCATEGORY, data);
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


  // Set categories
  [SET_CATEGORIES](state: any, categories: any) {
    state.errors = null;
    state.categories = categories;
  },


  // Set category
  [SET_CATEGORY](state: any, category: any) {
    state.errors = null;
    state.category = category;
  },


  // Set subcategories
  [SET_SUBCATEGORIES](state: any, subcategories: any) {
    state.errors = null;
    state.subcategories = subcategories;
  },


  // Set subcategory
  [SET_SUBCATEGORY](state: any, subcategory: any) {
    state.errors = null;
    state.subcategory = subcategory;
  },
};


export default {
  state,
  actions,
  mutations,
  getters
};