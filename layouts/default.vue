<template>
  <v-app class="window" :style="image">
    <Navbar />
    <v-main>
      <v-container>
        <Nuxt />
        <Alert />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>

import Alert from '~/components/Alert.vue'
import Navbar from './navbar.vue'
import Footer from './footer.vue'
import backgroundImg from '~/assets/background/museu.jpeg'

export default {
  components: {
    Alert,
    Navbar,
    Footer
  },
  data () {
    return {
      image: { backgroundImage: `url(${backgroundImg})` },
    }
  }
}
</script>

<style>
 .window {
   height: 150vh;
    background-size: cover !important;
    background-position: 0% 5% !important;
    background-attachment: fixed !important;
    background-repeat: no-repeat !important;
 }
</style>
