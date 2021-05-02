import { createStore } from 'vuex'
import auth from "./modules/auth.module";
import products from "./modules/products.module";
import categories from "./modules/categories.module";
import admin from "./modules/admin.module";
import cart from "./modules/cart.module";

const store = createStore({
  modules: {
    admin,
    auth,
    products,
    categories,
    cart,
  }
})

export default store