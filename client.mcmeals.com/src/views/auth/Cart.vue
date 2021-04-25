<template>
  <section class="cart">

    <section v-if="cart">
      <h1>Cart</h1>
    </section>

    <section v-else>
      <h1 class="no-cart">No products</h1>
    </section>
  
  </section>
</template>



<script>
import {
    GET_CART,
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
          this.$store.dispatch(GET_CART);
      },
  },
}
</script>

<style src="./Cart.css" scoped />