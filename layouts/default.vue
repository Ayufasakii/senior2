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
 
    <v-main >
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

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
