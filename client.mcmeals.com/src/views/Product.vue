<template>
  <div class="product">
  </div>
</template>



<script>
import store from "@/store";
import { mapGetters } from "vuex";
import { GET_PRODUCT } from "@/store/actions.type";

export default {
  name: 'Product',

  beforeRouteEnter(to, from, next) {
    store.dispatch(GET_PRODUCT, to.params.slug);
    return next();
  },

  computed: {
      ...mapGetters(["product"]),
  },
};
</script>



<style scoped>
.product {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.product-main {
  margin-top: 80px;
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 70px;
  border-bottom: 1px solid grey;
}

.product-image {
  width: 40%;
}

.product-info {
  color: #3a3a3a;
  width: 50%;
  text-align: left;
}

.product-title {
  text-transform: capitalize;
  color: black;
}

.product-price {
  font-weight: bold;
  font-size: 1.2em;
}

.product-quantity-form {
  margin-top: 30px;
}

.quantity {
  margin-bottom: 6px;
  display: block;
  font-weight: bold;
  color: #5a5a5a;
  font-size: 0.8em;
}

.quantity-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-to-cart {
  height: 40px;
  width: 50%;
  background-color: #ef2929;
  color: white;
  border: 1px solid white;
  cursor: pointer;
}

.add-to-cart:hover {
  background-color: #bb1a1a;
}

.more-less {
  width: 50%;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.more {
  cursor: pointer;
  height: 40px;
  margin: 1px;
  border: 2px solid grey;
  width: 30%;
  background-color: white;
}

.less {
  cursor: pointer;
  height: 40px;
  margin: 1px;
  border: 2px solid grey;
  width: 30%;
  background-color: white;
}

input[type="number"] {
  text-align: center;
  padding-left: 4px;
  padding-right: 4px;
  margin: 1px;
  height: 34px;
  border: 2px solid grey;
  width: 30%;
  display: inline;
  background-color: white;
}

.product-description {
  width: 65%;
  margin-top: 30px;
  margin-bottom: 50px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.product-description p {
  margin-top: 10px;
}
</style>