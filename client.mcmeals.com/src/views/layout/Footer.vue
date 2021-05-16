<template>
  <section class="footer">

    <section class="social">
      <nav class="main-footer-logo">
        <router-link to="/">
          <img src="../../../public/logowhite.png" alt="webpage logo"/>
        </router-link>
      </nav>

      <section class="networks">
        <article>
          <img src="../../assets/instagram.png" alt="instagram" />
          <span>mcmeals</span>
        </article>
        <article>
          <img src="../../assets/facebook.png" alt="facebook" />
          <span>mcmeals</span>
        </article>
        <article>
          <img src="../../assets/twitter.png" alt="twitter" />
          <span>mcmeals</span>
        </article>
      </section>
    </section>

  </section>
</template>


<script>
export default {
    name: "Footer",
}
</script>

<style src="./Footer.css" scoped />