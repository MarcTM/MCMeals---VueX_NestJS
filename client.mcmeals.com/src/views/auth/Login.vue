<template>
  <section class="login">
    <h1>SIGN IN</h1>
    
      <form class="login-form" @submit.prevent="login(username, password)">
        <label>EMAIL</label>
        <input type="email" v-model="username" required />

        <label>PASSWORD</label>
        <input type="password" v-model="password" required />

        <section>
          <button class="login-button">SIGN IN</button>
          <router-link to="/register">Register</router-link>
        </section>  
      </form>
  </section>
</template>



<script>
  import { LOGIN } from "@/store/actions.type";

  export default {
    name: "Login",

    methods: {
        login(email, password) {
          this.$store.dispatch(LOGIN, { email, password })
            .then((response) => {
              if (response.user) {
                if (response.user.role === "admin") {
                  this.$router.push({ name: "Admin-Users"})
                } else {
                  this.$router.push({ name: "Home"})
                }
              }
            })
            .catch((error) => {
              console.error(error)
            })
        }
    },
  }
</script>

<style src="./Login.css" scoped />