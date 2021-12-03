
<template>
  <v-snackbar v-model="show" :color="color" right elevation="6" app>
    <v-row justify="center" align="center" style="padding: 1rem 0.5rem 1rem 1.5rem;">
      <Icons class="alertIcon" :icon="icon"/>
      <span style="font-size: 1.1rem">
        {{ message }}
      </span>
      <v-spacer />
      <div  @click="show = false">
        <Icons class="icon" icon="close"/>
      </div>
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
    width: 25px;
    margin-left: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s all ease;
  }

  .icon:hover {
    background: #8d8d8d54;
    border-radius: 40%;
    transition: 0.3s all ease;
  }

  .alertIcon {
    width: 25px;
    margin-right: 15px;
    background: transparent !important;
  }

</style>
