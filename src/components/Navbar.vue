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
      <v-list dense rounded>
        <v-list-item>
      <v-switch
        v-model="darkTheme"
        @click="changeTheme"
        color="success"
        hide-details
        class="ma-auto d-flex"
      >
        <template slot="label">
          <span class="text-button">Тёмная тема</span>
        </template>
      </v-switch>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="green darken-2" dark src="https://images.wallpaperscraft.ru/image/kamufliazh_militari_uzory_128422_2400x2560.jpg">
        <!-- <v-container class="d-inline-flex align-baseline"> -->
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <!-- <v-toolbar-title class="d-inline-flex"> -->
        <v-container class="pa-0 px-5 text-truncate fitcontent">
          <router-link to="/about" style="text-decoration: none; color: inherit">
            <span class="text-h5 font-weight-bold">ДОСААФ</span> <span class="text-h5 font-weight-light">Каменка</span>
          </router-link>
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
            <v-btn text class="hidden-sm-and-down" router to="/docs">Документы</v-btn>
        <!-- <v-spacer></v-spacer> -->
            <v-btn text class="hidden-sm-and-down" router to="/events">События</v-btn>
            <Dropdown header="Категории" :items="dropdownItems"/>
            <Login/>
        </v-container>
    </v-app-bar>
    <v-snackbar
      v-model="snackbar"
      rounded
      :top="$vuetify.breakpoint.xs"
      timeout="7000"
      transition="slide-y-reverse-transition"
    >
      <p class="text-body-1 text-sm-h6 pa-0 ma-0 text-center font-weight-light">
        {{ congratsMessage() }}
      </p>

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
</nav>
</template>

<script>
import Dropdown from './Dropdown'
import Login from './Login'

export default {
    components: {
      Dropdown, Login
    },
    data: () => ({
        foundationYear: 1955,
        drawer: false,
        darkTheme: false,
        snackbar: false,
        sideMenuItems: [
          { title: 'Об автошколе', icon: 'mdi-domain', route: '/about' },
          { title: 'Документы', icon: 'mdi-file', route: '/docs' },
          { title: 'Мероприятия', icon: 'mdi-calendar-text', route: '/events' },
          { title: 'Отзывы', icon: 'mdi-comment-quote-outline', route: '/reviews' },
        ],
        dropdownItems: [
            { title: 'Категория А', route: '/category#A' },
            { title: 'Категория B', route: '/category#B' },
            { title: 'Категория C', route: '/category#C' },
            { title: 'Категория BC', route: '/category#BC' },
        ]
    }),
    mounted() {
      this.darkTheme = localStorage.getItem('theme') === 'dark'
      this.snackbar = !!this.congratsMessage()
    },
    methods: {
      changeTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        localStorage.setItem('theme', this.$vuetify.theme.dark ? 'dark' : 'light')
      },
      congratsMessage() {
        const difference = new Date().getFullYear() - this.foundationYear
        // this.snackbar = difference % 5 == 0
        // console.log(this.snackbar, difference % 5 == 0)
        return (difference % 5 == 0) && `В этом году нашей автошколе исполняется ${difference} лет!`
      }
    },
}
</script>

<style>
.fitcontent {
    max-width: fit-content !important;
}
</style>