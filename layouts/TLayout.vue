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
      <nuxt-link class="nuxt-link" to="/">
            <v-btn depressed color=#8c1515>
                <v-icon left>mdi-logout</v-icon>Logout
            </v-btn>
      </nuxt-link>
    </v-app-bar>
 
    <v-main >
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

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
          to: '/Staff/Home'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Mae Fah Luang University'
    }
  }
}
</script>
