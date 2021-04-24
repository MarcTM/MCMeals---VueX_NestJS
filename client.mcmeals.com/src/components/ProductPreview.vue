<template>

  <section @click="details(product.slug)" class="product-preview">
    <img v-bind:src="product.image" class="image" />
    <p class="title">{{ product.name }}</p>
    <span class="money">{{ product.price }} €</span>
  </section>

</template>



<script>
import {
    ADD_CART
} from "@/store/actions.type";

export default {
    name: 'ProductPreview',

    props: ['product'],

    methods: {
      details(slug) {
        this.$router.push({ name: "Product", params: { slug }});
      },
    }
}
</script>

<style src="./ProductPreview.css" scoped />