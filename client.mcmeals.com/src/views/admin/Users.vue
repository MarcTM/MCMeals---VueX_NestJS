<template>
  <section class="users">

    <section class="users-info">
      <section class="users-columns">
        <h1>Name</h1>
        <h1>Surname</h1>
        <h1>Email</h1>
        <h1>Role</h1>
      </section>

      <section @click="selectUser(user.id)" v-for="user in users" class="users-details">
        <h4>{{user.name}}</h4>
        <h4>{{user.surname}}</h4>
        <h4>{{user.email}}</h4>
        <h4>{{user.role}}</h4>
      </section>
    </section>


    <section class="modal" v-bind:class="{ 'showed': openModal }">
      <section class="modal-content">
        <span @click="openModal = false" class="close">&times;</span>
        <section v-if="selected">
          <button @click="updateProduct(selected)" class="button">UPDATE</button>
          <button @click="deleteProduct(selected)" class="button">DELETE</button>
        </section>
      </section>
    </section>

  </section>
</template>



<script>
import { defineComponent } from 'vue';
import {
  GET_USERS,
  DELETE_USER
} from "@/store/actions.type";
import { mapGetters } from "vuex"

export default defineComponent({
  name: 'Users',

  data() {
    return {
      openModal: false,
      selected: false,
    }
  },

  mounted() {
      this.getUsers()
  },

  computed: {
      ...mapGetters(["users"]),
  },

  methods: {
      getUsers() {
          this.$store.dispatch(GET_USERS)
      },

      selectUser(id) {
        this.openModal = true;
        this.selected = id;
      },

      updateProduct(id) {
      },

      deleteProduct(id) {
        this.$store.dispatch(DELETE_USER)
      },
  },
});
</script>



<style scoped>
  .users {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .users-info {
    width: 90%;
  }

  .users-columns {
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

  .users-columns article {
    text-align: center;
  }

  .users-details {
    cursor: pointer;
    width: 100%;
    padding: 30px 0px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    border-bottom: 1px solid var(--light-grey);
  }

  .users-details:hover {
    background-color: var(--color-background-secondary);
  }

  .users-details article {
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