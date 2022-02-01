<template>
  <v-dialog v-model="show" scrollable max-width="800px" width="100vw">
    <v-card light>
      <v-toolbar dark flat style="margin-bottom: 30px">
        <v-toolbar-title>
          {{ this.produto._id ? "Editar produto" : "Adicionar produto" }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon dark @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form @submit.prevent="salvarProduto()">
          <v-row class="linha">
            <v-col align="start" cols="7">
              <span>Nome *</span>
              <v-text-field
                v-model="produto.nome"
                clearable
                solo
                background-color="#00000022"
                color="white"
                filled
                dense
                placeholder="Foguete Preta"
                required
              />
            </v-col>
            <v-col align="start" cols="2">
              <span>Preço *</span>
              <v-text-field
                v-model="produto.preco"
                clearable
                solo
                background-color="#00000022"
                color="white"
                filled
                dense
                required
                placeholder="75,90"
              />
            </v-col>
            <v-col align="start" cols="3">
              <span>Tipo *</span>
              <v-select
                v-model="produto.tipo"
                :items="tipos"
                required
                solo
                dense
                background-color="#00000022"
                color="white"
                height="25px"
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="linha">
            <v-col align="start" cols="6">
              <span>Url da miniatura *</span>
              <v-text-field
                v-model="produto.urlMiniatura"
                clearable
                solo
                background-color="#00000022"
                color="white"
                filled
                dense
                required
                placeholder="https://blocobsb-bucket.s3.sa-east-1.amazonaws.com/assets/produtos/miniaturas/blocoPreta.jpeg"
              />
            </v-col>
            <v-col align="start" cols="6">
              <span>Url da miniatura Alternativa</span>
              <v-text-field
                v-model="produto.urlMiniaturaAlternativa"
                clearable
                solo
                background-color="#00000022"
                color="white"
                filled
                dense
                placeholder="https://blocobsb-bucket.s3.sa-east-1.amazonaws.com/assets/produtos/miniaturas/blocoPreta.jpeg"
              />
            </v-col>
          </v-row>
          <v-row class="linha">
            <v-col align="start">
              <span>Descricao *</span>
              <v-textarea
                v-model="produto.descricao"
                filled
                placeholder="Camiseta inspirada no Foguete, localizado no Parque da Cidade de Brasília, ponto marcante da paisagem e da memória afetiva dos brasilienses."
                clearable
                required
                solo
                background-color="#00000022"
                color="white"
              />
            </v-col>
          </v-row>
          <v-row class="linha">
            <v-col align="start">
              <span>Urls das Imagens *</span>
              <v-row align="center">
                <v-col cols="10">
                  <v-text-field
                    v-model="novaUrl"
                    clearable
                    solo
                    background-color="#00000022"
                    color="white"
                    filled
                    dense
                    placeholder="https://blocobsb-bucket.s3.sa-east-1.amazonaws.com/assets/produtos/miniaturas/blocoPreta.jpeg"
                  />
                </v-col>
                <v-col cols="2">
                  <v-btn
                    tile
                    style="margin-bottom: 20px"
                    dark
                    short
                    @click="addUrl()"
                  >
                    <v-icon>mdi-plus</v-icon>
                    Url
                  </v-btn>
                </v-col>
              </v-row>
              <ul v-for="url in produto.urlImagens" :key="url">
                <li>
                  <v-row align="center">
                    <v-col cols="11">
                      <span>{{ url }}</span>
                    </v-col>
                    <v-col cols="1">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <div v-bind="attrs" v-on="on" @click="removeUrl(url)">
                            <Icons class="icon" icon="apagar" />
                          </div>
                        </template>
                        <span>Remove Url</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </li>
              </ul>
            </v-col>
          </v-row>
          <v-row class="linha">
            <v-col align="end">
              <v-btn tile :loading="loading" class="btn" dark type="submit"
                >Salvar</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Icons from "~/components/icons.vue";

export default {
  components: {
    Icons,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      loading: false,
      produto: {
        nome: "",
        preco: "",
        tipo: "",
        urlMiniatura: "",
        urlMiniaturaAlternativa: "",
        descricao: "",
        destaque: false,
        urlImagens: [],
      },
      tipos: ["adulto", "infantil"],
      novaUrl: "",
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  created() {
    this.produto = this.item || {
      nome: "",
      preco: "",
      tipo: "",
      urlMiniatura: "",
      descricao: "",
      destaque: false,
      urlImagens: [],
    };
  },
  methods: {
    async salvarProduto() {
      if (!this.camposValidos())
        return this.$alert.info("Campos obrigatórios não preenchidos!");
      this.loading = true;
      try {
        if (this.produto._id) {
          for (const item in this.produto) {
            if (item !== "_id" && item !== "__v") {
              await this.$axios.$patch(`/produto/${this.produto._id}`, {
                chave: item,
                valor: this.produto[item],
              });
            }
          }
        } else {
          await this.$axios.$post("/produto", this.produto);
        }
        this.$alert.success("Produto salvo com sucesso!");
        this.show = false;
      } catch (error) {
        this.$alert.error("Não foi possível salvar o produto.");
      }
      this.$emit("loadProdutos");
      this.loading = false;
    },

    camposValidos() {
      return this.produto.urlImagens.length > 0;
    },

    addUrl() {
      if (!this.novaUrl) return;
      this.produto.urlImagens.push(this.novaUrl);
      this.novaUrl = "";
    },

    removeUrl(url) {
      this.produto.urlImagens.splice(this.produto.urlImagens.indexOf(url), 1);
    },
  },
};
</script>

<style>
.btn {
  color: white !important;
  width: 200px;
  box-shadow: inset 0px 0px 0px #2f3b47;
  transition: all 0.5s !important;
}
.btn:hover {
  box-shadow: inset 250px 0px 0px #518fb8;
}

.icon {
  cursor: pointer;
}
</style>
