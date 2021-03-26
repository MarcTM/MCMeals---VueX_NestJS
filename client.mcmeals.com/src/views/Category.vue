<template>
  <div class="category-page">
    <h2 class="category-title">{{ category.title }}</h2>

    <div class="category-meals" v-if="category.meals">
        <div class="category-meal" v-for="meal in category.meals">
            <img @click="details(meal.id)" class="meal-image" v-bind:src="meal.image" />
            <p @click="details(meal.id)" class="meal-title">{{ meal.title }}</p>
            <label @click="details(meal.id)" class="meal-price">{{ meal.price }} €</label>
            <button @click="add_to_cart(meal.id)" class="add-to-cart">ADD TO CART</button>
        </div>
    </div>

    <div class="category-meals-none" v-if="category.meals==''">
    <h3>THIS CATEGORY HAS NO MEALS FOR THE MOMENT</h3>
    </div>
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
  name: 'Meal',

  data() {
    return {
      quantity: 1
    }
  },

  beforeRouteEnter(to, from, next) {
    store.dispatch(GET_CATEGORY, to.params.id);
    return next();
  },

  computed: {
      ...mapGetters(["category"]),
  },

  methods: {
    details(id) {
      this.$router.push({ name: "Meal", params: {id: id}});
    },

    add_to_cart(id) {
      store.dispatch(ADD_CART, id);
    }
  }
};
</script>



<style scoped>
.category-page {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 50px;
}

.category-title {
    color: black;
    padding-left: 20px;
    text-align: left;
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 1px solid black;
    margin-bottom: 50px;
}

.category-meals {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

.category-meals-none {
    width: 100%;
    text-align: center;
}

.category-meals-none h3 {
  font-style: italic;
  color: black;
}

.category-meal {
  cursor: pointer;
  color: black;
  padding: 10px;
  margin: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.category-meal:hover {
  transition: 0.4s;
    background-color: #eeefff;
}

.meal-image:hover + .meal-title {
  color: #ef5555;
}

.meal-title {
  transition: 0.4s;
  color: #3a3a3a;
  text-transform: capitalize;
  font-size: 1.2em;
  margin-bottom: 5px;
}

.meal-price {
  font-weight: bold;
}

img {
  width: 90%;
  height: 200px;
}

.add-to-cart {
  width: 80%;
  height: 40px;
  border: 2px solid black;
  background-color: white;
  color: black;
  margin-top: 20px;
  font-weight: bold;
  cursor: pointer;
}

.add-to-cart:hover {
  transition: 0.3s;
  background-color: #009900;
}
</style>