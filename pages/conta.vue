<template>
  <v-container>
    <v-row justify="center" align="center" style="min-height: 90vh">
      <v-col align="center">
        <v-card tile class="card">
          <v-col style="display: flex; align-itens: center; flex-wrap: wrap">
            <span class="title">Olá, {{ nome }}</span>
            <v-spacer />
            <div class="lineTransition" @click="logout()">
              <div class="logout">
                <Icons class="icon" icon="loginPreto" />
                <span>Logout</span>
              </div>
            </div>
          </v-col>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="black"
            grow
            height="30px"
          >
            <v-tab class="tab">Meus dados</v-tab>
            <v-tab class="tab">Meus pedidos</v-tab>
            <v-tab v-if="admin" class="tab">Mensagens</v-tab>
            <v-tab v-if="admin" class="tab">Newsletter</v-tab>
          </v-tabs>
          <v-tabs-items
            v-model="tab"
            style="background: transparent !important; margin-top: 15px"
          >
            <v-tab-item>
              <v-col align="start">
                <span class="text"
                  ><b>Email autenticado:</b> {{ user.email }}</span
                >
              </v-col>
              <v-col>
                <v-form @submit.prevent="salvar()">
                  <v-row class="linha">
                    <v-col align="start">
                      <span>Nome *</span>
                      <v-text-field
                        v-model="nome"
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
                        v-model="telefone"
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
                      <v-btn tile class="btn" dark type="submit">Salvar</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-tab-item>
            <v-tab-item>
              Em breve você também poderá vizualizar e gerenciar seus pedidos
              por aqui :)
            </v-tab-item>
            <v-tab-item>
              <v-data-table
                :headers="headersMensagens"
                :items="mensagens"
                item-key="_id"
                :items-per-page="10"
                light
                style="background: transparent !important"
                :footer-props="{
                  showFirstLastPage: true,
                  firstIcon: 'mdi-arrow-collapse-left',
                  lastIcon: 'mdi-arrow-collapse-right',
                  prevIcon: 'mdi-arrow-left',
                  nextIcon: 'mdi-arrow-right',
                }"
              >
              </v-data-table>
            </v-tab-item>
            <v-tab-item>
              <v-data-table
                :headers="headersNewsletters"
                :items="newsletters"
                item-key="_id"
                :items-per-page="10"
                light
                style="background: transparent !important"
                :footer-props="{
                  showFirstLastPage: true,
                  firstIcon: 'mdi-arrow-collapse-left',
                  lastIcon: 'mdi-arrow-collapse-right',
                  prevIcon: 'mdi-arrow-left',
                  nextIcon: 'mdi-arrow-right',
                }"
              >
                <template #[`item.actions`]="{ item }">
                  <v-icon @click="copy(item.email)">
                    mdi-clipboard-multiple-outline
                  </v-icon>
                </template>
              </v-data-table>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Icons from "~/components/icons.vue";

export default {
  components: {
    Icons,
  },
  data() {
    return {
      tab: null,
      admin: false,
      mensagens: null,
      newsletters: null,
      user: {
        nome: null,
        email: null,
        telefone: null,
      },
      telefone: null,
      nome: null,
    };
  },
  created() {
    this.$store.dispatch("auth/GET").then((res) => {
      if (res.user) {
        this.admin = res.isAdmin;
        this.getUser(res.user._id);
      } else return this.$router.push("/autenticar");
    });
    this.getElements();
  },
  computed: {
    headersMensagens() {
      return [
        {
          text: "Nome",
          align: "start",
          value: "nome",
          width: "20%",
        },
        {
          text: "Email",
          align: "start",
          value: "email",
          width: "20%",
        },
        {
          text: "Assunto",
          align: "start",
          value: "assunto",
          width: "20%",
        },
        {
          text: "Mensagem",
          align: "start",
          value: "mensagem",
          width: "40%",
        },
      ];
    },
    headersNewsletters() {
      return [
        {
          text: "Email",
          align: "start",
          value: "email",
        },
        { text: "Opções", value: "actions", width: "100px", sortable: false },
      ];
    },
  },
  methods: {
    async getUser(id) {
      try {
        this.user = await this.$axios.$get("/user/" + id);
        this.telefone = this.user.telefone;
        this.nome = this.user.nome;
      } catch (error) {
        this.$alert.error("Não foi possível carregar o perfil!");
      }
    },
    async getElements() {
      try {
        this.mensagens = await this.$axios.$get("/feedback");
        this.mensagens = this.mensagens.feedbacks;
      } catch (error) {
        this.$alert.error("Não foi possível carregar os feedbacks!");
      }
      try {
        this.newsletters = await this.$axios.$get("/newsletter");
        this.newsletters = this.newsletters.newsletters;
      } catch (error) {
        this.$alert.error("Não foi possível carregar os inscritos!");
      }
    },

    async salvar() {
      if (!this.nome) return this.$alert.info("Campos obrigatórios inválidos!");
      if (this.nome === this.user.nome && this.telefone === this.user.telefone)
        return this.$alert.info("Dados não alterados!");
      try {
        await this.$axios.$patch(`/user/${this.user._id}`, {
          updates: [
            {
              chave: "telefone",
              valor: this.telefone,
            },
            {
              chave: "nome",
              valor: this.nome,
            },
          ],
        });
        this.$alert.success("Dados atualizados!");
      } catch (error) {
        this.$alert.error("Não foi possível atualizar seus dados!");
      }
    },

    logout() {
      this.$store.dispatch("auth/LOGOUT").then((res) => {
        if (res) {
          this.$router.push("/");
          this.$alert.success("Logout feito com sucesso!");
        }
      });
    },

    copy(email) {
      try {
        const selBox = document.createElement("textarea");
        selBox.style.position = "fixed";
        selBox.style.left = "0";
        selBox.style.top = "0";
        selBox.style.opacity = "0";
        selBox.value = email;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand("copy");
        document.body.removeChild(selBox);
        this.$alert.success(`${email} foi copiado para o clipboard.`);
      } catch (error) {
        this.$alert.error("Não foi possível copiar este email.");
      }
    },
  },
};
</script>

<style scoped>
.card {
  color: black;
  min-height: 50vh;
  max-width: 700px;
  background-color: rgba(255, 255, 255, 0.5);
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
  font-size: 1.3rem !important;
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
  box-shadow: inset 0px 0px 0px #2f3b47;
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
