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

    <article @click="removeToastr()" v-if="toastr_success" class="toastr toastr-green">
      <span>Logging in</span>
    </article>
    <article @click="removeToastr()" v-if="toastr_error" class="toastr toastr-red">
      <span>Your credentials are incorrect</span>
    </article>

  </section>
</template>


<script>
  import { LOGIN } from "@/store/actions.type";

  export default {
    name: "Login",

    data() {
      return {
        toastr_success: false,
        toastr_error: false,
      };
    },
  
    methods: {
        login(email, password) {
          this.$store.dispatch(LOGIN, { email, password })
            .then((response) => {
              if (response.user) {
                this.toastr_error = false;
                this.toastr_success = true;
                setTimeout(() => {
                  this.toastr_success = false;
                  if (response.user.role === "admin") {
                    this.$router.push({ name: "Admin-Users"})
                  } else {
                    this.$router.push({ name: "Home"})
                  }
                }, 2000);
              } else {
                this.toastr_success = false;
                this.toastr_error = true;
                setTimeout(() => this.toastr_error = false, 3000);
              }
            })
            .catch((error) => {
              console.error(error)
            })
        },

        removeToastr() {
          this.toastr_error = false;
          this.toastr_success = false;
        }
    },
  }
</script>

<style src="./Login.css" scoped />