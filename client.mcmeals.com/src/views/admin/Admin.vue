<template>
    <section class="admin">
      <h1>PANEL ADMIN</h1>
      <router-view></router-view>
    </section>
</template>



<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Admin',
});
</script>



<style scoped>
  .admin {
    padding: 30px 0px;
    width: 100%;
    text-align: center;
  }

  .admin h1 {
    margin: 30px 0px 50px 0px;
  }
</style>