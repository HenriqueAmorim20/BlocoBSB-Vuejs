<template>
  <v-row justify="center" align="center">
    <v-col justify="center" align="center">
      <v-card tile class="card">
        <v-row style="margin-bottom: 30px">
          <v-col align="start">
            <v-row>
              <v-col style="min-width: 250px">
                <span class="title">Nossos produtos</span>
              </v-col>
              <v-spacer />
              <v-col align="end">
                <v-btn class="btn" tile v-if="admin" @click="novoProduto()">Novo produto</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="produto in produtos" :key="produto._id">
            <ProdutoCard
              @loadProdutos="loadProdutos()"
              :item="produto"
              :admin="admin"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <EditAddProduto @loadProdutos="loadProdutos()" v-model="showNovoProduto" />
  </v-row>
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
      produtos: [],
      admin: false,
      showNovoProduto: false,
    };
  },
  created() {
    this.loadProdutos();
  },
  methods: {
    async loadProdutos() {
      this.produtos = await this.$axios.$get("/produto");
    },

    novoProduto() {
      this.showNovoProduto = true;
    },
  },
};
</script>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.705);
  padding: 1rem;
  margin: 1rem 0;
  color: #000;
  max-width: 1350px !important;
}

.title {
  text-align: center;
  font-size: 1.4rem !important;
  font-weight: 300;
  border-left: 9px solid #000;
  color: #000;
  padding: 0 12px;
  margin: 0 0.5rem;
}

.btn {
  color: white !important;
  width: 200px;
  box-shadow: inset 0px 0px 0px #2F3B47;
  transition: all 0.5s !important;
}
.btn:hover {
  box-shadow: inset 250px 0px 0px #518fb8;
}
</style>
