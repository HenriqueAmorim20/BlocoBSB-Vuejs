<template>
  <v-container fluid>
    <v-row
      justify="start"
      align="center"
      :style="`height: calc(100vh - ${
        width > 850 ? '105px' : '50px'
      }) !important; position: relative`"
    >
      <v-col align="center">
        <v-row>
          <v-col>
            <v-img
            :src="require('../assets/logo/logoPrincipal.png')"
            class="imgLogo"
          />
          </v-col>
        </v-row>
      </v-col>
      <v-col align="center" cols="12" style="position: absolute; bottom: 0%">
        <v-icon @click="goToSlide()" color="white" class="fillerHomeIcon bounce"
          >mdi-arrow-down</v-icon
        >
      </v-col>
    </v-row>
    <v-row v-if="!loadingSlide" justify="center" align="center">
      <v-col align="center">
        <v-col id="slides" style="padding: 0 !important">
          <v-row
            class="imgSlide"
            :style="{ backgroundImage: `url(${urlSlide})` }"
          >
            <v-col
              align="start"
              justify="center"
              style="
                position: absolute;
                left: 0;
                top: 50%;
                width: fit-content !important;
              "
            >
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
            <v-col v-if="renderSobre()" class="colSobre">
              <v-btn tile @click="sobre()" class="btnSobre">
                <span>Sobre nós</span>
                <v-icon class="iconSobre">mdi-arrow-right</v-icon>
              </v-btn>
            </v-col>
            <v-col
              align="end"
              justify="center"
              style="
                position: absolute;
                right: 0;
                top: 50%;
                width: fit-content !important;
              "
            >
              <v-btn @click="changeSlide(1)" icon tile color="#000">
                <v-icon style="font-size: 2rem">mdi-arrow-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col style="padding: 2rem 0 0 !important">
          <v-card tile flat class="card">
            <v-col align="start">
              <span class="title">Destaque</span>
            </v-col>
            <v-col style="margin-top: 1rem">
              <v-row v-if="destaque" align="center">
                <v-col>
                  <v-img
                    class="imgNovidades"
                    @loadstart="loadingDestaque = true"
                    @load="loadingDestaque = false"
                    :src="destaque.urlImagens[0]"
                  />
                </v-col>
                <v-col class="desc">
                  <v-row>
                    <v-col align="start">
                      <span>
                        {{ destaque.nome }}
                      </span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <p>
                        {{ destaque.descricao }}
                      </p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col align="center" justify="center">
                      <v-btn
                        tile
                        class="btnDetalhar"
                        @click="detalhar(destaque._id)"
                      >
                        <v-row align="center">
                          <v-col> Mais detalhes </v-col>
                          <v-col>
                            <v-icon class="iconDetalhar">
                              mdi-arrow-right
                            </v-icon>
                          </v-col>
                        </v-row>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
        </v-col>
        <v-col style="padding: 0 0 2rem !important">
          <v-card flat tile class="card" id="novidades" style="padding: 1rem">
            <div class="divider"></div>
            <v-row style="margin-bottom: 2rem">
              <v-col align="start">
                <span class="title">Novidades</span>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col
                v-for="produto in novidades"
                :key="produto._id"
                class="desc"
                align="center"
              >
                <v-row>
                  <v-col align="start" style="padding-bottom: 0 !important">
                    <span>
                      {{ produto.nome }}
                    </span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col style="padding-top: 0.1rem !important">
                    <v-img
                      @loadstart="loadingNovidades = true"
                      :aspect-ratio="0.65"
                      @load="loadingNovidades = false"
                      :src="produto.urlImagens[0]"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p>
                      {{ produto.descricao }}
                    </p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn
                      tile
                      class="btnDetalhar"
                      @click="detalhar(produto._id)"
                    >
                      <v-row align="center">
                        <v-col> Mais detalhes </v-col>
                        <v-col>
                          <v-icon class="iconDetalhar">
                            mdi-arrow-right
                          </v-icon>
                        </v-col>
                      </v-row>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col class="instaFeed">
          <v-row>
            <v-col align="start">
              <span class="title">Instagram</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="start">
              <div
                class="elfsight-app-454cf58e-02c9-46e8-8c27-64f5b558d542"
                style="z-index: 0 !important"
              ></div>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProdutoCard from "~/components/produtoCard.vue";

export default {
  components: {
    ProdutoCard,
  },
  data() {
    return {
      width: null,
      loadingDestaque: true,
      loadingSlide: true,
      loadingNovidades: true,
      slideHome: [],
      urlSlide: null,
      index: 0,
      timer: null,
      novidades: [],
      destaque: null,
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
    this.loadingDestaque = true;
    this.loadingSlide = true;
    this.loadingNovidades = true;
    this.getSlides();
    this.startSlide();
    this.getNovidadesDestaque();
  },

  methods: {
    onResize() {
      this.width = window.innerWidth;
    },

    goToSlide() {
      const el = document.getElementById("slides");
      const y =
        el?.getBoundingClientRect().top +
        window.pageYOffset -
        (window.innerWidth < 850 ? 55 : 0);
      window.scrollTo({ top: y, behavior: "smooth" });
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
        this.$alert.error(error);
      }
      this.loadingSlide = false;
    },

    startSlide() {
      this.timer = setInterval(() => {
        if (this.index === this.slideHome.length - 1) this.index = 0;
        else ++this.index;
        this.urlSlide = this.slideHome[this.index]?.url;
      }, 5000);
    },

    changeSlide(value) {
      clearInterval(this.timer);
      this.index += value;
      if (this.index === this.slideHome.length) this.index = 0;
      else if (this.index < 0) this.index = this.slideHome.length - 1;
      this.urlSlide = this.slideHome[this.index]?.url;
      this.startSlide();
    },

    async getNovidadesDestaque() {
      try {
        const produtos = await this.$axios.$get("/produto");
        this.novidades = produtos.slice(-3).reverse();
        this.destaque = produtos
          .filter((produto) => {
            return produto.destaque;
          })
          .shift();
      } catch (error) {
        this.$alert.error("Não foi possível carregar as novidades e destaque.");
      }
    },

    renderDivider(produto) {
      return this.novidades.indexOf(produto) !== 2;
    },

    reverseRow(produto) {
      const index = this.novidades.indexOf(produto);
      return index % 2 === 0;
    },

    detalhar(id) {
      this.$router.push("/produtos/" + id);
    },

    renderSobre() {
      return this.urlSlide === this.slideHome[0].url;
    },

    sobre() {
      this.$router.push("/sobre");
    },
  },
};
</script>

<style scoped>

.imgLogo {
  background: rgba(255, 255, 255, 0.267);
  max-width: 200px;
  margin-bottom: 10%;
}
.header {
  color: #000;
  font-size: calc(2vw + 1.3rem);
  min-width: 250px;
  background: rgba(255, 255, 255, 0.164);
  padding: 0.3rem 0.7rem;
}

.card {
  max-width: 1200px !important;
  background-color: rgba(255, 255, 255, 0.226);
  /* margin: 4rem 0; */
  color: #000;
}
.title {
  text-align: center;
  font-size: 1.6rem !important;
  font-weight: 300;
  border-left: 9px solid #000;
  color: #000;
  padding: 0.3rem 1rem;
}

.instaFeed {
  margin: 0 !important;
  padding: 1rem !important;
  overflow: hidden !important;
}

.desc {
  color: #fff !important;
  min-width: 250px;
  max-width: 400px;
  margin-bottom: 2rem;
}

.desc p {
  color: #000 !important;
  background: rgba(255, 255, 255, 0);
  padding: 0.5rem;
  text-align: left !important;
  font-size: 1.1rem;
}

.desc span {
  font-size: 1.4rem;
  background: rgba(0, 0, 0, 0.808);
  color: white !important;
  padding: 0.5rem 1rem;
}

.titleWhite {
  text-align: center;
  font-size: 1.5rem !important;
  font-weight: 300;
  border-left: 9px solid #fff;
  color: #fff;
  padding: 0 12px;
  margin: 0 0.5rem !important;
}

.imgSlide {
  position: relative;
  transition: background-image 1s ease-in-out;
  background-size: contain !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
}

.imgNovidades {
  position: relative;
  min-width: 250px;
  max-height: 80vh;
  max-height: 500px !important;
  max-width: 700px !important;
}

.img {
  overflow: hidden;
  visibility: hidden;
}

.mobile {
  width: 120% !important;
}

.destacado {
  background-color: rgba(255, 255, 255, 0.116);
  max-width: 1200px !important;
  /* height: 100% !important; */
  color: #000;
}

.btnDetalhar {
  font-weight: 400;
  color: #fff !important;
  box-shadow: inset 0px 0px 0px #2f3b47;
  transition: all 0.5s !important;
  padding: 0 0.5rem;
}
.btnDetalhar:hover {
  box-shadow: inset 250px 0px 0px #518fb8;
}
.btnDetalhar:hover .iconDetalhar {
  transform: translate(10px, 0px);
}

.btnSobre {
  font-weight: 400;
  color: #fff !important;
  box-shadow: inset 0px 0px 0px #518fb8;
  transition: all 0.5s !important;
  padding: 0 0.5rem;
  background: #518fb8 !important;
}
.btnSobre:hover {
  box-shadow: inset 250px 0px 0px #2f3b47;
}
.btnSobre:hover .iconSobre {
  transform: translate(10px, 0px);
}

.colSobre {
  position: absolute;
  top: 50%;
  bottom: 50%;
}

.divider {
  border-bottom: 1px solid rgba(0, 0, 0, 0.267);
  width: 90%;
  height: 2px;
  margin: 1rem 0 3rem;
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

.fillerHomeIcon {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px;
  width: fit-content !important;
  border-radius: 40%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.246);
  font-size: 200%;
  -webkit-border-radius: 40%;
  -moz-border-radius: 40%;
  -ms-border-radius: 40%;
  -o-border-radius: 40%;
  margin-bottom: 50px;
}

.bounce {
  -moz-animation: bounce 0.5s infinite linear;
  -o-animation: bounce 0.5s infinite linear;
  -webkit-animation: bounce 0.5s infinite linear;
  animation: bounce 0.5s infinite linear;
}

@-webkit-keyframes bounce {
  0% {
    top: 0;
  }
  50% {
    top: -0.2em;
  }
  70% {
    top: -0.3em;
  }
  100% {
    top: 0;
  }
}
@-moz-keyframes bounce {
  0% {
    top: 0;
  }
  50% {
    top: -0.2em;
  }
  70% {
    top: -0.3em;
  }
  100% {
    top: 0;
  }
}
@-o-keyframes bounce {
  0% {
    top: 0;
  }
  50% {
    top: -0.2em;
  }
  70% {
    top: -0.3em;
  }
  100% {
    top: 0;
  }
}
@-ms-keyframes bounce {
  0% {
    top: 0;
  }
  50% {
    top: -0.2em;
  }
  70% {
    top: -0.3em;
  }
  100% {
    top: 0;
  }
}
@keyframes bounce {
  0% {
    top: 0;
  }
  50% {
    top: -0.2em;
  }
  70% {
    top: -0.3em;
  }
  100% {
    top: 0;
  }
}
</style>
