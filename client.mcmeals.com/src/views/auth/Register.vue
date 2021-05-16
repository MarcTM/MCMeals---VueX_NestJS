<template>
  <section class="register">

    <h1>SIGN UP</h1>

    <form class="register-form" @submit.prevent="register(name, surname, email, password, rpassword)">
      <label>NAME</label>
      <input type="text" v-model="name" rerquired />

      <label>SURNAME</label>
      <input type="text" v-model="surname" rerquired />
      
      <label>EMAIL</label>
      <input type="email" v-model="email" rerquired />

      <label>PASSWORD</label>
      <input type="password" v-model="password" rerquired />

      <label>REPEAT PASSWORD</label>
      <input type="password" v-model="rpassword" required />

      <section>
        <button class="register-button">SIGN UP</button>
        <router-link to="/login">Login</router-link>
      </section>  
    </form>

  </section>
</template>


<script>
  import store from '@/store';
  import {
    REGISTER
  } from "@/store/actions.type";

  export default {
    name: "Register",

    methods: {
        register(name, surname, email, password, rpassword) {
          if (password === rpassword) {
            this.$store.dispatch(REGISTER, { name, surname, email, password })
              .then((response) => {
                this.$router.push({ name: "Login"})
              })
              .catch((error) => {
                console.error(error);
              })
          }
        }
    },
  }
</script>

<style src="./Register.css" scoped />