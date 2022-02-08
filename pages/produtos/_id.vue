<template>
  <v-container>
    <v-row justify="center" align="center"  style="min-height : 90vh">
      <v-col justify="center" align="center">
        <v-card :loading="loading" tile class="card">
          <v-row v-if="width <= 800 && !loading" style="margin-bottom: 0.5rem">
            <v-col align="start">
              <span class="title">{{ produto.nome }}</span>
            </v-col>
          </v-row>
          <v-row class="wrap">
            <v-col
              align="start"
              :cols="width > 800 ? 5 : 12"
              style="min-width: 280px"
            >
              <v-row
                v-if="width > 800 && !loading"
                style="margin-bottom: 0.5rem"
              >
                <v-col align="start">
                  <span class="title">{{ produto.nome }}</span>
                </v-col>
              </v-row>
              <v-row
                v-if="!loading"
                class="texts"
                style="font-size: 1.5rem !important"
              >
                <v-col>
                  <span>R$ {{ produto.preco }}</span>
                </v-col>
              </v-row>
              <v-row v-if="!loading" class="texts">
                <v-col>
                  <span style="text-transform: capitalize">{{
                    produto.tipo
                  }}</span>
                </v-col>
              </v-row>
              <v-row v-if="!loading" class="texts">
                <v-col>
                  <span>{{ produto.descricao }}</span>
                </v-col>
              </v-row>
              <v-row v-if="!loading" class="texts">
                <v-col align="center">
                  <span
                    @click="showTabela = true"
                    style="text-decoration: underline; cursor: pointer"
                    >Confira aqui a tabela de tamanhos!</span
                  >
                </v-col>
              </v-row>
              <v-row v-if="!loading">
                <v-col align="center" justify="center">
                  <v-text-field
                    v-model="quantidade"
                    filled
                    outlined
                    light
                    min="1"
                    max="50"
                    color="black"
                    hide-details
                    dense
                    style="width: 100px"
                    label="Qtd."
                    type="number"
                  />
                </v-col>
              </v-row>
              <v-row v-if="!loading">
                <v-col align="center">
                  <a
                    :href="`https://wa.me/5561981889864?text=${getMensagem()}`"
                    target="_blank"
                    style="width: fit-content; text-decoration: none"
                  >
                    <v-btn tile class="btnComprar">
                      <v-row align="center">
                        <v-col>
                          <span>Comprar agora</span>
                        </v-col>
                        <v-col>
                          <v-icon class="iconComprar"> mdi-arrow-right </v-icon>
                        </v-col>
                      </v-row>
                    </v-btn>
                  </a>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              justify="start"
              :cols="width > 800 ? 7 : 12"
              :style="
                width > 800
                  ? ''
                  : 'min-width: 280px; margin: 0 !important; padding: 0 !important;'
              "
            >
              <v-row :loading="loadingImg">
                <v-col justify="start" align="start">
                  <v-img
                    class="img"
                    @loadstart="loadingImg = true"
                    :aspect-ratio="1"
                    @load="loadingImg = false"
                    :src="currImg"
                  >
                    <v-btn
                      v-if="index !== 0 && !loading"
                      style="
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        background: #ffffffab;
                      "
                      text
                      tile
                      color="#000"
                      @click="prevImg()"
                    >
                      <v-icon>mdi-arrow-left</v-icon>
                      <span>Prev</span>
                    </v-btn>
                    <v-btn
                      v-if="index !== produto.urlImagens.length - 1 && !loading"
                      style="
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        background: #ffffffab;
                      "
                      text
                      tile
                      color="#000"
                      @click="nextImg()"
                    >
                      <span>Prox</span>
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-img>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <TabelaTamanhos v-model="showTabela" />
    </v-row>
  </v-container>
</template>

<script>
import TabelaTamanhos from "~/components/dialogs/tabela.vue";

export default {
  components: {
    TabelaTamanhos,
  },
  data() {
    return {
      loadingImg: true,
      loading: true,
      user: null,
      showTabela: false,
      loading: true,
      produto: {
        urlImagens: [],
      },
      quantidade: 1,
      currImg: null,
      index: 0,
      width: 0,
    };
  },
  created() {
    this.getProduto();
    this.$store.dispatch("auth/GET").then((res) => {
      if (res.user) {
        this.user = res.user;
      }
    });
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
    async getProduto() {
      this.loading = true;
      const id = this.$route.params.id;
      try {
        this.produto = await this.$axios.$get(`/produto/${id}`);
        this.currImg = this.produto.urlImagens[this.index];
      } catch (error) {
        this.$alert.error(error);
        this.$router.push("/produtos/");
      }
      this.loading = false;
    },

    nextImg() {
      this.currImg = this.produto.urlImagens[++this.index];
    },

    prevImg() {
      this.currImg = this.produto.urlImagens[--this.index];
    },

    onResize() {
      this.width = window.innerWidth;
    },

    getMensagem() {
      let mensagem = "Olá, tudo bem? ";
      if (this.user) mensagem += `Me chamo ${this.user.nome}! `;
      mensagem += `Gostaria de comprar ${this.quantidade} unidade(s) da camisa ${this.produto.nome}, tem disponível?`;
      return mensagem;
    },
  },
};
</script>

<style scoped>
.card {
  width: fit-content !important;
  max-width: 1200px !important;
  background: rgba(255, 255, 255, 0.705);
  padding: 1rem;
  margin: 1rem 0;
  color: #000;
  height: fit-content !important;
}

.title {
  text-align: center;
  font-size: 1.4rem !important;
  font-weight: 300;
  border-left: 9px solid #000;
  color: #000;
  padding: 0 12px;
  margin: 0 0.5rem !important;
}

.img {
  position: relative;
  min-width: 250px;
  max-width: 800px !important;
  max-height: 500px !important;
}

.wrap {
  flex-wrap: wrap-reverse;
}

.texts {
  font-size: 1.1rem !important;
  font-weight: 300;
  text-indent: 1.5rem !important;
}

.btnComprar {
  font-weight: 400;
  color: #fff !important;
  box-shadow: inset 0px 0px 0px #2f3b47;
  transition: all 0.5s !important;
  padding: 0 0.5rem;
}
.btnComprar:hover {
  box-shadow: inset 250px 0px 0px #518fb8;
}
.btnComprar:hover .iconComprar {
  transform: translate(10px, 0px);
}
</style>

