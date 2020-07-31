<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense rounded>
        <v-list-item v-for="sideMenuItem in sideMenuItems" :key="sideMenuItem.title" router :to="sideMenuItem.route">
          <v-list-item-action>
            <v-icon>{{ sideMenuItem.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ sideMenuItem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="text-h5 font-weight-bold">ДОСААФ</span> <span class="text-h5 font-weight-light">Каменка</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">ДОСААФ &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
// import Home from "./components/Home";

export default {
  name: "App",

  components: {
    // Home,
  },

  data: () => ({
    drawer: false,
    sideMenuItems: [
      { title: 'Home', icon: 'mdi-home', route: '/' },
      { title: 'Contact', icon: 'mdi-email', route: '/contact' },
    ]
  })
};
</script>
