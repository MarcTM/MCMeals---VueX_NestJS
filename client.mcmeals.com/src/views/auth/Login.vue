<template>
  <section class="login-page">
    <h1>SIGN IN</h1>

      <form class="login-form" @submit.prevent="onSubmit(username, password)">
        <label>Email</label>
        <input type="email" v-model="username" rerquired />

        <label>Password</label>
        <input type="password" v-model="password" required />

        <section class="prova">
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

    data() {
      return {
        email: null,
        password: null
      };
    },

    methods: {
        onSubmit(email, password) {
            this.$store.dispatch(LOGIN, { email, password })
            .then((response) => {
              setTimeout(() => {
                this.$router.push({ name: "Home"})
              }, 2000);
            })
            .catch((error) => {
              console.log(error)
            })
        }
    },
  }
</script>


<style scoped>
  .login-page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .login-page h1 {
    margin-top: 40px;
    width: 80%;
    padding-bottom: 20px;
    border-bottom: 1px solid grey;
  }

  .login-form {
    margin: 40px 0px  ;
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

  .login-button {
    cursor: pointer;
    width: 50%;
    height: 50px;
    color: white;
    background-color: grey;
    border: 1px solid grey;
  }

  .login-button:hover {
    transition: 0.4s;
    background-color: #f7432e;
    border: 1px solid  #f7432e;
  }

  .prova {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>