import { createStore } from 'vuex'
import auth from "./modules/auth.module";
import products from "./modules/products.module";
import categories from "./modules/categories.module";
import admin from "./modules/admin.module"

const store = createStore({
  modules: {
    admin,
    auth,
    products,
    categories
  }
})

export default store