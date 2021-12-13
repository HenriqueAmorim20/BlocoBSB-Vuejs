<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <v-card tile class="card">
          <v-col align="start">
            <span class="title">Mande uma mensagem!</span>
          </v-col>
          <v-col>
            <v-form @submit.prevent="enviarMensagem()">
              <v-row v-if="!user" class="linha">
                <v-col align="start">
                  <span>Email *</span>
                  <v-text-field
                    v-model="formulario.email"
                    clearable
                    filled
                    dense
                    solo
                    tile
                    background-color="#00000022"
                    color="white"
                    placeholder="joseribeiro@gmail.com"
                    required
                    class="formfield"
                  />
                </v-col>
                <v-col align="start">
                  <span>Nome</span>
                  <v-text-field
                    v-model="formulario.nome"
                    clearable
                    filled
                    dense
                    solo
                    background-color="#00000022"
                    color="white"
                    placeholder="José Ribeiro da Silva"
                    class="formfield"
                  />
                </v-col>
              </v-row>
              <v-row class="linha">
                <v-col align="start">
                  <span>Assunto</span>
                  <v-text-field
                    v-model="formulario.assunto"
                    clearable
                    filled
                    dense
                    solo
                    background-color="#00000022"
                    color="white"
                    placeholder="Compra de camisetas"
                    class="formfield"
                  />
                </v-col>
              </v-row>
              <v-row class="linha">
                <v-col align="start">
                  <span>Mensagem *</span>
                  <v-textarea
                    v-model="formulario.mensagem"
                    filled
                    background-color="#00000022"
                    color="white"
                    placeholder="Olá, tudo bem? gostaria de saber se é possível comprar várias camisetas de uma vez."
                    clearable
                    solo
                    required
                    class="formfield"
                  />
                </v-col>
              </v-row>
              <v-row class="linha">
                <v-col align="end">
                  <v-btn tile class="btn" dark type="submit">Enviar</v-btn>
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
      user: {
        nome: "Henrique",
        email: "hacmelo@gmail.com",
      },
      formulario: {
        email: null,
        nome: null,
        assunto: null,
        mensagem: null,
      },
    };
  },

  created() {
    if (this.user) {
      this.formulario.email = this.user.email;
      this.formulario.nome = this.user.nome;
    }
  },
  methods: {
    enviarMensagem() {
      if (!this.validateForm())
        return this.$alert.info("Campos obrigatórios incorretos!");
      try {
        this.$alert.success("Obrigado pela sua mensagem!");
      } catch (error) {
        this.$alert.error("Não foi possível enviar sua mensagem!");
      }
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
  background-color: rgba(255, 255, 255, 0.226);
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

.formfield {
  min-width: 220px;
  margin-top: 6px;
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
