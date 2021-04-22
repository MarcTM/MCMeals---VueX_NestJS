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

          <button @click="toCart()" class="to-cart-button">Add to cart</button>
        </section>

      </section>
    </section>

  </section>
</template>



<script>
import store from "@/store";
import { mapGetters } from "vuex";
import { GET_PRODUCT } from "@/store/actions.type";

export default {
  name: 'Product',

  data() {
    return {
      quantity: 1,
      description: 1,
      nutritional: 0
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

    toCart() {
      console.log(this.quantity);
    }
  }
};
</script>



<style scoped>
.product {
  box-sizing: border-box;
  padding: 40px 20px 20px 20px;
  width: 100%;
}

.product-details {
  box-sizing: border-box;
  width: 100%;
  padding: 20px 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

.product-info {
  padding-left: 20px;
  box-sizing: border-box;
}

.image {
  width: 100%;
}

.product-type {
  display: inline-block;
  background-color: var(--darker-grey);
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  padding: 15px 24px;
  margin-bottom: 10px;
}

.product-name {
  margin-bottom: 0px;
  font-weight: bold;
  font-size: 1.5em;
  text-transform: uppercase;
}

.product-price {
  font-weight: bold;
  font-size: 1.2em;
  text-transform: uppercase;
}

.tabs {
  width: 100%;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  aling-items: center;
}

.tabs-names {
  width: 100%;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--medium-grey);
}

.tabs-names a {
  user-select: none;
  cursor: pointer;
  margin-right: 30px;
  font-size: 14px;
  text-transform: uppercase;
  transition: 0.1s;
  padding-bottom: 7px;
  border-bottom: 2px solid transparent;
}

.unselected:hover {
  color: #eb694b;
}

.selected {
  border-bottom: 2px solid var(--darker-grey) !important;
  font-weight: bold;
}

.tabs-content {
  margin-top: 30px;
}

.description {
  text-align: left;
}

.nutritional-table {
  width: 100%;
  border: 1px solid var(--light-grey);
  border-spacing: 0px;
  border-radius: 10px;
}

.nutritional-table tr:nth-child(2n) {
  background-color: var(--very-light-grey);
}

.nutritional-table tr td,
.nutritional-table tr th {
  padding: 12px;
}

.nutritional-table tr td:first-child,
.nutritional-table tr th:first-child {
  font-weight: bold;
  border-right: 1px solid var(--light-grey);
}

.nutritional-table tr td:nth-child(2) {
  text-align: center;
}

.align-right {
  font-weight: normal !important;
  padding-left: 40px !important;
}

.to-cart-button {
  width: 100%;
  color: white;
  font-weight: bold;
  font-size: 1.1em;
  text-transform: uppercase;
  background-color: black;
  padding: 18px;
  transition: 0.3s;
}

.add-to-cart {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 20px;
}

.add-to-cart button {
  cursor: pointer;
  border: none;
}

.quantity {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5px;
}

.quantity * {
  user-select: none;
}

.quantity span {
  margin: auto;
}

.quantity button,
.to-cart-button {
  outline: none;
}

.quantity button:hover {
  border: 1px solid var(--light-grey);
}

.to-cart-button:hover {
  background-color: var(--dark-grey);
}
</style>