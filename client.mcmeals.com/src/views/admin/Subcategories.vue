<template>
  <section class="subcategories">

    <section class="subcategories-info">
      <section class="subcategories-columns">
        <h1>Slug</h1>
        <h1>Name</h1>
        <h1>Image</h1>
        <h1>Category</h1>
      </section>

      <section v-for="subcategory in subcategories" class="subcategories-details" @click="selectSubcategory(subcategory.id)">
        <h4>{{subcategory.slug}}</h4>
        <h4>{{subcategory.name}}</h4>
        <img v-bind:src="subcategory.image" />
        <h4 v-if="subcategory.category">{{subcategory.category.name}}</h4>
        <h4 v-else>-</h4>
      </section>
    </section>


    <section class="modal" v-bind:class="{ 'showed': openModal }">
      <section class="modal-content">
        <span @click="openModal = false" class="close">&times;</span>
        <section v-if="selected">
          <button @click="updateSubcategory(selected)" class="button">UPDATE</button>
          <button @click="deleteSubcategory(selected)" class="button">DELETE</button>
        </section>
      </section>
    </section>

  </section>
</template>



<script>
import { defineComponent } from 'vue';
import { GET_SUBCATEGORIES } from "@/store/actions.type";
import { mapGetters } from "vuex"

export default defineComponent({
  name: 'Subategories',

  data() {
    return {
      openModal: false,
      selected: false,
    }
  },

  mounted() {
      this.getSubcategories()
  },

  computed: {
      ...mapGetters(["subcategories"]),
  },

  methods: {
      getSubcategories() {
          this.$store.dispatch(GET_SUBCATEGORIES)
      },

      selectSubcategory(id) {
        this.openModal = true;
        this.selected = id;
      },

      updateSubcategory(id) {
      },

      deleteSubcategory(id) {
        this.$store.dispatch(DELETE_SUBCATEGORY)
      },
  },
});
</script>



<style scoped>
  .subcategories {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .subcategories-info {
    width: 90%;
  }

  .subcategories-columns {
    width: 100%;
    font-size: 1.2em;
    background-color: var(--light-grey);
    text-transform: uppercase;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    padding: 10px 0px;
  }

  .subcategories-columns article {
    text-align: center;
  }

  .subcategories-details {
    cursor: pointer;
    width: 100%;
    padding: 30px 0px;
    text-align: center;
    display: grid;
    padding: auto;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    border-bottom: 1px solid var(--light-grey);
  }

  .subcategories-details:hover {
    background-color: var(--color-background-secondary);
  }

  .subcategories-details img {
    width: 50%;
  }

  .subcategories-details article {
    text-align: center;
  }


    /* Modal */
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }

  .showed {
    display: block;
  }

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%; 
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .button {
    padding: 20px;
    background-color: white;
    border: 2px solid black;
    color: black;
    font-weight: bold;
    margin: 20px;
    cursor: pointer;
    transition: 0.2s;
  }

  .button:hover {
    background-color: var(--color-hover-light);
  }
</style>