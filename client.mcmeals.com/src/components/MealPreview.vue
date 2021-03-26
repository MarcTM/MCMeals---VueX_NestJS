<template>
  <div class="meal-preview">
    <img @click="details(meal.id)" class="meal-image" v-bind:src="meal.image" />
    <p @click="details(meal.id)" class="meal-title">{{ meal.title }}</p>
    <label @click="details(meal.id)" class="meal-price">{{ meal.price }} €</label>
    <button @click="remove_from_cart(meal.id)" class="add-to-cart">ADD TO CART</button>
  </div>
</template>



<script>
import {
    ADD_CART
} from "@/store/actions.type";

export default {
    name: 'MealPreview',

    props: [
      'meal'
    ],

    methods: {
      details(id) {
        this.$router.push({ name: "Meal", params: {id: id}});
      },

      remove_from_cart(id) {
          this.$store.dispatch(ADD_CART, id)
      }
    }
}
</script>



<style scoped>
.meal-preview {
  cursor: pointer;
  color: black;
  padding: 10px;
  margin: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.meal-preview:hover {
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