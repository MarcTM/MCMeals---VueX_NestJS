<template>
  <section class="login-page">
    <h1>SIGN IN</h1>
    
      <form class="login-form" @submit.prevent="login(username, password)">
        <label>Email</label>
        <input type="email" v-model="username" rerquired />

        <label>Password</label>
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
                this.$router.push({ name: "Home"})
              }
            })
            .catch((error) => {
              console.error(error)
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
    margin-bottom: 30px;
  }

  .login-page h1 {
    margin-top: 40px;
    width: 80%;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--light-grey);
  }

  .login-form {
    margin: 40px 0px  ;
    display: flex;
    flex-direction: column;
    width: 80%;
  }

  .login-form label {
    text-align: left;
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.8em;
  }

  .login-form input {
    padding-left: 10px;
    width: 50%;
    height: 50px;
    margin-bottom: 40px;
    border: 1.5px solid var(--light-grey);
    border-radius: 0;
  }

  .login-button {
    cursor: pointer;
    width: 50%;
    height: 50px;
    color: white;
    background-color: var(--light-grey);
    border: 1px solid var(--light-grey);
  }

  .login-button:hover {
    transition: 0.3s;
    background-color: var(--color-hover-red);
    border: 1px solid  var(--color-hover-red);
  }

  .login-button:focus {
    outline: none;
  }

  .login-form section {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .login-form section a {
    font-weight: 400;
    text-decoration: underline;
    color: black;
    font-size: 1.2em;
  }

  .login-form section a:hover {
    transition: 0.3s;
    color: var(--color-hover-red);
  }
</style>