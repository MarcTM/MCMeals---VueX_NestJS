<template>
  <section class="cart">

    <h1 class="cart-header">SHOPPING CART</h1>

    <section class="cart-section" v-if="cart && cart.length > 0">
      <section class="cart-products">
        <section v-for="article in cart" class="article">
          <img v-if="article.product.image" @click="details(article.product.slug)" class="article-image" :src="article.product.image" alt="cart article image" />
          <img v-else class="article-image custom" src="../../assets/custom-meals.jpg" alt="cart custom meal image" />

          <section class="article-info">
            <section class="article-name-price">
              <span v-if="article.product.name" class="article-name" @click="details(article.product.slug)">{{article.product.name}}</span>
              <span v-else class="article-name custom">Custom Meal</span>
              <section class="article-price">
                <span>€{{article.product.price}}</span>
                <span @click="removeFromCart(article)" class="remove-cart">x</span>
              </section>
            </section>

            <span v-if="article.product.weight" class="article-weight italic"><b>Weight:</b> {{article.product.weight}} KG</span>
            <span v-if="article.product.slug" class="article-slug italic"><b>Code:</b> {{article.product.slug}}</span>
            <section v-if="article.product.type === 'Custom'">
              <section class="article-ingredients">
                <b>Ingredients:</b> <span class="ingredient italic" v-for="ingredient in article.product.ingredients">{{ingredient.name}} |</span>
              </section>

              <section class="article-macros">
                <span><b>Calories:</b> {{article.product.energy}}g</span>
                <span><b>Carbs:</b> {{article.product.carbohydrates}}g</span>
                <span><b>Proteins:</b> {{article.product.proteins}}g</span>
                <span><b>Fats:</b> {{article.product.fats}}g</span>
                <span><b>Fiber:</b> {{article.product.fiber}}g</span>
              </section>
            </section>

            <section class="quantity-section">
              <span>QTY:</span>
              <section class="quantity">
                <button @click="less(article, article.quantity)">-</button>
                <span>{{article.quantity}}</span>
                <button @click="more(article, article.quantity)">+</button>
              </section>
            </section>
          </section>
          
        </section>
      </section>

      <section class="cart-subtotal">
        <section class="subtotal">
          <span>Subtotal</span>
          <span>€{{subtotal}}</span> 
        </section>

        <button class="checkout">CHECKOUT</button>
        <span @click="goToShop()" class="continue-shopping">CONTINUE SHOPPING</span>
      </section>
    </section>

    <section v-else class="no-cart">
      <span>There are no products in your cart</span>
      <button @click="goToShop()">CONTINUE SHOPPING</button>
    </section>
  
  </section>
</template>



<script>
import {
    GET_CART,
    UPDATE_CART,
    REMOVE_CART,
} from "@/store/actions.type";
import { mapGetters } from 'vuex';

export default {
  name: "Cart",

  mounted() {
      this.get_cart()
  },

  computed: {
      ...mapGetters(["cart", "subtotal"]),
  },

  methods: {
      get_cart() {
          this.$store.dispatch(GET_CART);
      },

      goToShop() {
        this.$router.push({ name: "Shop"})
      },

      details(slug) {
        this.$router.push({ name: "Product", params: { slug }});
      },
      
      less(article, quantity) {
        if (quantity > 0) {
          quantity -= 1;
          this.$store.dispatch(UPDATE_CART, { article, quantity });
        }
      },

      more(article, quantity) {
        quantity += 1;
        this.$store.dispatch(UPDATE_CART, { article, quantity });
      },

      removeFromCart(article) {
        this.$store.dispatch(REMOVE_CART, article);
      }
  },
}
</script>

<style src="./Cart.css" scoped />