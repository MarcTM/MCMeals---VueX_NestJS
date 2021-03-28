<template>
  <div class="meals-list">
        <form class="search-meals" @submit.prevent="onSubmit(search)">
            <input type="text" v-model="search" placeholder="Search..." />
            <button class="search-button">Search</button>
        </form>

        <div class="meals">
            <div v-for="meal in meals">
                <MealPreview v-bind:meal="meal" />
            </div>
        </div>

        <div class="meals-pagination">
            <button @click="goPrevious" class="pagination-button pagination-previous">&#9001</button>
            <button @click="goNext" class="pagination-button pagination-next">&#9002</button>
        </div>
  </div>
</template>



<script>
import MealPreview from '@/components/MealPreview.vue';
import store from '@/store';
import {
    GET_MEALS,
    GET_MEALS_BY_SEARCH,
    GET_MEALS_BY_PAGINATION
} from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
    name: 'MealsList',

    components: {
        MealPreview
    },

    mounted() {
        this.getMeals()
    },

    computed: {
        ...mapGetters(["meals", "meals_count", "previous", "next"]),
    },

    methods: {
        getMeals() {
            this.$store.dispatch(GET_MEALS)
        },

        onSubmit(search) {
            !search
            ? this.$store.dispatch(GET_MEALS)
            : this.$store.dispatch(GET_MEALS_BY_SEARCH, `search=${search}`)
        },

        goPrevious() {
            this.previous && this.$store.dispatch(GET_MEALS_BY_PAGINATION, this.previous)
        },

        goNext() {
            this.next && this.$store.dispatch(GET_MEALS_BY_PAGINATION, this.next)
        }
    },
};
</script>



<style scoped>
.meals-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.meals {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

.search-meals {
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.search-meals input {
    box-sizing: border-box;
    width: 80%;
    height: 50px;
    margin-right: 20px;
    border: 1.5px solid black;
    padding: 5px 10px;
}

.search-button {
    width: 20%;
    border: 1px solid black;
    background-color: black;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
}

.search-button:hover {
    transition: 0.2s;
    background-color: #111;
    color: #bbb;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}

.meals-pagination {
    margin: 50px 0px;
    width: 90%;
    display: flex;
    justify-content: space-between;
}

.pagination-button {
    font-weight: bold;
    width: 4%;
    margin-right: 20px;
    height: 40px;
    border: 1px solid black;
    background-color: black;
    color: white;
    cursor: pointer;
}

.pagination-button:hover {
    transition: 0.2s;
    background-color: #111;
    color: #bbb;
}
</style>