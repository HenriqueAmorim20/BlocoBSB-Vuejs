<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col justify="center" align="center">
        <v-card tile class="card">
          <v-row>
            <v-col align="start">
              <span class="title">Conecte-se aqui!</span>
            </v-col>
          </v-row>
          <v-form v-if="!idform" @submit.prevent="fazerLogin()">
            <v-row justify="center" class="formfield">
              <span class="label">Email</span>
              <v-text-field
                v-model="login.email"
                class="rounded-0 preencher"
                clearable
                filled
                dense
                solo
                hide-details
                background-color="#00000022"
                color="#fff"
                placeholder="joseribeiro@gmail.com"
                type="text"
              />
            </v-row>
            <v-row justify="center" class="formfield">
              <span class="label">Senha</span>
              <v-text-field
                v-model="login.senha"
                class="rounded-0 preencher"
                clearable
                filled
                dense
                solo
                background-color="#00000022"
                color="#fff"
                hide-details
                placeholder="*******"
                type="password"
              />
            </v-row>
            <v-row>
              <v-col align="start" style="margin: 0 1rem !important">
                <v-checkbox
                  v-model="login.lembrar"
                  dense
                  hide-details
                  color="#000"
                  light
                  label="Lembre-se de mim"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col align="center" @click="idform = 1">
                <span class="link">Não possui conta? Cadastre-se aqui!</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="end">
                <v-btn tile class="btn" dark type="submit">Entrar</v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-form v-if="idform" @submit.prevent="cadastro()">
            <v-row justify="center" class="formfield">
              <span class="label">Email</span>
              <v-text-field
                v-model="registro.email"
                class="rounded-0 preencher"
                clearable
                filled
                dense
                solo
                background-color="#00000022"
                color="#fff"
                hide-details
                placeholder="joseribeiro@gmail.com"
                type="text"
              />
            </v-row>
            <v-row justify="center" class="formfield">
              <span class="label">Nome</span>
              <v-text-field
                v-model="registro.nome"
                class="rounded-0 preencher"
                clearable
                filled
                dense
                solo
                background-color="#00000022"
                color="#fff"
                hide-details
                placeholder="José Ribeiro"
                type="text"
              />
            </v-row>
            <v-row justify="center" class="formfield">
              <span class="label">Senha</span>
              <v-text-field
                v-model="registro.senha"
                class="rounded-0 preencher"
                clearable
                filled
                dense
                solo
                background-color="#00000022"
                color="#fff"
                hide-details
                placeholder="******"
                type="password"
              />
            </v-row>
            <v-row justify="center" class="formfield">
              <span class="label">Confirme</span>
              <v-text-field
                v-model="registro.confirmarSenha"
                class="rounded-0 preencher"
                clearable
                filled
                dense
                solo
                background-color="#00000022"
                color="#fff"
                hide-details
                placeholder="******"
                type="password"
              />
            </v-row>
            <v-row>
              <v-col align="center" @click="idform = 0">
                <span class="link">Já possui conta? Faça login aqui!</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="end">
                <v-btn tile class="btn" dark type="submit">Cadastrar-se</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      idform: 0,
      login: {
        email: null,
        senha: null,
        lembrar: false,
      },
      registro: {
        nome: null,
        email: null,
        senha: null,
        confirmarSenha: null,
      },
    };
  },
  methods: {
    fazerLogin() {
      if (!this.login.email || !this.login.senha)
        return this.$alert.info("Campos obrigatórios não preenchidos!");
      console.log(this.login);
    },

    cadastro() {
      if (
        !this.registro.email ||
        !this.registro.senha ||
        !this.registro.nome ||
        !this.registro.confirmarSenha
      )
        return this.$alert.info("Campos obrigatórios não preenchidos!");
      console.log(this.registro);
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 500px;
  background-color: rgba(255, 255, 255, 0.226);
  padding: 1rem;
  margin: 1rem 0;
  color: #000;
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

.formfield {
  display: flex !important;
  flex-direction: column;
  align-items: start !important;
  margin: 2rem 0.5rem 0 !important;
  padding: 0 !important;
}

.formfield:focus {
  outline: none;
}

.label {
  display: flex;
  align-items: center;
  background: #0000008f;
  color: #fff;
  padding: 0rem 0.7rem;
  width: fit-content !important;
  height: 30px;
  /* box-shadow: 1px 1px 2px black; */
}
.preencher {
  width: 100% !important;
}

.link {
  text-decoration: underline;
  color: #000;
  cursor: pointer;
}

.btn {
  margin: 1rem 0 0;
}
</style>
