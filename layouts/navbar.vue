<template>
  <div>
    <v-app-bar class="topNav" color="transparent" height="50px" flat>
      <v-row>
        <v-col>
          <v-row>
            <a
              class="socialItem"
              :href="'https://wa.me/556193687754?text=' + getMensagem()"
              target="_blank"
            >
              <Icons class="icon" icon="wpp" />
              <span class="socialText">(61) 9368-7754</span>
            </a>
            <a
              class="socialItem"
              href="https://www.instagram.com/bloco.bsb/"
              target="_blank"
            >
              <Icons class="icon" icon="insta" />
              <span class="socialText">@bloco.bsb</span>
            </a>
          </v-row>
        </v-col>
        <v-spacer />
        <v-col>
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
                    <Icons class="icon" icon="search" />
                    <input
                      v-model="pesquisa"
                      class="searchInput"
                      type="text"
                      placeholder="Pesquise seu produto..."
                      @keyup="pesquisar()"
                      @click="reset()"
                    />
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
                    <v-list
                      v-if="searchResults.length === 0"
                      color="transparent"
                    >
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
        </v-col>
      </v-row>
    </v-app-bar>
    <v-app-bar class="nav" height="70px" flat>
      <v-row class="navMenu">
        <NuxtLink to="/">
          <v-img
            :src="require('../assets/logo/logoPrincipal.png')"
            class="imgLogo"
            max-width="140px"
          />
        </NuxtLink>

        <NuxtLink
          class="lineTransition"
          to="/produtos"
          style="text-decoration: none; color: inherit"
        >
          <div class="navMenuItem">
            <Icons class="icon navMenuItemIcon" icon="produtos" />
            <span>Produtos</span>
          </div>
        </NuxtLink>

        <div class="lineTransition" @click="goToNovidades()">
          <div class="navMenuItem">
            <Icons class="icon navMenuItemIcon" icon="novidades" />
            <span>Novidades</span>
          </div>
        </div>
        <v-menu
          open-on-hover
          bottom
          offset-y
          flat
          transition="scroll-y-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <div class="lineTransition">
              <div class="navMenuItem" v-bind="attrs" v-on="on">
                <Icons class="icon navMenuItemIcon" icon="sobre" />
                <span>Sobre</span>
              </div>
            </div>
          </template>

          <v-list class="sobreMenu" flat color="#2F3B47dd">
            <v-list-item>
              <NuxtLink
                class="lineTransition"
                to="/sobre"
                style="text-decoration: none; color: inherit"
              >
                <div class="navMenuItem sobreItem">
                  <span>Sobre a Bloco</span>
                </div>
              </NuxtLink>
            </v-list-item>
            <v-list-item>
              <div class="lineTransition" @click="showTabela = true">
                <div class="navMenuItem sobreItem">
                  <span>Tabela de Tamanhos</span>
                </div>
              </div>
            </v-list-item>
            <v-list-item>
              <div class="lineTransition" @click="showTrocas = true">
                <div class="navMenuItem sobreItem">
                  <span>Trocas e Devoluções</span>
                </div>
              </div>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-spacer />
        <NuxtLink
          class="lineTransition"
          to="contato"
          style="text-decoration: none; color: inherit"
        >
          <div class="navMenuItem">
            <Icons class="icon navMenuItemIcon" icon="contato" />
            <span>Contato</span>
          </div>
        </NuxtLink>
        <div class="divider" />
        <div v-if="!user" class="lineTransition" @click="login()">
          <div class="navMenuItem">
            <Icons class="icon navMenuItemIcon" icon="login" />
            <span>Entrar</span>
          </div>
        </div>
        <v-menu
          v-if="user"
          open-on-hover
          bottom
          offset-y
          flat
          transition="scroll-y-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <NuxtLink
              class="lineTransition"
              to="/conta"
              style="text-decoration: none; color: inherit"
            >
              <div class="navMenuItem" v-bind="attrs" v-on="on">
                <Icons class="icon navMenuItemIcon" icon="conta" />
                <span>Conta</span>
              </div>
            </NuxtLink>
          </template>

          <v-list class="sobreMenu" flat color="#2F3B47dd">
            <v-list-item>
              <NuxtLink
                to="/conta"
                style="text-decoration: none; color: inherit"
              >
                <div class="navMenuItem sobreItem">
                  <span>{{ user.email }}</span>
                </div>
              </NuxtLink>
            </v-list-item>
            <v-list-item>
              <div class="lineTransition" @click="logout()">
                <div class="navMenuItem sobreItem">
                  <Icons class="icon navMenuItemIcon" icon="login" />
                  <span>Logout</span>
                </div>
              </div>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-app-bar>
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
      searchResults: [],
      loadingResults: false,
      showTabela: false,
      showTrocas: false,
      scrolled: false,
      user: null,
      pesquisa: null,
      delay: null,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    this.$store.dispatch("auth/GET").then((res) => {
      if (res.user) {
        this.user = res.user;
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
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

    goToProduct(id) {
      this.$router.push("/produtos/" + id);
      this.pesquisa = null;
      this.searchResults = [];
    },

    goToNovidades() {
      if (this.$router.currentRoute.name !== "index") this.$router.push("/");
      setTimeout(() => {
        const el = document.getElementById("novidades");
        const y = el?.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 800);
    },

    login() {
      this.$router.push("/autenticar");
    },

    logout() {
      this.$store.dispatch("auth/LOGOUT").then((res) => {
        if (res) {
          this.$router.push("/");
          this.$alert.success("Logout feito com sucesso!");
        }
      });
    },

    onScroll(e) {
      this.scrolled = window.top.scrollY > 50 ? true : false;
    },
    getMensagem() {
      let mensagem = "Olá, tudo bem? ";
      if (this.user) mensagem += `Me chamo ${this.user.nome}! `;
      mensagem += `Gostaria de tirar algumas dúvidas :)`;
      return mensagem;
    },
  },
};
</script>

<style scoped>
.socialItem {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  margin: 0 10px;
}

.icon {
  margin-right: 7px;
  width: 20px;
}

.searchInput {
  background-color: rgba(255, 255, 255, 0.226);
  color: white;
  width: 90%;
  height: 30px;
  padding: 2px 10px;
  font-size: 14px;
}

.searchInput:focus {
  outline: none;
}

.searchMenu {
  cursor: pointer;
}

.imgLogo {
  cursor: pointer;
  margin-left: 15px;
  margin-bottom: 5px;
}

.nav {
  background: transparent !important;
}

.navScrolled {
  background: #000000 !important;
}

.navMenu {
  align-items: center;
}

.navMenuItem {
  display: flex;
  cursor: pointer;
  align-items: center;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
}

.navMenuItem span {
  text-decoration: none;
}

.lineTransition {
  margin: 0 0.5rem;
  display: inline-block;
  width: fit-content;
}

.lineTransition:after {
  display: flex;
  content: "";
  border-bottom: solid 1px #fff;
  transform: scaleX(0);
  transition: transform 250ms ease-in-out;
}
.lineTransition:hover:after {
  transform: scaleX(1);
}

.divider {
  height: 20px;
  border-left: 1px solid #ffffff;
  margin: 0px 10px;
}

.whiteLogo {
  background-color: #ffffffab;
  margin-bottom: 0px;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: white;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: white;
}

.sobreMenu {
  display: flex;
  flex-direction: column !important;
  width: fit-content;
}

.sobreItem {
  cursor: pointer;
  font-size: 1rem !important;
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
