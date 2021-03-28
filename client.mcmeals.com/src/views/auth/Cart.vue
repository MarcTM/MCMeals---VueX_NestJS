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


<style scoped>
.cart {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 50px;
}

.cart-title {
    text-align: left;
    width: 100%;
    color: black;
    padding-bottom: 5px;
    border-bottom: 1px solid black;
    margin-bottom: 50px;
}

.your-cart {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

.cart-product {
  cursor: pointer;
  color: black;
  padding: 10px;
  margin: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cart-product:hover {
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

.remove-from-cart {
  height: 40px;
  width: 100%;
  border: 2px solid black;
  margin-top: 20px;
  font-weight: bold;
  cursor: pointer;
  color: black;
}

.remove-from-cart:hover {
  transition: 0.3s;
  background-color: #009900;
}

.no_cart {
  text-align: center;
  margin-top: 70px;
  text-decoration: underline;
  color: #007000;
}
</style>