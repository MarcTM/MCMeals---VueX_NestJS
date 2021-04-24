<template>
  <section class="account">
    <button @click="logout()">LOGOUT</button>
  </section>
</template>



<script>
  import { LOGOUT } from "@/store/actions.type";

  export default {
    name: "Account",

    methods: {
        logout() {
          this.$store.dispatch(LOGOUT)
            .then((response) => {
              this.$router.push({ name: "Home"})
            })
        }
    },
  }
</script>

<style src="./Account.css" scoped />