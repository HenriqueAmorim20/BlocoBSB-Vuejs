<template>
  <v-footer class="footer">
    <v-row>
      <v-col>
        <v-img
          :src="require('../assets/logo/logoPrincipal.png')"
          class="imgLogo"
          max-width="180px"
        />
      </v-col>
      <v-col class="section" style="min-width: 200px; max-width: 200px">
        <p>Instituicional</p>
        <NuxtLink class="clickable" to="/sobre" link>Sobre a bloco</NuxtLink>
        <NuxtLink class="clickable" to="/contato" link>Contato</NuxtLink>
        <span class="clickable" @click="showTrocas = true"
          >Trocas e Devoluções</span
        >
        <span class="clickable" @click="showTabela = true"
          >Tabela de Tamanhos</span
        >
      </v-col>
      <v-col class="section">
        <p>Pagamento</p>
        <div style="display: flex">
          <Icons class="icon" icon="pagamento" />
          <span> Transferência via TED ou PIX </span>
        </div>
        <div style="display: flex">
          <Icons class="icon" icon="entrega" />
          <span>Entrega entre 2 e 5 dias úteis</span>
        </div>
      </v-col>
      <v-col class="section">
        <p>Segurança</p>
        <span>Ambiente 100% Seguro</span>
        <span>Sua Informação é Protegida Pela Criptografia SSL 256-Bit.</span>
      </v-col>
      <v-col style="min-width: 150px">
        <v-row align="center">
          <a
            :href="'https://wa.me/5561981889864?text=' + getMensagem()"
            target="_blank"
          >
            <Icons class="mediaIcon" icon="wpp" />
          </a>
          <a href="https://instagram.com/bloco.bsb" target="_blank">
            <Icons class="mediaIcon" icon="insta" />
          </a>
          <v-spacer />
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-row>
          <v-col align="center">
            <span class="newsletterTitle">Assine nossa NewsLetter!</span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <input
            class="emailInput"
            type="text"
            placeholder="Insira seu email..."
            v-model="email"
          />
          <v-btn
            tile
            height="35px"
            dark
            class="participar"
            @click="cadastrarEmail()"
            >Participar</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
    <v-row class="upperLine">
      <v-col style="min-width: 200px">
        <span>&copy; {{ new Date().getFullYear() }} BlocoBSB v2.0</span>
      </v-col>
      <v-spacer />
      <v-col style="min-width: 200px">
        <a
          href="https://www.linkedin.com/in/henriqueamorim20/"
          target="_blank"
          style="text-decoration: none; color: #fff"
        >
          <v-row>
            <v-spacer />
            <Icons class="icon" icon="linkedin" />
            <span>henriqueamorim20</span>
          </v-row>
        </a>
      </v-col>
    </v-row>
    <TabelaTamanhos v-model="showTabela" />
    <Trocas v-model="showTrocas" />
  </v-footer>
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
      user: null,
      showTabela: false,
      showTrocas: false,
      email: null,
    };
  },
  created() {
    this.$store.dispatch("auth/GET").then((res) => {
      if (res.user) {
        this.user = res.user;
      }
    });
  },
  methods: {
    getMensagem() {
      let mensagem = "Olá, tudo bem? ";
      if (this.user) mensagem += `Me chamo ${this.user.nome}! `;
      mensagem += `Gostaria de tirar algumas dúvidas :)`;
      return mensagem;
    },

    async cadastrarEmail() {
      if (
        !this.email ||
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
      )
        return this.$alert.info("Insira um email válido!");
      try {
        await this.$axios.$post("/newsletter", { email: this.email });
        this.$alert.success("Agora você receberá nossas novidades!");
      } catch (error) {
        this.$alert.error("Email já cadastrado!");
      }
    },
  },
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
  text-decoration: none;
  color: white;
  margin: 0;
}

.clickable:hover {
  color: #518fb8;
}

.footer {
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  background-color: rgb(0, 0, 0) !important;
}

.section {
  display: flex;
  flex-direction: column;
  min-width: 260px;
  max-width: 260px;
  margin: 0.5rem 1rem;
}

.section p {
  color: gray;
  font-weight: 500;
}

.section span {
  font-weight: 400;
  margin: 0.3rem 0;
}

.imgLogo {
  border: 1px solid black;
  margin-left: 15px;
  background-color: #ffffffc2;
}
.icon {
  margin-right: 7px;
  width: 20px;
}

.mediaIcon {
  width: 60px;
  cursor: pointer;
  padding: 8px;
  margin-top: 20px;
}

.mediaIcon:hover {
  background: rgba(128, 128, 128, 0.383);
  border-radius: 50%;
}

.upperLine {
  border-top: 0.5px solid rgba(255, 255, 255, 0.459);
  width: 99%;
  align-items: center;
}

.emailInput {
  background-color: rgba(255, 255, 255, 0.226);
  color: white;
  width: 250px;
  height: 35px;
  padding: 2px 10px;
  font-size: 14px;
}

.emailInput:focus {
  outline: none;
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

.newsletterTitle {
  font-size: 1.2rem;
  font-weight: 300;
  /* border-left: 9px solid white; */
  padding: 0 12px;
}

.participar {
  margin: 1rem;
  width: 200px;
  box-shadow: inset 0px 0px 0px #2f3b47;
  transition: all 0.5s !important;
}
.participar:hover {
  box-shadow: inset 250px 0px 0px #518fb8;
}
</style>
