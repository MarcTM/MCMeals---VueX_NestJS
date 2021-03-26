<template>
  <div class="home">
    <h3>HOME</h3>
  </div>
</template>



<script>
import { defineComponent } from 'vue';
// import { GET_CATEGORIES } from "@/store/actions.type";
// import { mapGetters } from "vuex";

export default defineComponent({
  name: 'Home',

  // data () {
  //   return {
  //     value: 0
  //   }
  // },

  // mounted() {
  //     this.getCategories()
  // },

  // computed: {
  //     ...mapGetters(["categories"]),
  // },

  // methods: {
  //     getCategories() {
  //         this.$store.dispatch(GET_CATEGORIES).then((response) => console.log(response))
  //     },

  //     getCategory(id) {
  //       this.$router.push({ name: "Category", params: {id: id}});
  //     }
  // },
});
</script>



<style scoped>
.home {
  width: 100%;
  text-align: center;
  padding: 50px 0px;
}
</style>