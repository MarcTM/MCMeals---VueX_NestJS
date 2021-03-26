<template>
  <div class="meal-details">
    <div class="meal-main">
      <img class="meal-image" v-bind:src="meal.image" />

      <div class="meal-info">
        <h1 class="meal-title">{{ meal.title }}</h1>
        <label class="meal-price">6.5 €</label>

        <div class="meal-quantity-form">
          <label class="quantity">QUANTITY</label>
            <div class="quantity-form">
              <div class="more-less">
                <button @click="removeQty" class="less">-</button>
                <input type="number" min="1" max="100" v-bind:value="quantity" />
                <button @click="addQty" class="more">+</button>
              </div>
              <button class="add-to-cart">ADD TO CART</button>  
            </div>
        </div>
      </div>
    </div>

    <div class="meal-description">
        <h3>Description</h3>
        <p>{{ meal.description }}</p>
    </div>
  </div>
</template>



<script>
import store from "@/store";
import { mapGetters } from "vuex";
import { GET_MEAL } from "@/store/actions.type";

export default {
  name: 'Meal',

  data() {
    return {
      quantity: 1
    }
  },

  beforeRouteEnter(to, from, next) {
    store.dispatch(GET_MEAL, to.params.id);
    return next();
  },

  computed: {
      ...mapGetters(["meal"]),
  },

  methods: {
    addQty() {
      (this.quantity > 99)? this.quantity = 100 : this.quantity += 1;
    },

    removeQty() {
      (this.quantity < 2)? this.quantity = 1 : this.quantity -= 1;
    }
  }
};
</script>



<style scoped>
.meal-details {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.meal-main {
  margin-top: 80px;
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 70px;
  border-bottom: 1px solid grey;
}

.meal-image {
  width: 40%;
}

.meal-info {
  color: #3a3a3a;
  width: 50%;
  text-align: left;
}

.meal-title {
  text-transform: capitalize;
  color: black;
}

.meal-price {
  font-weight: bold;
  font-size: 1.2em;
}

.meal-quantity-form {
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

.meal-description {
  width: 65%;
  margin-top: 30px;
  margin-bottom: 50px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.meal-description p {
  margin-top: 10px;
}
</style>