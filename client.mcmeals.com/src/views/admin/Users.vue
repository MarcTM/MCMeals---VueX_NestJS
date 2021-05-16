<template>
  <section class="users">

    <section class="users-info">
      <section class="users-columns">
        <h1>NAME</h1>
        <h1>SURNAME</h1>
        <h1>EMAIL</h1>
        <h1>ROLE</h1>
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
import {
  GET_USERS,
  DELETE_USER
} from "@/store/actions.type";
import { mapGetters } from "vuex"

export default {
  name: 'Admin-Users',

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
};
</script>

<style src="./Users.css" scoped />