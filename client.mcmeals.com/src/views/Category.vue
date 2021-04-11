<template>
  <div class="category">

    <h2 v-if="category" class="category-name">{{category.name}}</h2>

  </div>
</template>



<script>
import store from "@/store";
import { mapGetters } from "vuex";
import {
  GET_CATEGORY,
  ADD_CART
} from "@/store/actions.type";

export default {
  name: 'Category',

  data() {
    return {
      quantity: 1
    }
  },

  beforeRouteEnter(to, from, next) {
    store.dispatch(GET_CATEGORY, to.params.slug);
    return next();
  },

  computed: {
      ...mapGetters(["category"]),
  },

  // methods: {
  //   details(id) {
  //     this.$router.push({ name: "Meal", params: {id: id}});
  //   },

  //   add_to_cart(id) {
  //     store.dispatch(ADD_CART, id);
  //   }
  // }
};
</script>



<style scoped>
  .category {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .category-name {
    margin-top: 100px;
    padding: 30px 0px;
    width: 85%;
    font-size: 1.8em;
    text-align: left;
    text-transform: uppercase;
    border-bottom: 1px solid grey;
  }
</style>