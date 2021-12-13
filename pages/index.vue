<template>
  <v-container fluid>
    <v-row
      justify="center"
      align="center"
      style="height: calc(70vh - 120px) !important"
    >
      <v-col>
        <div v-if="loadingSlide" class="loader">Loading...</div>
      </v-col>
    </v-row>
    <v-row v-if="!loadingSlide" justify="center" align="center">
      <v-col align="center">
        <v-row
          class="imgSlide"
          :style="{ backgroundImage: `url(${urlSlide})` }"
        >
          <v-col align="start" justify="center">
            <v-btn @click="changeSlide(-1)" icon tile color="#000">
              <v-icon style="font-size: 2rem">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <img
            class="img"
            @loadstart="loadingSlide = true"
            @load="loadingSlide = false"
            :src="urlSlide"
          />
          <v-col  align="end" justify="center">
            <v-btn @click="changeSlide(1)" icon tile color="#000">
              <v-icon style="font-size: 2rem">mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-card tile class="card" app>
          <v-row>
            <v-col align="start">
              <span class="title">Nosso instagram!</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-col align="start">
                <div
                  class="elfsight-app-454cf58e-02c9-46e8-8c27-64f5b558d542"
                  style="z-index: 0 !important"
                />
              </v-col>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      width: null,
      loadingSlide: true,
      slideHome: [],
      urlSlide: null,
      index: 0,
      timer: null,
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

  created() {
    this.getSlides();
    this.startSlide();
  },

  methods: {
    onResize() {
      this.width = window.innerWidth;
    },

    async getSlides() {
      this.loadingSlide = true;
      try {
        this.slideHome = await this.$axios.$get("/slide");
        this.slideHome.unshift({
          url: "https://blocobsb-bucket.s3.sa-east-1.amazonaws.com/assets/slideHome/slideFixo.jpeg",
        });
        this.urlSlide = this.slideHome[0].url;
      } catch (error) {
        console.log(error);
      }
      this.loadingSlide = false;
    },

    startSlide() {
      this.timer = setInterval(() => {
        if (this.index === this.slideHome.length - 1) this.index = 0;
        else ++this.index;
        this.urlSlide = this.slideHome[this.index].url;
      }, 5000);
    },

    changeSlide(value) {
      clearInterval(this.timer);
      this.index += value;
      if (this.index === this.slideHome.length) this.index = 0;
      else if (this.index < 0) this.index = this.slideHome.length - 1;
      this.urlSlide = this.slideHome[this.index].url;
      this.startSlide();
    },
  },
};
</script>

<style scoped>
.card {
  width: fit-content !important;
  max-width: 1200px !important;
  background-color: rgba(255, 255, 255, 0.226);
  padding: 1rem;
  margin: 1rem 0;
  color: #000;
  height: fit-content !important;
}
.title {
  text-align: center;
  font-size: 1.5rem !important;
  font-weight: 300;
  border-left: 9px solid #000;
  color: #000;
  padding: 0 12px;
  margin: 0 0.5rem !important;
}

.imgSlide {
  position: relative;
  transition: background-image 1s ease-in-out;
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
}

.img {
  /* position: absolute; */
  overflow: hidden;
  visibility: hidden;
}

.mobile {
  width: 120% !important;
}

.loader,
.loader:before,
.loader:after {
  background: #ffffff;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.loader {
  color: #ffffff;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: "";
}
.loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 1.5em;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
</style>
