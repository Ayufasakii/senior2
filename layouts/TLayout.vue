<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color=#8c1515
      dark
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <mfu-logo />
      <v-toolbar-title v-text="title" />
      <v-spacer />
            <v-btn depressed color=#8c1515 to="/" nuxt>
                <v-icon left>mdi-logout</v-icon>Logout
            </v-btn>
    </v-app-bar>
 
        <nuxt />

    <v-footer
      :absolute="!fixed"
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
.nuxt-link {
    text-decoration: none;
}
</style>

<script>
import MFULogo from '~/components/MFULogo.vue'
export default {
    components: {
    MFULogo
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/Teacher/Home'
        },
        {
          icon: 'mdi-account',
          title: 'Profile',
          to: '/Teacher/Profile'
        },
        {
          icon: 'mdi-file-plus',
          title: 'Create Visit form',
          to: '/Teacher/VisitForm'
        },
        {
          icon: 'mdi-file-plus',
          title: 'Create Cost form',
          to: '/Teacher/CostFrom'
        },
        {
          icon: 'mdi-form-select',
          title: 'Cost form Information',
          to: '/Teacher/CostFormIn'
        },
        {
          icon: 'mdi-form-select',
          title: 'Visit form information',
          to: '/Teacher/VisitFormIn'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Mae Fah Luang University'
    }
  }
}
</script>
