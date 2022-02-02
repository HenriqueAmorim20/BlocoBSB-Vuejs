<template>
  <v-app class="window" :style="image">
    <script src="https://apps.elfsight.com/p/platform.js" defer></script>
    <Navbar v-if="width > 950" />
    <Drawer v-if="width <= 950" />
    <v-main style="padding: 0 !important">
      <Nuxt />
      <Alert />
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
    this.getUser();
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

    getUser() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        this.$store.dispatch("auth/LOGIN", user)
      }
    },
  },
};
</script>

<style>
.window {
  background-size: cover !important;
  background-position: center 18% !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
}
</style>
