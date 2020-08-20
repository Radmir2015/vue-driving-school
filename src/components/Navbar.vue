<template>
<nav>
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

    <v-app-bar app color="green darken-2" dark>
        <!-- <v-container class="d-inline-flex align-baseline"> -->
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <!-- <v-toolbar-title class="d-inline-flex"> -->
        <v-container class="pa-0 px-5 text-truncate fitcontent">
            <span class="text-h5 font-weight-bold">ДОСААФ</span> <span class="text-h5 font-weight-light">Каменка</span>
        </v-container>
        <!-- </v-toolbar-title> -->

        <!-- </v-container> -->
        <!-- <v-spacer></v-spacer> -->
        <!-- <v-card> -->
          <!-- <v-tabs centered class="hidden-sm-and-down">
              <v-tab>Главная</v-tab>
              <v-tab>Об автошколе</v-tab>
              <v-tab>Документы</v-tab>
          </v-tabs> -->
        <!-- </v-card> -->

        <v-spacer></v-spacer>
        <v-container class="d-inline-flex fitcontent">
            <v-btn text class="hidden-sm-and-down" router to="/about">Автошкола</v-btn>
            <v-btn text class="hidden-sm-and-down">Документы</v-btn>
        <!-- <v-spacer></v-spacer> -->
            <v-btn text class="hidden-sm-and-down">Положения</v-btn>
            <Dropdown header="Категории" :items="dropdownItems"/>
            <v-btn text class="hidden-xs-only">
                Вход
                <v-icon right>mdi-login-variant</v-icon>
            </v-btn>
        </v-container>
    </v-app-bar>
</nav>
</template>

<script>
import Dropdown from './Dropdown'

export default {
    components: {
      Dropdown,
    },
    data: () => ({
        drawer: false,
        sideMenuItems: [
          { title: 'Home', icon: 'mdi-home', route: '/' },
          { title: 'Contact', icon: 'mdi-email', route: '/contact' },
        ],
        dropdownItems: [
            { title: 'Категория А', route: '/category#A' },
            { title: 'Категория B', route: '/category#B' },
            { title: 'Категория C', route: '/category#C' },
            { title: 'Категория BC', route: '/category#BC' },
        ]
    })
}
</script>

<style>
.fitcontent {
    max-width: fit-content !important;
}
</style>