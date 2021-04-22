<template>
  <Header />
  <router-view />
  <Footer />
</template>



<script>
  import Header from '@/views/layout/Header.vue';
  import Footer from '@/views/layout/Footer.vue';

  export default {
    name: "App",
    
    components: {
      Header,
      Footer
    }
  }
</script>