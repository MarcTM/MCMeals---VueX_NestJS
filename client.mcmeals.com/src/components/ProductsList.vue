<template>
    <section class="products-all">

        <section v-if="subcategories" class="subcategories-phone">
            <button @click="phoneFilters = true" v-if="!phoneFilters">REFINE BY</button>
            <button @click="phoneFilters = false" v-if="phoneFilters">HIDE FILTERS</button>
            <section v-if="phoneFilters && subcategories">
                <h3>SUBCATEGORIES</h3>
                <section v-if="subcategories" v-for="subcategory in subcategories">
                    <span v-if="subcategory.subcategories.length == 0" class="subcategory" @click="bySubcategory(subcategory.id)">{{ subcategory.name }}</span>
                    <section class="subcategory-section" v-else>
                        <span class="subcategory">{{ subcategory.name }}</span>
                        <span class="subcategory-subcategory" v-for="subsubcategory in subcategory.subcategories" @click="bySubcategory(subsubcategory.id)">{{ subsubcategory.name }}</span>
                    </section>
                </section>
            </section>
        </section>

        <section class="subcategories-desktop">
            <h3 v-if="subcategories">SUBCATEGORIES</h3>
            <section v-if="subcategories" v-for="subcategory in subcategories">
                <span v-if="subcategory.subcategories.length == 0" class="subcategory" @click="bySubcategory(subcategory.id)">{{ subcategory.name }}</span>
                <section class="subcategory-section" v-else>
                    <span class="subcategory">{{ subcategory.name }}</span>
                    <span class="subcategory-subcategory" v-for="subsubcategory in subcategory.subcategories" @click="bySubcategory(subsubcategory.id)">{{ subsubcategory.name }}</span>
                </section>
            </section>
        </section>

        <section class="list">
            <form class="searchbar" @submit.prevent="bySearch(query)">
                <input type="text" v-model="query" placeholder="Search" />
                <button>SEARCH</button>
            </form>

            <section v-if="products" class="products-list">
                <section v-for="product in products">
                    <ProductPreview v-bind:product="product" />
                </section>
            </section>

            <section v-else class="no-products">
                <span>Sorry, no results were found</span>
            </section>

            <section class="load-more">
                <button @click="loadMore()">LOAD MORE PRODUCTS</button>
            </section>
        </section>
        
    </section>
</template>


<script>
import ProductPreview from '@/components/ProductPreview.vue';
import {
    GET_PRODUCTS,
    GET_SUBCATEGORIES
} from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
    name: 'ProductsList',

    data() {
      return {
        subcategoryId: null,
        phoneFilters: false,
      };
    },

    props: ['categoryId'],

    components: {
        ProductPreview
    },

    mounted() {
        this.getSubcategories();
        this.getProducts();
    },

    computed: {
        ...mapGetters(["products", "products_count", "subcategories", "limit", "search"]),
    },

    methods: {
        getSubcategories() {
            this.$store.dispatch(GET_SUBCATEGORIES, this.categoryId);
        },

        getProducts() {
            this.$store.dispatch(GET_PRODUCTS, { categoryId: this.categoryId, limit: 3 });
        },

        bySearch(query) {
            if (this.subcategoryId) {
                (!query)
                ? this.$store.dispatch(GET_PRODUCTS, { subcategoryId: this.subcategoryId, limit: 3 })
                : this.$store.dispatch(GET_PRODUCTS, { subcategoryId: this.subcategoryId, limit: 3, search: query });
            } else {
                (!query)
                ? this.$store.dispatch(GET_PRODUCTS, { categoryId: this.categoryId, limit: 3 })
                : this.$store.dispatch(GET_PRODUCTS, { categoryId: this.categoryId, limit: 3, search: query });
            }
        },

        bySubcategory(id) {
            this.subcategoryId = id;
            this.$store.dispatch(GET_PRODUCTS, { subcategoryId: this.subcategoryId, limit: 3 });
        },

        loadMore() {
            if (this.subcategoryId) {
                this.$store.dispatch(GET_PRODUCTS, { subcategoryId: this.subcategoryId, limit: this.limit + 3, search: this.search });
            } else {
                this.$store.dispatch(GET_PRODUCTS, { categoryId: this.categoryId, limit: this.limit + 3, search: this.search });
            }
        }
    },
};
</script>

<style src="./ProductsList.css" scoped />