<template>
  <section class="main-header">
    <nav class="menu-phone">
      <button @click="showMenu()">MENU</button>
    </nav>

    <nav v-if="!isAuthenticated" class="main-header-top">
      <router-link to="/login">LOGIN</router-link>
    </nav>

    <nav v-else class="main-header-top">
      <router-link to="/cart">CART</router-link>
      <a @click="logout()">LOGOUT</a>
    </nav>
    
    <nav class="main-header-logo">
      <router-link to="/">
        <img src="../../../public/logowhite.png" alt="webpage logo"/>
      </router-link>
    </nav>

    <nav v-if="user && user.role === 'admin'" class="main-header-bottom">
      <router-link to="/admin/users">USERS</router-link>
      <router-link to="/admin/categories">CATEGORIES</router-link>
      <router-link to="/admin/subcategories">SUBCATEGORIES</router-link>
      <router-link to="/admin/products">PRODUCTS</router-link>
    </nav>

    <nav v-else class="main-header-bottom">
      <router-link to="/">HOME</router-link>
      <router-link to="/shop">SHOP</router-link>
      <router-link to="/custom-meals">CUSTOM MEALS</router-link>
    </nav>
  </section>

  <section class="main-header-bottom-phone" v-bind:class="{ 'show': menu, 'hide': !menu }">
    <nav v-if="user && user.role === 'admin'" class="dropdown">
      <router-link to="/admin/users">USERS</router-link>
      <router-link to="/admin/categories">CATEGORIES</router-link>
      <router-link to="/admin/subcategories">SUBCATEGORIES</router-link>
      <router-link to="/admin/products">PRODUCT </router-link>
    </nav>

    <nav v-else class="dropdown">
      <router-link to="/">HOME</router-link>
      <router-link to="/shop">SHOP</router-link>
    </nav>
  </section>
</template>



<script>
import {
  VALIDATE_TOKEN,
  LOGOUT,
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
      this.validate_token();
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
        this.$store.dispatch(VALIDATE_TOKEN);
      },

      logout() {
        this.$store.dispatch(LOGOUT)
          .then((response) => {
            this.$router.push({ name: "Home"})
          })
      }
    }
}
</script>

<style src="./Header.css" scoped />