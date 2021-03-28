<template>
  <section class="register">
    <h1>SIGN UP</h1>

      <form class="register-form" @submit.prevent="onSubmit(name, surname, email, password, rpassword)">
        <label>Name</label>
        <input type="text" v-model="name" rerquired />

        <label>Surname</label>
        <input type="text" v-model="surname" rerquired />
        
        <label>Email</label>
        <input type="email" v-model="email" rerquired />

        <label>Password</label>
        <input type="password" v-model="password" rerquired />

        <label>Repeat Password</label>
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
        onSubmit(name, surname, email, password, rpassword) {
          if (password === rpassword) {
            store
            .dispatch(REGISTER, { name, surname, email, password })
            .then((response) => {
              this.$router.push({ name: "Login"});
            })
            .catch((response) => {
              console.log(response.data);
            })
          }
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
    margin-bottom: 30px;
  }

  .register h1 {
    margin-top: 40px;
    width: 80%;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--light-grey);
  }

  .register-form {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    width: 80%;
  }

  .register-form label {
    text-align: left;
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.8em;
  }

  .register-form input {
    padding-left: 10px;
    width: 50%;
    height: 50px;
    margin-bottom: 40px;
    border: 1.5px solid var(--light-grey);
    border-radius: 0;
  }

  .register-button {
    cursor: pointer;
    width: 50%;
    height: 50px;
    color: white;
    background-color: var(--light-grey);
    border: 1px solid var(--light-grey);
  }

  .register-button:hover {
    transition: 0.3s;
    background-color: var(--color-hover-red);
    border: 1px solid var(--color-hover-red);
  }

  .register-button:focus {
    outline: none;
  }

  .register-form section {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .register-form section a {
    font-weight: 400;
    text-decoration: underline;
    color: black;
    font-size: 1.2em;
  }

  .register-form section a:hover {
    transition: 0.3s;
    color: var(--color-hover-red);
  }
</style>