<template>
  <v-container>
    <v-row justify="center" align="center" style="min-height : 90vh">
      <v-col align="center">
        <v-card tile class="card">
          <v-col align="start">
            <span class="title">Contato</span>
          </v-col>
          <v-col>
            <v-form @submit.prevent="enviarMensagem()">
              <v-row v-if="!user" class="linha">
                <v-col align="start">
                  <span class="label">Email *</span>
                  <v-text-field
                    v-model="formulario.email"
                    class="rounded-0 preencher"
                    clearable
                    filled
                    dense
                    solo
                    hide-details
                    background-color="#00000022"
                    color="#000"
                    light
                    placeholder="joseribeiro@gmail.com"
                    required
                  />
                </v-col>
                <v-col align="start">
                  <span class="label">Nome</span>
                  <v-text-field
                    v-model="formulario.nome"
                    class="rounded-0 preencher"
                    clearable
                    filled
                    dense
                    solo
                    hide-details
                    background-color="#00000022"
                    color="#000"
                    light
                    placeholder="José Ribeiro da Silva"
                  />
                </v-col>
              </v-row>
              <v-row class="linha">
                <v-col align="start">
                  <span class="label">Assunto</span>
                  <v-text-field
                    v-model="formulario.assunto"
                    class="rounded-0 preencher"
                    clearable
                    filled
                    dense
                    solo
                    hide-details
                    background-color="#00000022"
                    color="#000"
                    light
                    placeholder="Compra de camisetas"
                  />
                </v-col>
              </v-row>
              <v-row class="linha">
                <v-col align="start">
                  <span class="label">Mensagem *</span>
                  <v-textarea
                    v-model="formulario.mensagem"
                    class="rounded-0 preencher"
                    clearable
                    filled
                    dense
                    solo
                    hide-details
                    background-color="#00000022"
                    color="#000"
                    light
                    placeholder="Olá, tudo bem? gostaria de saber se é possível comprar várias camisetas de uma vez."
                    required
                  />
                </v-col>
              </v-row>
              <v-row class="linha">
                <v-col align="end">
                  <v-btn :loading="loading" tile class="btn" dark type="submit">Enviar</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      user: null,
      formulario: {
        email: null,
        nome: null,
        assunto: null,
        mensagem: null,
      },
    };
  },

  created() {
    this.$store.dispatch("auth/GET").then((res) => {
      if (res.user) {
        this.user = res.user;
        this.formulario.email = this.user.email;
        this.formulario.nome = this.user.nome;
      }
    });
  },
  watch: {
    "$store.state.auth.user": function () {
      this.user = this.$store.state.auth.user;
      this.formulario.email = this.user?.email;
      this.formulario.nome = this.user?.nome;
    },
  },
  methods: {
    async enviarMensagem() {
      if (!this.validateForm())
        return this.$alert.info("Campos obrigatórios incorretos!");
        this.loading = true
      try {
        await this.$axios.$post("/feedback", this.formulario);
        this.$alert.success("Obrigado pela sua mensagem!");
        this.formulario = {
          assunto: null,
          mensagem: null,
        };
      } catch (error) {
        this.$alert.error("Não foi possível enviar sua mensagem!");
      }
      this.loading = false
    },

    validateForm() {
      return (
        this.formulario.mensagem &&
        this.formulario.email &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          this.formulario.email
        ) &&
        this.formulario.mensagem.length > 3
      );
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 700px;
  background-color: rgba(255, 255, 255, 0.657);
  margin: 1rem 0;
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

.linha {
  color: black;
}

.linha span {
  font-weight: 300;
  color: #000;
}

.label {
  display: flex;
  align-items: center;
  background: #0000008f;
  color: #fff !important;
  padding: 0rem 0.7rem;
  width: fit-content !important;
  height: 30px;
  margin-top: 6px;
}

.preencher {
  min-width: 220px;
  margin-bottom: 6px;
  width: 100% !important;
}

.btn {
  width: 200px;
  box-shadow: inset 0px 0px 0px #2f3b47;
  transition: all 0.5s !important;
}
.btn:hover {
  box-shadow: inset 250px 0px 0px #518fb8;
}
</style>
