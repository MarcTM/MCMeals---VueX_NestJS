<template>
  <section class="custom">

    <section class="custom-meals">
      <img src="../assets/custom-meals.jpg" alt="Custom meals image" />

      <section class="meals-sides">
        <span class="sides-title">Custom Meal</span>
        <section class="sides-description">
          <p>Let our chefs make a personalized meal for you, to achieve your individual goals, with a wide variety of healthy ingredients with lots of proteins, carbohydrates, vegetables and healthy fats.</p>
          <p>And above all, enjoy your meal!</p>
        </section>
        <span v-if="price > 0" class="sides-price">€{{ price }}</span>

        <section v-if="ingredients" class="sides">
          <article v-if="ingredients.first.length > 0" class="side">
              <label>Side 1</label>
              <select v-model="side1" @change="selectSide()">
                <option value=null>-- Unselected --</option>
                <option :value="ingredient" v-for="ingredient in ingredients.first" value="{{ingredient.name}}">{{ingredient.name}}</option>
              </select>
          </article>

          <article v-if="ingredients.second.length > 0" class="side">
              <label>Side 2</label>
              <select v-model="side2" @change="selectSide()">
                <option value=null>-- Unselected --</option>
                <option :value="ingredient" v-for="ingredient in ingredients.second" value="{{ingredient.name}}">{{ingredient.name}}</option>
              </select>
          </article>

          <article v-if="ingredients.third.length > 0" class="side">
              <label>Side 3</label>
              <select v-model="side3" @change="selectSide()">
                <option value=null>-- Unselected --</option>
                <option :value="ingredient" v-for="ingredient in ingredients.third" value="{{ingredient.name}}">{{ingredient.name}}</option>
              </select>
          </article>
        </section>

        <section class="add-to-cart">
          <section class="quantity">
            <button @click="less()">-</button>
            <span>{{ quantity }}</span>
            <button @click="more()">+</button>
          </section>

          <button @click="toCart()" class="to-cart-button">ADD TO CART</button>
        </section>
      </section> 
    </section>

    <section v-if="side1 || side2 || side3" class="sides-macros">
      <table>
        <tr>
          <th>Item</th>
          <th>Calories (g)</th>
          <th>Protein (g)</th>
          <th>Carbs (g)</th>
          <th>Fats (g)</th>
          <th>Fiber (g)</th>
        </tr>

        <tr v-if="side1">
          <td>{{ side1.name }}</td>
          <td>{{ side1.energy }}</td>
          <td>{{ side1.proteins }}</td>
          <td>{{ side1.carbohydrates }}</td>
          <td>{{ side1.fats }}</td>
          <td>{{ side1.fiber }}</td>
        </tr>

        <tr v-if="side2">
          <td>{{ side2.name }}</td>
          <td>{{ side2.energy }}</td>
          <td>{{ side2.proteins }}</td>
          <td>{{ side2.carbohydrates }}</td>
          <td>{{ side2.fats }}</td>
          <td>{{ side2.fiber }}</td>
        </tr>

        <tr v-if="side3">
          <td>{{ side3.name }}</td>
          <td>{{ side3.energy }}</td>
          <td>{{ side3.proteins }}</td>
          <td>{{ side3.carbohydrates }}</td>
          <td>{{ side3.fats }}</td>
          <td>{{ side3.fiber }}</td>
        </tr>

        <tr>
          <th>Total</th>
          <th>{{ macros.calories }}</th>
          <th>{{ macros.proteins }}</th>
          <th>{{ macros.carbs }}</th>
          <th>{{ macros.fats }}</th>
          <th>{{ macros.fiber }}</th>
        </tr>
      </table>
    </section>

  </section>
</template>



<script>
import { defineComponent } from 'vue';
import ProductPreview from '@/components/ProductPreview.vue';
import {
  GET_INGREDIENTS,
  ADD_CUSTOM_TO_CART,
} from "@/store/actions.type";
import { mapGetters } from "vuex";

export default defineComponent({
  name: 'Custom',

  data() {
    return {
      side1: null,
      side2: null,
      side3: null,
      macros: { calories: 0, proteins: 0, carbs: 0, fats: 0, fiber: 0 },
      price: 0,
      quantity: 1,
    };
  },

  mounted() {
    this.getIngredients()
  },

  computed: {
      ...mapGetters(["ingredients"]),
  },

  methods: {
    getIngredients() {
      this.$store.dispatch(GET_INGREDIENTS);
    },

    less() {
      if (this.quantity !== 1) {this.quantity -= 1};
    },

    more() {
      this.quantity += 1;
    },

    toCart() {
      let ingredients = [];
      if (this.side1 != null && this.side1 != 'null') {
        ingredients.push(this.side1);
      }
      if (this.side2 && this.side2 != 'null') {
        ingredients.push(this.side2);
      }
      if (this.side3 && this.side3 != 'null') {
        ingredients.push(this.side3);
      }

      this.$store.dispatch(ADD_CUSTOM_TO_CART, {
        product: {
          type: "Custom",
          ingredients,
          carbohydrates: this.macros.carbs,
          proteins: this.macros.proteins,
          fats: this.macros.fats,
          fiber: this.macros.fiber,
          energy: this.macros.calories,
          price: this.price
        },
        quantity: this.quantity
      });
    },

    selectSide() {
      let price = 0;

      if (this.side1 != null && this.side1 != 'null') {
        price += this.side1.price;
      } else {
        this.side1 = null;
      }
      if (this.side2 && this.side2 != 'null') {
        price += this.side2.price;
      } else {
        this.side2 = null;
      }
      if (this.side3 && this.side3 != 'null') {
        price += this.side3.price;
      } else {
        this.side3 = null;
      }

      this.price = price;
      this.calculateMacros();
    },

    calculateMacros() {
      this.macros = { calories: 0, proteins: 0, carbs: 0, fats: 0,  fiber: 0 };

      if (this.side1 != null && this.side1 != 'null') {
        this.macros.calories += this.side1.energy;
        this.macros.proteins += this.side1.proteins;
        this.macros.carbs += this.side1.carbohydrates;
        this.macros.fats += this.side1.fats;
        this.macros.fiber += this.side1.fiber;
      }
      if (this.side2 && this.side2 != 'null') {
        this.macros.calories += this.side2.energy;
        this.macros.proteins += this.side2.proteins;
        this.macros.carbs += this.side2.carbohydrates;
        this.macros.fats += this.side2.fats;
        this.macros.fiber += this.side2.fiber;
      }
      if (this.side3 && this.side3 != 'null') {
        this.macros.calories += this.side3.energy;
        this.macros.proteins += this.side3.proteins;
        this.macros.carbs += this.side3.carbohydrates;
        this.macros.fats += this.side3.fats;
        this.macros.fiber += this.side3.fiber;
      }
    }
  }
});
</script>

<style src="./Custom.css" scoped />