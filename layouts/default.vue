<template>
  <v-app class="window" :style="image">
    <Navbar v-if="width > 950" />
    <Drawer v-if="width <= 950" />
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
import Alert from "~/components/Alert.vue";
import Navbar from "./navbar.vue";
import Drawer from "./drawer.vue";
import Footer from "./footer.vue";
import backgroundImg from "~/assets/background/museu.jpeg";

export default {
  components: {
    Alert,
    Navbar,
    Drawer,
    Footer,
  },
  data() {
    return {
      width: null,
      image: { backgroundImage: `url(${backgroundImg})` },
    };
  },
  mounted() {
    this.width = window.innerWidth;
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.width = window.innerWidth;
    },
  },
};
</script>

<style>
.window {
  background-size: cover !important;
  background-position: 0% 5% !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
}
</style>
