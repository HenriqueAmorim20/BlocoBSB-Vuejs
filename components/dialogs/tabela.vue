<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card color="#2e5870">
      <v-toolbar
        dense
        color="#2e5870"
        flat
        style="border-bottom: 1px solid #ffffff44; margin-bottom: 10px"
      >
        <v-toolbar-title> Tabela de Tamanhos </v-toolbar-title>
        <v-spacer />
        <v-btn icon dark @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <v-img
          :src="require('../../assets/tabela/tabela.png')"
          max-width="500"
        />
      </v-container>
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
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
