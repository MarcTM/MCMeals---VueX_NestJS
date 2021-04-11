import ApiService from "@/common/api.service";
import {
    GET_CATEGORIES,
    GET_CATEGORY
} from "@/store/actions.type";
import {
  SET_CATEGORIES,
  SET_ERROR,
  SET_CATEGORY
} from "@/store/mutations.type";


const state = {
  errors: null,
  categories: null,
  category: null,
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

};


const actions = {
  // Get categories
  [GET_CATEGORIES](context: any) {
    return new Promise(resolve => {
      ApiService.get("category")
        .then(({ data }) => {
          console.log(data);
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
          console.log(data);
          context.commit(SET_CATEGORY, data);
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
};


export default {
  state,
  actions,
  mutations,
  getters
};