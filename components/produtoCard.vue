<template>
  <v-row class="wrapper">
    <v-col>
      <v-row v-if="admin" class="actions" justify="start" align="center">
        <v-col class="action">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on" @click="openDialog('destaque')">
                <Icons class="icon" icon="destaque" />
              </div>
            </template>
            <span>Destaca o produto na página home</span>
          </v-tooltip>
        </v-col>
        <v-col class="action">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on" @click="showEdicao = true">
                <Icons class="icon" icon="editar" />
              </div>
            </template>
            <span>Editar o produto</span>
          </v-tooltip>
        </v-col>
        <v-col class="action">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on" @click="openDialog('deletar')">
                <Icons class="icon" icon="apagar" />
              </div>
            </template>
            <span>Deletar o produto</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-row class="img">
        <v-col>
          <v-img
            :loading="loading"
            @click="detalhar()"
            @mouseenter="mouseEnter"
            @mouseleave="mouseLeave"
            tile
            @loadstart="loading = true"
            @load="loading = false; loaded()"
            :aspect-ratio="0.66"
            :src="miniatura"
          />
        </v-col>
      </v-row>
      <v-row class="informacao" justify="center">
        <v-col class="texto" cols="12">
          <span>{{ produto.nome }} - R$ {{ produto.preco }}</span>
        </v-col>
        <v-col class="texto" cols="12">
          <v-btn text tile @click="detalhar()" class="btnDetalhar">
            <span>Detalhar</span>
            <v-icon class="iconDetalhar">mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card light>
          <v-toolbar
            dark
            flat
            style="border-bottom: 1px solid #ffffff44; margin-bottom: 20px"
          >
            <v-toolbar-title>
              {{ dialogTitle }}
            </v-toolbar-title>
            <v-spacer />
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text style="padding: 1rem !important">
            {{ dialogContent }}
          </v-card-text>
          <v-card-actions style="padding: 1rem !important">
            <v-spacer />
            <v-btn
              dark
              style="
                background: #dd6161 !important;
                padding: 0.5rem 1rem !important;
              "
              @click="confirmarAcao()"
            >
              Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <EditAddProduto v-model="showEdicao" :item="produto" />
    </v-col>
  </v-row>
</template>

<script>
import Icons from "~/components/icons.vue";
import EditAddProduto from "~/components/dialogs/editAddProduto.vue";

export default {
  components: {
    Icons,
    EditAddProduto,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    admin: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      miniatura: "",
      showEdicao: false,
      dialog: false,
      dialogContent: "",
      dialogTitle: "",
      produto: {},
      acao: null,
    };
  },

  created() {
    this.produto = this.item;
    this.miniatura = this.produto.urlMiniatura;
  },

  methods: {
    mouseEnter: function () {
      if (this.produto.urlMiniaturaAlternativa)
        this.miniatura = this.produto.urlMiniaturaAlternativa;
    },

    mouseLeave: function () {
      this.miniatura = this.produto.urlMiniatura;
    },

    openDialog(acao) {
      this.acao = acao;
      this.dialogTitle =
        acao === "deletar" ? "Confirmar exclusão" : "Confirmar destaque";
      this.dialogContent =
        acao === "deletar"
          ? "Tem certeza que deseja excluir esse produto? Essa ação é irreverssível e todos os dados serão perdidos."
          : "Tem certeza que deseja destacar esse produto? Ele aparecerá na tela incial como destaque.";
      this.dialog = true;
    },

    confirmarAcao() {
      this.acao === "deletar" ? this.deletarProduto() : this.destacarProduto();
      this.dialog = false;
    },

    async deletarProduto() {
      try {
        await this.$axios.$delete(`/produto/${this.produto._id}`);
        this.$emit("loadProdutos");
        this.$alert.success("Produto deletado com sucesso!");
      } catch (error) {
        this.$alert.error("Não foi possível deletar o produto");
      }
    },

    async destacarProduto() {
      try {
        const produtos = await this.$axios.$get(`/produto`);
        const destaque = produtos
          .filter((produto) => {
            return produto.destaque;
          })
          .shift();
        if (destaque._id)
          await this.$axios.$patch(`/produto/${destaque._id}`, {
            chave: "destaque",
            valor: "false",
          });
        this.$alert.success("Produto anterior removido do destaque!");
      } catch (error) {
        this.$alert.error(
          "Não foi possível remover o produto anterior do destaque."
        );
      }
      try {
        await this.$axios.$patch(`/produto/${this.produto._id}`, {
          chave: "destaque",
          valor: "true",
        });
        this.$emit("loadProdutos");
        this.$alert.success("Novo produto destacado com sucesso!");
      } catch (error) {
        this.$alert.error("Não foi possível destacar o produto");
      }
    },

    detalhar() {
      this.$router.push("/produtos/" + this.produto._id);
    },

    loaded() {
      this.$emit("productLoaded")
    }
  },
};
</script>

<style scoped>
* {
  margin: 0 !important;
  padding: 0 !important;
}

.img {
  cursor: pointer;
  min-width: 250px !important;
}

.wrapper {
  position: relative;
  max-width: 300px !important;
}

.wrapper:hover .iconDetalhar {
  transform: translate(20px, 0px);
}

.action {
  margin: 0 0.7rem !important;
}

.actions {
  height: 35px !important;
  width: fit-content !important;
  position: absolute;
  right: 0;
  background-color: #d4d4d4c4;
  border: 1px solid rgba(2, 2, 2, 0.534);
  color: black;
  z-index: 2;
}

.icon {
  cursor: pointer;
  width: 20px;
  margin: 5px 15px;
}

.iconDetalhar {
  margin-left: 10px !important;
}

.informacao {
  margin: 1rem 0 2rem !important;
}

.texto {
  font-weight: 300;
  font-size: 1.1rem;
}

.btnDetalhar {
  font-weight: 400;
  color: #000 !important;
  box-shadow: inset 0px 0px 0px #2f3b47;
  transition: all 0.5s !important;
  padding: 0 0.5rem;
}
.btnDetalhar:hover .iconDetalhar {
  transform: translate(20px, 0px);
}
</style>
