<template>
  <section class="register">
    <h1>SIGN UP</h1>

      <form class="register-form" @submit.prevent="onSubmit(username, email, password, rpassword)">
        <label>Username</label>
        <input type="text" v-model="username" rerquired />
        
        <label>Email</label>
        <input type="email" v-model="email" rerquired />

        <label>Password</label>
        <input type="password" v-model="password" rerquired />

        <label>Repeat Password</label>
        <input type="password" v-model="rpassword" required />

        <section class="prova">
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

    data() {
      return {
        username: null,
        password: null
      };
    },

    methods: {
        onSubmit(username, email, password, rpassword) {
          store
            .dispatch(REGISTER, { username, email, password, rpassword })
            .then((response) => {
              console.log(response);
              this.$router.push({ name: "Login"});
            })
            .catch((response) => {console.log(response.data)})
        }
    },
  }
</script>


<style scoped>
  .register {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .register h1 {
    margin-top: 40px;
    width: 80%;
    padding-bottom: 20px;
    border-bottom: 1px solid grey;
  }

  .register-form {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    width: 80%;
  }

  form label {
    text-align: left;
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.8em;
  }

  form input {
    padding-left: 10px;
    width: 50%;
    height: 50px;
    margin-bottom: 40px;
    border: 1.5px solid grey;
    border-radius: 0;
  }

  .register-button {
    cursor: pointer;
    width: 50%;
    height: 50px;
    color: white;
    background-color: grey;
    border: 1px solid grey;
  }

  .register-button:hover {
    transition: 0.4s;
    background-color: #f7432e;
    border: 1px solid #f7432e;
  }

  .prova {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>