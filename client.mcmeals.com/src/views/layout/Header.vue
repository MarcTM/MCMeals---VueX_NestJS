<template>
  <section class="main-header">

    <nav v-if="!isAuthenticated" class="main-header-top">
      <router-link to="/login">Login</router-link>
    </nav>

    <nav v-else class="main-header-top">
      <router-link to="/account">My account</router-link>
      <router-link to="/cart">Cart</router-link>
    </nav>
    

    <nav class="main-header-logo">
      <router-link to="/home">
        <img src="../../../public/logowhite.png" alt="logo-image"/>
      </router-link>
    </nav>

    <nav class="main-header-bottom">
      <router-link to="/home">Home</router-link>
      <router-link to="/shop">Shop</router-link>
    </nav>

  </section>
</template>


<script>
import {
  VALIDATE
} from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
    name: "Header",

    mounted() {
        this.validate_token()
    },

    computed: {
        ...mapGetters(["isAuthenticated"]),
    },

    methods: {
      validate_token() {
        this.$store.dispatch(VALIDATE)
      }
    }
}
</script>


<style scoped>
  .main-header {
    width: 100%;
    background-color: var(--color-background-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    
    box-sizing: border-box;
    padding: 20px;
  }

  .main-header a {
    color: white;
    text-decoration: none;
    margin: 0px 20px;
    text-transform: uppercase;
    font-weight: bold;
  }

  .main-header-top a {
    font-size: 14px;
  }

  .main-header-bottom a {
    font-size: 18px;
  }

  .main-header a:hover {
    transition: 0.2s;
    color: var(--color-hover-light);
  }

  .main-header-top {
    width: 100%;
    text-align: right;
    color: white;
  }

  .main-header-logo {
    width: 100%;
    text-align: center;
  }

  .main-header-logo img {
    width: 110px;
  }

  .main-header-bottom {
    width: auto;
    margin: 26px 0px 16px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>