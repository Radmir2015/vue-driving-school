<template>
  <v-app id="inspire">
    <Navbar/>

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>

    <v-footer color="green darken-3" app absolute>
			<v-col class="text-center py-0" cols="12">
				<span class="white--text">ДОСААФ &copy; {{ new Date().getFullYear() }}</span>
			</v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar"
import { mapActions } from 'vuex'

export default {
  name: "App",

  components: {
    Navbar,
  },

  data: () => ({
    
  }),
  methods: {
    ...mapActions(['GET_DOCS', 'GET_REVIEWS'])
  },
  mounted() {
    this.GET_DOCS()
    this.GET_REVIEWS()
  }
};
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
