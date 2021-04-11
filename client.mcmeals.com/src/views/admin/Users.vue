<template>
  <section class="users">

    <section class="users-info">
      <section class="users-columns">
        <h1>Name</h1>
        <h1>Surname</h1>
        <h1>Email</h1>
        <h1>Role</h1>
      </section>

      <section v-for="user in users" class="users-details">
        <h4>{{user.name}}</h4>
        <h4>{{user.surname}}</h4>
        <h4>{{user.email}}</h4>
        <h4>{{user.role}}</h4>
      </section>
    </section>
    

  </section>
</template>



<script>
import { defineComponent } from 'vue';
import { GET_USERS } from "@/store/actions.type";
import { mapGetters } from "vuex"

export default defineComponent({
  name: 'Users',

  mounted() {
      this.getUsers()
  },

  computed: {
      ...mapGetters(["users"]),
  },

  methods: {
      getUsers() {
          this.$store.dispatch(GET_USERS)
      },
  },
});
</script>



<style scoped>
  .users {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .users-info {
    width: 90%;
  }

  .users-columns {
    width: 100%;
    font-size: 1.2em;
    background-color: var(--light-grey);
    text-transform: uppercase;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    padding: 10px 0px;
  }

  .users-columns article {
    text-align: center;
  }

  .users-details {
    cursor: pointer;
    width: 100%;
    padding: 30px 0px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    border-bottom: 1px solid var(--light-grey);
  }

  .users-details:hover {
    background-color: var(--color-background-secondary);
  }

  .users-details article {
    text-align: center;
  }
</style>