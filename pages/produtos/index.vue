<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col justify="center" align="center">
        <v-card flat tile class="card">
          <v-row style="margin-bottom: 30px">
            <v-col align="start">
              <v-row>
                <v-col style="min-width: 250px">
                  <span class="title">Produtos</span>
                </v-col>
                <v-spacer />
                <v-col align="end">
                  <v-btn class="btn" tile v-if="admin" @click="novoProduto()"
                    >Novo produto</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div v-if="loading" class="loader">
          </div>
          <v-row v-if="!loading">
            <v-col v-for="produto in produtos" :key="produto._id">
              <ProdutoCard
                @loadProdutos="loadProdutos()"
                @productLoaded="imagesLoaded++"
                :item="produto"
                :admin="admin"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <EditAddProduto
        @loadProdutos="loadProdutos()"
        v-model="showNovoProduto"
      /> </v-row
  ></v-container>
</template>

<script>
import ProdutoCard from "~/components/produtoCard.vue";
import EditAddProduto from "~/components/dialogs/editAddProduto.vue";

export default {
  components: {
    ProdutoCard,
    EditAddProduto,
  },
  data() {
    return {
      loading: true,
      produtos: [],
      admin: false,
      showNovoProduto: false,
      imagesLoaded: 0,
    };
  },
  created() {
    this.loadProdutos();
    this.$store.dispatch("auth/GET").then((res) => {
      if (res) {
        this.admin = res.isAdmin;
      }
    });
  },
  methods: {
    async loadProdutos() {
      this.loading = true;
      try {
        this.produtos = await this.$axios.$get("/produto");
      } catch (error) {
        this.$alert.error("Não foi possível carregar os produtos.");
      }
      this.loading = false;
    },

    novoProduto() {
      this.showNovoProduto = true;
    },
  },
};
</script>

<style scoped>
.card {
  background-color: rgba(255, 255, 255, 0.226);
  padding: 1rem;
  margin: 5rem 0 1rem;
  color: #000;
  max-width: 1250px !important;
}

.title {
  text-align: center;
  font-size: 1.6rem !important;
  font-weight: 300;
  border-left: 9px solid #000;
  color: #000;
  padding: 0.3rem 1rem;
}

.btn {
  color: white !important;
  width: 200px;
  box-shadow: inset 0px 0px 0px #2f3b47;
  transition: all 0.5s !important;
}
.btn:hover {
  box-shadow: inset 250px 0px 0px #518fb8;
}

.loader,
.loader:before,
.loader:after {
  background: #000;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.loader {
  color: #000;
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
  content: '';
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
