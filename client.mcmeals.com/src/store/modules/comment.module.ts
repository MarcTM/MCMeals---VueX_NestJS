import ApiService from "@/common/api.service";
import {
    GET_COMMENTS,
} from "@/store/actions.type";
import {
  SET_ERROR,
  SET_COMMENTS,
} from "@/store/mutations.type";


const state = {
  errors: null,
  comments: null,
};


const getters = {
  // Get product's comments
  comments(state: any) {
    return state.comments;
  },
};


const actions = {
  // Get product's comments
  [GET_COMMENTS](context: any, productId: number) {
    return new Promise(resolve => {
      ApiService.get("comment/" + productId)
        .then(({ data }) => {
          context.commit(SET_COMMENTS, data);
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


  // Set product's comments
  [SET_COMMENTS](state: any, comments: any) {
    state.errors = null;
    state.comments = comments;
  },
};


export default {
  state,
  actions,
  mutations,
  getters
};