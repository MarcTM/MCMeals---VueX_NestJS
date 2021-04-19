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


<style scoped>
  @keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:0.9;}
  }

  .main-header-bottom-phone {
    position: absolute;
    width: 100%;
    z-index: 1000;
  }
  .show {
    display: block;
  }
  .hide {
    display: none;
  }
  .dropdown {
    animation-name: fadeIn;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    background-color: black;
    padding: 20px;
  }

  .dropdown a {
    color: white;
    font-size: 1.2em;
    font-weight: bold;
    text-transform: uppercase;
    margin: 10px 0px;
    text-decoration: none;
  }

  .main-header {
    width: 100%;
    background-color: var(--color-background-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    
    box-sizing: border-box;
    padding: 20px 20px 0px 20px;
  }

  .main-header a {
    color: white;
    text-decoration: none;
    margin: 0px 16px;
    text-transform: uppercase;
    font-weight: bold;
    transition: 0.4s;
  }

  .main-header a:hover {
    color: var(--color-hover-light);
  }

  .main-header-top a {
    width: 100%;
    font-size: 14px;
  }

  .main-header-bottom a {
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid transparent;
    font-size: 18px;
  }

  .main-header-bottom a:hover {
    border-bottom: 1px solid var(--selection-color);
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
    width: 100%;
    margin: 26px 0px 16px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-phone {
    display: none;
  }

  @media (max-width: 767px) {
    .menu-phone {
      display: block;
      width: 100%;
      text-align: left;
    }
    .menu-phone button {
      background-color: black;
      border: none;
      font-weight: bold;
      color: white;
    }
    .main-header-bottom {
      display: none;
    }
  }
</style>