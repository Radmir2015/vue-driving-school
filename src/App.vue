<template>
  <v-app id="inspire">
    <Navbar/>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer color="indigo" app>
			<v-col class="text-center py-0" cols="12">
				<span class="white--text">ДОСААФ &copy; {{ new Date().getFullYear() }}</span>
			</v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",

  components: {
    Navbar,
  },

  data: () => ({
    
  })
};
</script>
