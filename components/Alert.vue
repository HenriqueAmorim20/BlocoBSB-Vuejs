
<template>
  <v-snackbar v-model="show" :color="color" elevation="6" app>
    <v-row align="center">
      <v-col>
        <Icons class="alertIcon" :icon="icon"/>
      </v-col>
      {{ message }}
      <v-spacer />
      <v-col  @click="show = false">
        <Icons class="icon" icon="close"/>
      </v-col>
    </v-row>
  </v-snackbar>
</template>

<script>

import Icons from '~/components/icons.vue'

export default {
  components: {
    Icons
  },
  data () {
    return {
      show: false,
      message: '',
      color: '',
      icon: '',
    }
  },

  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'alert/showMessage') {
        if (state.alert) {
          this.message = state?.alert?.content
          this.color = state?.alert?.color
          this.icon = state?.alert?.icon
          this.show = true
        }
      }
    })
  },
}
</script>

<style scoped>
  .icon {
    width: 20px;
    cursor: pointer;
    transition: 0.3s all ease;
  }

  .icon:hover {
    background: #8d8d8d54;
    border-radius: 40%;
    transition: 0.3s all ease;
  }

  .alertIcon {
    width: 25px;
    background: transparent !important;
  }

</style>
