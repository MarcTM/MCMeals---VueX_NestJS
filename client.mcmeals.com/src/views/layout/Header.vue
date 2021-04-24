<template>
  <section class="main-header">
    <nav class="menu-phone">
      <button @click="showMenu()">MENU</button>
    </nav>

    <nav v-if="!isAuthenticated" class="main-header-top">
      <router-link to="/login">Login</router-link>
    </nav>

    <nav v-else class="main-header-top">
      <router-link to="/account">My account</router-link>
      <router-link to="/cart">Cart</router-link>
    </nav>
    
    <nav class="main-header-logo">
      <router-link to="/">
        <img src="../../../public/logowhite.png" alt="logo-image"/>
      </router-link>
    </nav>

    <nav v-if="user && user.role === 'admin'" class="main-header-bottom">
      <router-link to="/admin/users">Users</router-link>
      <router-link to="/admin/categories">Categories</router-link>
      <router-link to="/admin/subcategories">Subcategories</router-link>
      <router-link to="/admin/products">Products</router-link>
    </nav>

    <nav v-else class="main-header-bottom">
      <router-link to="/">Home</router-link>
      <router-link to="/shop">Shop</router-link>
    </nav>
  </section>

  <section class="main-header-bottom-phone" v-bind:class="{ 'show': menu, 'hide': !menu }">
    <nav v-if="user && user.role === 'admin'" class="dropdown">
      <router-link to="/admin/users">Users</router-link>
      <router-link to="/admin/categories">Categories</router-link>
      <router-link to="/admin/subcategories">Subcategories</router-link>
      <router-link to="/admin/products">Products</router-link>
    </nav>

    <nav v-else class="dropdown">
      <router-link to="/">Home</router-link>
      <router-link to="/shop">Shop</router-link>
    </nav>
  </section>
</template>



<script>
import {
  VALIDATE_TOKEN
} from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
    name: "Header",

    data() {
      return {
        menu: false,
      };
    },

    mounted() {
      this.validate_token()
    },

    computed: {
        ...mapGetters(["isAuthenticated", "user"]),
    },

    methods: {
      showMenu(event = null) {
        if (event) {
          event.preventDefault();
        }
        (this.menu) ? this.menu = false : this.menu = true;
      },

      validate_token() {
        this.$store.dispatch(VALIDATE_TOKEN)
      }
    }
}
</script>

<style src="./Header.css" scoped />