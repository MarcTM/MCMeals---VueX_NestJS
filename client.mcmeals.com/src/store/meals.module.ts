import ApiService from "@/common/api.service";
import {
    GET_MEALS,
    GET_MEALS_BY_SEARCH,
    GET_MEALS_BY_PAGINATION,
    GET_MEAL
} from "./actions.type";
import {
  SET_MEALS,
  SET_MEAL,
  SET_ERROR,
} from "./mutations.type";


const state = {
  errors: null,
  meals: {},
  meal: {},
};


const getters = {
  // Get meals
  meals(state: any) {
    return state.meals.results;
  },

  // Get total meals
  meals_count(state: any) {
    return state.meals.count;
  },

  // Get meal
  meal(state: any) {
    return state.meal;
  },

  // Get previous page
  previous(state: any) {
    return state.meals.previous;
  },

  // Get next page
  next(state: any) {
    return state.meals.next;
  }
};


const actions = {
  // Login
  [GET_MEALS](context: any) {
    return new Promise(resolve => {
      ApiService.get("meals")
        .then(({ data }) => {
          console.log(data)
          context.commit(SET_MEALS, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },

  [GET_MEALS_BY_SEARCH](context: any, query: string) {
    return new Promise(resolve => {
      ApiService.query("meals", query)
        .then(({ data }) => {
          context.commit(SET_MEALS, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },

  [GET_MEALS_BY_PAGINATION](context: any, query: string) {
    var res = query.split("?");
    return new Promise(resolve => {
      ApiService.query("meals", res[1])
        .then(({ data }) => {
          console.log(data)
          context.commit(SET_MEALS, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
        });
    });
  },

  [GET_MEAL](context: any, id: number) {
    return new Promise(resolve => {
      ApiService.get("meals/" + id)
        .then(({ data }) => {
          context.commit(SET_MEAL, data);
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
  [SET_MEALS](state: any, meals: any) {
    state.meals = meals;
    state.errors = {};
  },

  // Set meal
  [SET_MEAL](state: any, meals: any) {
    state.meal = meals;
    state.errors = {};
  },
};


export default {
  state,
  actions,
  mutations,
  getters
};