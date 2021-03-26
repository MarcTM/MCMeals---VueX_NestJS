<template>
  <section class="account">
    <h1 class="account-title">Your Account</h1>

    <div class="your-account">
    {{ profile.username }}
    <br>
    {{ profile.email }}
    </div>
  </section>
</template>


<script>
  import {
      GET_PROFILE
  } from "@/store/actions.type";
  import { mapGetters } from 'vuex';

  export default {
    name: "Account",

    mounted() {
        this.get_profile()
    },

    computed: {
        ...mapGetters(["profile"]),
    },

    methods: {
        get_profile() {
            this.$store.dispatch(GET_PROFILE)
        }
    },
  }
</script>


<style scoped>
.account {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px;
}

.account-title {
    text-transform: uppercase;
    text-align: center;
    width: 40%;
    color: black;
    padding-bottom: 10px;
    border-bottom: 1px solid black;
    margin-bottom: 50px;
}
</style>