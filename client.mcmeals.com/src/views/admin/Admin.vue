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



<style src="./Admin.css" scoped />