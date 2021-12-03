<template>
  <div>
    <v-app-bar
      style="background: #000000ff !important; z-index: 10"
      max-height="55px"
      min-height="55px"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-row>
        <input
          class="searchInput"
          type="text"
          placeholder="Pesquise seu produto..."
        />
        <Icons class="icon" icon="search" />
      </v-row>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="drawer"
      absolute
      temporary
      clipped
      width="250px"
      style="background: #000000ff !important; margin-top: 55px"
    >
      <v-list app>
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
                <Icons class="icon" icon="sobre"/>
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
          <v-list-item v-if="!logado" link class="menuItem" @click="login()">
            <v-list-item-action>
              <Icons class="icon" icon="login" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <span class="text">Entrar</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="logado" to="/conta" link class="menuItem">
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
      logado: true,
      email: "hacmelo@gmail.com",
    };
  },
  methods: {
    goToNovidades() {
      console.log("aqui");
    },

    login() {
      console.log("login");
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
  border-radius: 5px;
  width: 85%;
  height: 30px;
  padding: 2px 10px;
  margin-right: 5px;
  font-size: 14px;
}

.searchInput:focus {
  outline: none;
}
</style>
