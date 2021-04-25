<template>
  <section class="product">

    <section v-if="product" class="product-details">
      <section class="product-image">
        <img v-bind:src="product.image" class="image" />
      </section>

      <section class="product-info">
        <article v-if="product.type" class="product-type">{{product.type}}</article>
        <p class="product-name">{{product.name}} - {{product.weight}} KG</p>
        <p class="product-price">{{product.price}} €</p>

        <section class="tabs">
          <section class="tabs-names">
            <a @click="select(1)" v-bind:class="[ description === 1 ? 'selected' : 'unselected']">Description</a>
            <a @click="select(2)" v-bind:class="[ nutritional === 1 ? 'selected' : 'unselected']">Nutritional Information</a> 
          </section>

          <section class="tabs-content">
            <section v-if="description === 1" class="description">
             <p>{{product.description}}</p>
            </section>

            <section v-if="nutritional === 1" class="nutritional">
              <table class="nutritional-table">
                  <tr>
                    <th></th>
                    <th>Per 100 g</th>
                  </tr>
                  <tr>
                    <td>Energy</td>
                    <td>{{product.energy}} kcal</td>
                  </tr>
                  <tr>
                    <td>Fats</td>
                    <td>{{product.fats}} g</td>
                  </tr>
                  <tr>
                    <td class="align-right">of which saturated</td>
                    <td>{{product.saturated}} g</td>
                  </tr>
                  <tr>
                    <td>Carbohydrates</td>
                    <td>{{product.carbohydrates}} g</td>
                  </tr>
                  <tr>
                    <td class="align-right">of which sugars</td>
                    <td>{{product.sugars}} g</td>
                  </tr>
                  <tr>
                    <td>Proteins</td>
                    <td>{{product.proteins}} g</td>
                  </tr>
                  <tr>
                    <td>Fiber</td>
                    <td>{{product.fiber}} g</td>
                  </tr>
                  <tr>
                    <td>Salt</td>
                    <td>{{product.salt}} g</td>
                  </tr>
              </table>
            </section>
          </section>
        </section>

        <section class="add-to-cart">
          <section class="quantity">
            <button @click="less()">-</button>
            <span>{{quantity}}</span>
            <button @click="more()">+</button>
          </section>

          <button @click="toCart(product)" class="to-cart-button">Add to cart</button>
        </section>

      </section>
    </section>

    <section class="customer-reviews">
      <span class="customer-reviews-title">Customer reviews</span>

      <article class="no-reviews">
        <span>No reviews yet</span>
        <span @click="openReview ? openReview = false : openReview = true">Write a review</span>
      </article>

      <article v-if="openReview" class="add-review">
        <form class="review-form" @submit.prevent="review(title, body)">
          <label>REVIEW TITLE</label>
          <input type="text" placeholder="Give your review a title" v-model="title" required />

          <label>BODY OF REVIEW</label>
          <input type="text" placeholder="Wrte your comments there" v-model="body" required />

          <section>
            <button class="review-button">SUBMIT REVIEW</button>
          </section>  
        </form>
      </article>
    </section>

    <section class="related">
      <span class="related-title">RELATED ITEMS</span>
    </section>

  </section>
</template>



<script>
import store from "@/store";
import { mapGetters } from "vuex";
import {
  GET_PRODUCT,
  ADD_CART,
} from "@/store/actions.type";

export default {
  name: 'Product',

  data() {
    return {
      quantity: 1,
      description: 1,
      nutritional: 0,
      openReview: false,
    };
  },

  beforeRouteEnter(to, from, next) {
    store.dispatch(GET_PRODUCT, to.params.slug);
    return next();
  },

  computed: {
      ...mapGetters(["product"]),
  },

  methods: {
    select(number) {
      switch (number) {
        case 1:
          this.description = 1;
          this.nutritional = 0;
          break;

        case 2:
          this.description = 0;
          this.nutritional = 1;
          break;
      }
    },

    less() {
      if (this.quantity !== 1) {this.quantity -= 1};
    },

    more() {
      this.quantity += 1;
    },

    toCart(product) {
      this.$store.dispatch(ADD_CART, this.quantity);
    }
  }
};
</script>

<style src="./Product.css" scoped />