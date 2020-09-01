<template>
  <v-app id="inspire">
    <v-app-bar
      color=#8c1515
      dark
      :clipped-left="clipped"
      fixed
      app
    >
      <mfu-logo />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
 
        <nuxt />
        
    <v-footer
      :absolute="fixed"
      color=#8c1515
      dark
      app
    >
    <v-toolbar-title v-text="title" />
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    
  </v-app>
</template>

<style>
</style>

<script>
import MFULogo from '~/components/MFULogo.vue'
export default {
    components: {
    MFULogo
  },
  data () {
    return {
      title: 'Mae Fah Luang University'
    }
  }
}
</script>
