<template>
  <div>
    <div style="height: 50px"></div>
    <v-app-bar
      style="background: #000000ff !important; z-index: 10"
      fixed
      max-height="55px"
      min-height="55px"
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-row>
        <v-col>
          <v-menu
            bottom
            offset-y
            transition="scroll-y-transition"
            max-width="400px"
            nudge-right="25%"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-row v-bind="attrs" v-on="on" align="center">
                <input
                  v-model="pesquisa"
                  class="searchInput"
                  type="text"
                  placeholder="Pesquise seu produto..."
                  @keyup="pesquisar()"
                  @click="reset()"
                />
                <Icons class="icon" icon="search" />
              </v-row>
            </template>
            <v-row
              style="
                height: fit-content !important;
                margin: 0 !important;
                padding: 0 !important;
                background: #2f3b47dd !important;
              "
            >
              <v-col v-if="loadingResults">
                <div class="loader"></div>
              </v-col>
              <v-col
                v-if="!loadingResults"
                style="
                  height: fit-content !important;
                  margin: 0 !important;
                  padding: 0 !important;
                "
              >
                <v-list v-if="searchResults.length === 0" color="transparent">
                  <v-list-item>
                    <span style="padding: 0.5rem 1rem"
                      >Sem resultados encontrados.</span
                    >
                  </v-list-item>
                </v-list>
                <v-list v-if="searchResults.length > 0" color="transparent">
                  <v-list-item
                    v-for="item in searchResults"
                    :key="item._id"
                    class="searchItem"
                    @click="goToProduct(item._id)"
                  >
                    <div>{{ item.nome }}</div>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-menu>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="drawer"
      width="250px"
      style="background: #000000ff !important; margin-top: 55px"
    >
      <v-list>
        <v-list-item-group>
          <v-list-item to="/" link class="menuItem">
            <v-list-item-action>
              <Icons class="icon" icon="home" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <span class="text">Home</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item class="menuItem" @click="goToNovidades()">
            <v-list-item-action>
              <Icons class="icon" icon="novidades" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <span class="text">Novidades</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item to="/produtos" link class="menuItem">
            <v-list-item-action>
              <Icons class="icon" icon="produtos" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <span class="text">Produtos</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-group no-action>
            <template v-slot:activator>
              <v-list-item-action>
                <Icons class="icon" icon="sobre" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="text">Sobre</span>
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item to="/sobre" link>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="text">Sobre a bloco</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="showTabela = true">
              <v-list-item-content>
                <v-list-item-title>
                  <span class="text">Tabela de Tamanhos</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="showTrocas = true">
              <v-list-item-content>
                <v-list-item-title>
                  <span class="text">Trocas e Devoluções</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-divider />
          <v-list-item to="/contato" link class="menuItem">
            <v-list-item-action>
              <Icons class="icon" icon="contato" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <span class="text">Contato</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item disabled />
          <v-list-item v-if="!user" link class="menuItem" @click="login()">
            <v-list-item-action>
              <Icons class="icon" icon="login" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <span class="text">Entrar</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="user" to="/conta" link class="menuItem">
            <v-list-item-action>
              <Icons class="icon" icon="conta" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <span class="text">Conta</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <TabelaTamanhos v-model="showTabela" />
    <Trocas v-model="showTrocas" />
  </div>
</template>

<script>
import TabelaTamanhos from "~/components/dialogs/tabela.vue";
import Trocas from "~/components/dialogs/trocas.vue";
import Icons from "~/components/icons.vue";

export default {
  components: {
    TabelaTamanhos,
    Trocas,
    Icons,
  },
  data() {
    return {
      drawer: false,
      open: true,
      clipped: true,
      fixed: true,
      showTabela: false,
      showTrocas: false,
      scrolled: false,
      user: null,
      searchResults: [],
      loadingResults: false,
      pesquisa: null,
      delay: null,
    };
  },
  mounted() {
    this.$store.dispatch("auth/GET").then((res) => {
      if (res.user) {
        this.user = res.user;
      }
    });
  },
  watch: {
    "$store.state.auth.user": function () {
      this.user = this.$store.state.auth.user;
    },
  },
  methods: {
    reset() {
      this.pesquisa = null;
      this.searchResults = [];
    },
    pesquisar() {
      if (this.pesquisa?.length < 3) return;
      clearInterval(this.delay);
      this.loadingResults = true;
      this.delay = setTimeout(async () => {
        try {
          this.searchResults = await this.$axios.$get(
            "/produto?filtros=" +
              JSON.stringify({ search: true, nome: this.pesquisa })
          );
        } catch (error) {}
        this.loadingResults = false;
      }, 1000);
    },

    goToNovidades() {
      if (this.$router.currentRoute.name !== "index") this.$router.push("/");
      setTimeout(() => {
        const el = document.getElementById("novidades");
        const y =
          el?.getBoundingClientRect().top +
          window.pageYOffset -
          (window.innerWidth < 850 ? 55 : 0);
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 1000);
    },

    login() {
      this.$router.push("/autenticar");
    },
  },
};
</script>

<style scoped>
.text {
  font-size: 1rem;
}
.icon {
  width: 25px;
}

.searchInput {
  background-color: rgba(255, 255, 255, 0.226);
  color: white;
  width: 85%;
  height: 30px;
  padding: 2px 10px;
  margin-right: 5px;
  font-size: 14px;
}

.searchInput:focus {
  outline: none;
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
  margin: 5% auto;
  position: relative;
  font-size: 5px;
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
