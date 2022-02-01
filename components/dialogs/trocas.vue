<template>
  <v-dialog v-model="show" scrollable max-width="700px">
    <v-card color="#2e5870">
      <v-toolbar color="#2e5870" flat style="border-bottom: 1px solid #ffffff44;">
        <v-toolbar-title>
          Trocas e devoluções
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          @click="show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text style="margin-top: 15px">
        <p>Por favor, para evitar trocas e devoluções, caso não tenha certeza sobre um produto ou tenha alguma dúvida, entre em contato conosco: </p>
        <div>
            <span>WhatsApp: (61) 9368-7754</span>
            <span>Instagram: @bloco.bsb</span>
            <span>E-mail: blocobsb@gmail.com</span>
        </div>

        <p>Regras para trocas e devoluções </p>
        <ol>
            <li>O produto NÃO pode ter nenhum indício de uso, como manchas, odor ou qualquer avaria que decorra do uso;</li>
            <li>O prazo para trocas é de 10 dias corridos a partir do recebimento do produto;</li>
            <li>O prazo para devoluções é de 7 dias corridos a partir do recebimento do produto;</li>
            <li>Em caso de defeito de fabricação, o prazo para trocas ou devoluções é de 30 dias corridos a partir do recebimento do produto.</li>
        </ol>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      },
    },
  }
}
</script>
