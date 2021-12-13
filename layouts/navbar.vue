<template>
  <div>
    <v-app-bar class="topNav" color="transparent" height="50px" flat>
      <v-row>
        <v-col>
          <v-row>
            <a
              class="socialItem"
              :href="'https://wa.me/5561981889864?text=' + getMensagem()"
              target="_blank"
            >
              <Icons class="icon" icon="wpp" />
              <span class="socialText">(61) 98188-9864</span>
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
            <Icons class="icon" icon="search" />
            <input
              class="searchInput"
              type="text"
              placeholder="Pesquise seu produto..."
            />
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-app-bar
      class="nav"
      height="70px"
      flat
    >
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
        <v-menu open-on-hover bottom offset-y flat transition="scroll-y-transition">
          <template v-slot:activator="{ on, attrs }">
            <div class="lineTransition">
              <div class="navMenuItem" v-bind="attrs" v-on="on">
                <Icons class="icon navMenuItemIcon" icon="sobre" />
                <span>Sobre</span>
              </div>
            </div>
          </template>

          <v-list
            class="sobreMenu"
            flat
            color="#2F3B47dd"
          >
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
        <div v-if="!user.email" class="lineTransition" @click="login()">
          <div class="navMenuItem">
            <Icons class="icon navMenuItemIcon" icon="login" />
            <span>Entrar</span>
          </div>
        </div>
        <v-menu v-if="user.email" open-on-hover bottom offset-y flat transition="scroll-y-transition">
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

          <v-list
            class="sobreMenu"
            flat
            color="#2F3B47dd"
          >
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
      showTabela: false,
      showTrocas: false,
      scrolled: false,
      user: {
        email: ""
      },
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    goToNovidades() {
      console.log("novidades");
    },

    login() {
      this.$router.push("/autenticar")
    },

    logout() {
      console.log("logout");
    },

    onScroll(e) {
      this.scrolled = window.top.scrollY > 50 ? true : false;
    },
    getMensagem() {
      return "oi";
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
</style>
