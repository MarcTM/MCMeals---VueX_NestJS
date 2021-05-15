<template>
  <section class="product">

    <section v-if="product" class="product-details">
      <section class="product-image">
        <img v-bind:src="product.image" class="image" alt="product iamge" />
      </section>

      <section class="product-info">
        <article v-if="product.type" class="product-type">{{product.type}}</article>
        <p class="product-name">{{product.name}} - {{product.weight}} KG</p>
        <p class="product-price">€{{product.price}}</p>

        <section class="tabs">
          <section class="tabs-names">
            <a @click="select(1)" v-bind:class="[ description === 1 ? 'selected' : 'unselected']">DESCRIPTION</a>
            <a @click="select(2)" v-bind:class="[ nutritional === 1 ? 'selected' : 'unselected']">NUTRITIONAL INFORMATION</a> 
          </section>

          <section class="tabs-content">
            <section v-if="description === 1" class="description">
             <span class="product-description">{{product.description}}</span>
             
             <section v-if="product.ingredients.length > 0" class="product-ingredients">
              <span class="ingredient-title">Ingredients:</span>
              <article class="ingredient" v-for="ingredient in product.ingredients">
                <span v-if="ingredient.description" @click="openDescription(ingredient.description)" class="ingredient-description">{{ingredient.name}}</span>
                <span v-else>{{ingredient.name}}</span>
              </article>
             </section>
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
            <span>{{ quantity }}</span>
            <button @click="more()">+</button>
          </section>

          <button @click="toCart(product)" class="to-cart-button">ADD TO CART</button>
        </section>

      </section>
    </section>

    <section v-if="product" class="customer-reviews">
      <span class="customer-reviews-title">CUSTOMER REVIEWS</span>

      <section v-if="user || product.comments.length < 1" class="no-reviews">
        <span v-if="product.comments.length < 1">No reviews yet</span>
        <span v-if="user" class="write-review" @click="openReview ? openReview = false : openReview = true">Write a review</span>
      </section>

      <section v-if="openReview" class="add-review">
        <form class="review-form" @submit.prevent="add_review(title, body)">
          <label>REVIEW TITLE</label>
          <input type="text" placeholder="Give your review a title" v-model="title" required />

          <label>BODY OF REVIEW</label>
          <input type="text" placeholder="Wrte your comments there" v-model="body" required />

          <section>
            <button class="review-button">SUBMIT REVIEW</button>
          </section>  
        </form>
      </section>

      <section v-if="product.comments.length > 0" class="product-comments">
        <article class="comment" v-for="comment in product.comments">
          <span class="comment-title">{{comment.title}}</span>
          <p class="comment-body">{{comment.body}}</p>
          <button v-if="user && user.id === comment.user.id" @click="delete_comment(comment)" class="comment-delete">Delete Comment</button>
        </article>
      </section>
    </section>

    <section v-if="related_to_product" class="related">
      <span class="related-title">RELATED ITEMS</span>
      <section class="related-to-product">
        <ProductPreview v-for="product in related_to_product" v-bind:product="product" />
      </section>
    </section>

    <section v-if="ingredientDescription" class="description-modal">
      <button @click="ingredientDescription = null">X</button>
      <span>{{ingredientDescription}}</span>
    </section>

    <article @click="removeToastr()" v-if="toastr_success" class="toastr toastr-green">
      <span>Successfully added to cart</span>
    </article>
    <article @click="removeToastr()" v-if="toastr_error" class="toastr toastr-red">
      <span>This product is already in your cart</span>
    </article>

  </section>
</template>



<script>
import store from "@/store";
import ProductPreview from '@/components/ProductPreview.vue';
import { mapGetters } from "vuex";
import {
  GET_PRODUCT,
  ADD_CART,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "@/store/actions.type";

export default {
  name: 'Product',

  data() {
    return {
      quantity: 1,
      description: 1,
      nutritional: 0,
      openReview: false,
      ingredientDescription: null,
      toastr_success: false,
      toastr_error: false,
    };
  },

  components: {
    ProductPreview
  },


  beforeRouteEnter(to, from, next) {
    store.dispatch(GET_PRODUCT, to.params.slug);
    return next();
  },

  computed: {
      ...mapGetters(["product", "related_to_product", "user"]),
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
      this.$store.dispatch(ADD_CART, this.quantity)
      .then((response) => {
        if (response) {
          this.toastr_error = false;
          this.toastr_success = true;
          setTimeout(() => this.toastr_success = false, 3000);
        } else {
          this.toastr_success = false;
          this.toastr_error = true;
          setTimeout(() => this.toastr_error = false, 3000);
        }
      });
    },

    add_review(title, body) {
      this.$store.dispatch(ADD_COMMENT, { title, body });
    },

    delete_comment(comment) {
      this.$store.dispatch(DELETE_COMMENT, comment);
    },

    openDescription(description) {
      this.ingredientDescription = description;
    },

    removeToastr() {
      this.toastr_error = false;
      this.toastr_success = false;
    }
  }
};
</script>

<style src="./Product.css" scoped />