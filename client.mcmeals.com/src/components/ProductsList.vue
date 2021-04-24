<template>
  <section class="products">

    <section class="products-all">
        <section class="subcategories">
            <h3>By subcategories</h3>
            <span v-for="subcategory in subcategories" @click="bySubcategory(subcategory.slug)">{{subcategory.name}}</span>
        </section>

        <section class="list">
            <form class="searchbar" @submit.prevent="onSubmit(search)">
                <input type="text" v-model="search" placeholder="Search" />
                <button >Search</button>
            </form>

            <section class="products-list">
                <section v-for="product in products">
                    <ProductPreview v-bind:product="product" />
                </section>
            </section>

            <section class="load-more">
                <button>Load more products</button>
            </section>
        </section>
    </section>

  </section>
</template>



<script>
import ProductPreview from '@/components/ProductPreview.vue';
import {
    GET_PRODUCTS,
    GET_PRODUDCTS_BY_SEARCH,
    GET_PRODUCTS_BY_PAGINATION,
    GET_SUBCATEGORIES
} from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
    name: 'ProductsList',

    props: ['categoryId'],

    components: {
        ProductPreview
    },

    mounted() {
        this.getSubcategories();
        this.getProducts();
    },

    computed: {
        ...mapGetters(["products", "products_count", "subcategories"]),
    },

    methods: {
        getSubcategories() {
            this.$store.dispatch(GET_SUBCATEGORIES, this.categoryId);
        },

        getProducts() {
            this.$store.dispatch(GET_PRODUCTS, this.categoryId);
        },

        onSubmit(search) {
            console.log(search);
            // !search
            // ? this.$store.dispatch(GET_MEALS)
            // : this.$store.dispatch(GET_MEALS_BY_SEARCH, `search=${search}`)
        },

        bySubcategory(slug) {
            console.log(slug);
        }
    },
};
</script>

<style src="./ProductsList.css" scoped />