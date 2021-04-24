<template>
  <section class="cart">
    <h1 class="cart-title">YOUR CART</h1>

    <div v-if="cart.meals!=''" class="your-cart">
      <div v-for="meal in cart.meals" class="cart-product">
        <img @click="details(meal.id)" class="meal-image" v-bind:src="meal.image" />
        <p @click="details(meal.id)" class="meal-title">{{ meal.title }}</p>
        <label @click="details(meal.id)" class="meal-price">{{ meal.price }} €</label>
        <button @click="remove_from_cart(meal.id)" class="remove-from-cart">REMOVE FROM CART</button>
      </div>
    </div>

    <div v-else>
      <h1 class="no_cart">NOTHING IN YOUR CART</h1>
    </div>

  </section>
</template>



<script>
import {
    GET_CART,
    REMOVE_CART
} from "@/store/actions.type";
import { mapGetters } from 'vuex';

export default {
  name: "Cart",

  mounted() {
      this.get_cart()
  },

  computed: {
      ...mapGetters(["cart"]),
  },

  methods: {
      get_cart() {
          this.$store.dispatch(GET_CART)
      },

      details(id) {
        this.$router.push({ name: "Meal", params: {id: id}});
      },

      remove_from_cart(id) {
        this.$store.dispatch(REMOVE_CART, id)
        .then((response) => {
          this.$store.dispatch(GET_CART);
        })
      }
  },
}
</script>

<style src="./Cart.css" scoped />