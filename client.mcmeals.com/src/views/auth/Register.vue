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

    <article @click="removeToastr()" v-if="toastr_success" class="toastr toastr-green">
      <span>Successfully registered, please log in</span>
    </article>
    <article @click="removeToastr()" v-if="toastr_error_email" class="toastr toastr-red">
      <span>This email is already in use</span>
    </article>
    <article @click="removeToastr()" v-if="toastr_error_password" class="toastr toastr-red">
      <span>Password should have more than 8 characters</span>
    </article>
    <article @click="removeToastr()" v-if="toastr_error_password_check" class="toastr toastr-red">
      <span>Passwords don't match</span>
    </article>

  </section>
</template>


<script>
  import store from '@/store';
  import {
    REGISTER
  } from "@/store/actions.type";

  export default {
    name: "Register",

    data() {
      return {
        toastr_success: false,
        toastr_error_email: false,
        toastr_error_password: false,
        toastr_error_password_check: false,
      };
    },

    methods: {
        register(name, surname, email, password, rpassword) {
          if (password.length > 8) {
            if (password === rpassword) {
              this.$store.dispatch(REGISTER, { name, surname, email, password })
                .then((response) => {
                  if (response.email && response.email === email) {
                    this.toastr_error_email = false;
                    this.toastr_error_password = false;
                    this.toastr_error_password_check = false;
                    this.toastr_success = true;
                    setTimeout(() => {
                      this.toastr_success = false;
                      this.$router.push({ name: "Login"});
                    }, 2000);
                  } else {
                    this.toastr_success = false;
                    this.toastr_error_password = false;
                    this.toastr_error_password_check = false;
                    this.toastr_error_email = true;
                    setTimeout(() => this.toastr_error_email = false, 3000);
                  }
                })
                .catch((error) => {
                  console.error(error);
                })
            } else {
              this.toastr_success = false;
              this.toastr_error_password = false;
              this.toastr_error_email = false;
              this.toastr_error_password_check = true;
              setTimeout(() => this.toastr_error_password_check = false, 3000);
            }
          } else {
            this.toastr_success = false;
            this.toastr_error_email = false;
            this.toastr_error_password_check = false;
            this.toastr_error_password = true;
            setTimeout(() => this.toastr_error_password = false, 3000);
          }
        },

        removeToastr() {
          this.toastr_success = false;
          this.toastr_error_email = false;
          this.toastr_error_password = false;
          this.toastr_error_password_check = false;
        }
    },
  }
</script>

<style src="./Register.css" scoped />