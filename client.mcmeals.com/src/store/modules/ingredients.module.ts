import ApiService from "@/common/api.service";
import {
    GET_INGREDIENTS,
} from "@/store/actions.type";
import {
  SET_INGREDIENTS,
  SET_ERROR,
} from "@/store/mutations.type";


const state = {
  errors: null,
  ingredients: null,
};


const getters = {
  // Get ingredients
  ingredients(state: any) {
    return state.ingredients;
  },
};


const actions = {
  // Get all ingredients
  [GET_INGREDIENTS](context: any, data: any) {
    return new Promise(resolve => {
      ApiService.get(`ingredient`)
      .then(({ data }) => {
        context.commit(SET_INGREDIENTS, data);
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

  // Set ingredients
  [SET_INGREDIENTS](state: any, data: any) {
    let ingredients: any = {
      first: [],
      second: [],
      third: []
    };

    data.map((ingredient: any) => {
      switch (ingredient.side) {
        case "first":
          ingredients.first.push(ingredient);
          break;

        case "second":
          ingredients.second.push(ingredient);
          break;

        case "third":
          ingredients.third.push(ingredient);
          break;
      }
    })

    state.ingredients = ingredients;
  },
};


export default {
  state,
  actions,
  mutations,
  getters
};