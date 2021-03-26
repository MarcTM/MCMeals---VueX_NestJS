import { createStore } from 'vuex'
import auth from "./auth.module";
import meals from "./meals.module";
import categories from "./categories.module";

const store = createStore({
  modules: {
    auth,
    meals,
    categories
  }
})

export default store