<template>
  <section class="products">

    <form class="searchbar" @submit.prevent="onSubmit(search)">
        <input type="text" v-model="search" placeholder="Search" />
        <button >Search</button>
    </form>

    <section class="products-list">
        <section v-for="product in products">
            <ProductPreview v-bind:product="product" />
        </section>
    </section>

  </section>
</template>



<script>
import ProductPreview from '@/components/ProductPreview.vue';
import {
    GET_PRODUCTS,
    GET_PRODUDCTS_BY_SEARCH,
    GET_PRODUCTS_BY_PAGINATION
} from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
    name: 'ProductsList',

    components: {
        ProductPreview
    },

    mounted() {
        this.getProducts()
    },

    computed: {
        ...mapGetters(["products", "products_count"]),
    },

    methods: {
        getProducts() {
            this.$store.dispatch(GET_PRODUCTS)
        },

        onSubmit(search) {
            console.log(search);
            // !search
            // ? this.$store.dispatch(GET_MEALS)
            // : this.$store.dispatch(GET_MEALS_BY_SEARCH, `search=${search}`)
        },

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
    .products {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .searchbar {
        margin: 40px 0px;
        width: 60%;
        padding: 20px 0px;
        display: flex;
        justify-content: space-between;
    }

    .searchbar input {
        box-sizing: border-box;
        width: 75%;
        height: 50px;
        border: 1px solid var(--light-grey);
        padding: 10px;
    }

    .searchbar input:focus {
        outline-width: thin;
        outline-color: var(--medium-grey);
        box-shadow: none;
    }

    .searchbar button {
        width: 20%;
        border: 0px solid var(--darker-grey);
        background-color: var(--darker-grey);
        color: white;
        text-transform: uppercase;
        font-weight: bold;
        cursor: pointer;
        transition: 0.2s;
    }

    .searchbar button:hover {
        color: black;
    }

    .searchbar button:focus {
        outline: none;
        box-shadow: none;
    }

    .products-list {
        width: 100%;
        padding: 50px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
</style>