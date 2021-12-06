<template>
  <v-row>
    <v-col align="center">
      <v-card class="card">
        <v-col style="display: flex; align-itens: center; flex-wrap: wrap">
          <span class="title">Olá, {{user.nome}}</span>
          <v-spacer />
          <div class="lineTransition" @click="logout()">
            <div class="logout">
              <Icons class="icon" icon="loginPreto" />
              <span>Logout</span>
            </div>
          </div>
        </v-col>
        <v-tabs v-model="tab" background-color="transparent" color="black" grow height="30px">
          <v-tab class="tab">Meus dados</v-tab>
          <v-tab class="tab">Meus pedidos</v-tab>
          <v-tab v-if="admin" class="tab">Mensagens</v-tab>
          <v-tab v-if="admin" class="tab">Newsletter</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" style="background: transparent !important; margin-top: 15px">
          <v-tab-item>
            <v-col align="start">
              <span class="text"><b>Email autenticado:</b> {{user.email}}</span>
            </v-col>
            <v-col>
              <v-form @submit.prevent="salvar()">
                <v-row class="linha">
                  <v-col align="start">
                    <span>Nome *</span>
                    <v-text-field
                      v-model="user.nome"
                      clearable
                      filled
                      dense
                      background-color="#00000022"
                      color="white"
                      required
                      class="formfield"
                    />
                  </v-col>
                  <v-col align="start">
                    <span>Telefone</span>
                    <v-text-field
                      v-model="user.telefone"
                      clearable
                      filled
                      dense
                      background-color="#00000022"
                      color="white"
                      placeholder="61 985270234"
                      class="formfield"
                    />
                  </v-col>
                </v-row>
                <v-row class="linha">
                  <v-col align="end">
                    <v-btn class="btn" dark type="submit">Salvar</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-tab-item>
          <v-tab-item>
            Em breve você também poderá vizualizar e gerenciar seus pedidos por aqui :)
          </v-tab-item>
          <v-tab-item>
            Mensagens
          </v-tab-item>
          <v-tab-item>
            Newsletter
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import Icons from "~/components/icons.vue";

export default {
  components: {
    Icons
  },
  data() {
    return {
      tab: null,
      admin: false,
      user: {
        email: 'hacmelo@gmail.com',
        nome: 'Henrique Amorim',
        telefone: '61 985270234',
      }
    }
  },
  methods: {
    salvar () {
      if (!this.user.nome) return this.$alert.info('Campos obrigatórios inválidos!')
      try {
        console.log(this.user)
        this.$alert.success('Dados atualizados!')
      } catch (error) {
        this.$alert.error('Não foi possível atualizar seus dados!')
      }
    },

    logout () {
      console.log('logout')
    }
  }
}
</script>

<style scoped>
.card {
  color: black;
  min-height: 50vh;
  max-width: 700px;
  background: rgba(255, 255, 255, 0.705);
  margin: 1rem 0;
}

.logout {
  display: flex;
  color: black;
  align-items: center;
  cursor: pointer;
}

.lineTransition {
  margin: 0 0.5rem;
  display: inline-block;
  width: fit-content;
}

.lineTransition:after {
  display: flex;
  content: "";
  border-bottom: solid 1px #000;
  transform: scaleX(0);
  transition: transform 250ms ease-in-out;
}
.lineTransition:hover:after {
  transform: scaleX(1);
}

.icon {
  width: 25px;
  margin-right: 10px;
}

.title {
  text-align: center;
  font-size: 1.3rem;
  font-weight: 300;
  border-left: 9px solid #000;
  color: #000;
  padding: 0 12px;
  margin: 0rem 0.5rem 1rem;
  min-width: 220px;
}

.text {
  text-align: center;
  font-size: 1rem;
  font-weight: 300;
  color: #000;
}

.linha {
  color: black;
  margin: 0 !important;
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
  box-shadow: inset 0px 0px 0px #2F3B47;
  transition: all 0.5s !important;
}
.btn:hover {
  box-shadow: inset 250px 0px 0px #518fb8;
}

.tab {
  color: #000 !important;
  font-weight: 300 !important;
  text-align: center !important;
}
</style>
