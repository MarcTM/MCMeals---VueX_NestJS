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

        // goPrevious() {
        //     this.previous && this.$store.dispatch(GET_MEALS_BY_PAGINATION, this.previous)
        // },

        // goNext() {
        //     this.next && this.$store.dispatch(GET_MEALS_BY_PAGINATION, this.next)
        // }
    },
};
</script>



<style scoped>
    .searchbar {
        margin-top: 20px;
        padding: 20px 0px;
        width: 100%;
        display: grid;
        grid-template-columns: 4fr 1fr;
        grid-gap: 10px;
    }
    .searchbar input {
        padding: 0px 10px;
        height: 50px;
        border: 1px solid var(--light-grey);
        color: var(--dark-grey);
    }
    .searchbar button {
        border: none;
        background-color: var(--dark-grey);
        color: white;
        text-transform: uppercase;
        font-weight: bold;
        cursor: pointer;
        transition: 0.2s;
    }
    .searchbar button:hover {
        color: black;
    }

    .list {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .products-list {
        width: 100%;
        padding: 50px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }

    .subcategories {
        display: flex;
        flex-direction: column;
        border-right: 1px solid var(--medium-grey);
    }

    .subcategories h3 {
        text-decoration: underline;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 14px;
    }

    .subcategories span {
        cursor: pointer;
        margin: 10px 0px;
        font-weight: 400;
        text-transform: uppercase;
        font-size: 17px;
    }

    .products-all {
        width: 100%;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-gap: 20px;
    }

    .load-more {
        width: 100%;
        text-align: right;
    }

    .load-more button {
        cursor: pointer;
        margin-right: 20px;
        padding: 10px 20px;
        line-height: 22px;
        font-size: 17px;
        text-transform: uppercase;
        background-color: white;
        color: var(--dark-grey);
        border: 1px solid var(--dark-grey);
    }

    .searchbar button:focus,
    .load-more button:focus,
    .searchbar input:focus {
        outline: none;
    }
</style>