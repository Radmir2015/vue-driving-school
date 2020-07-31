<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn :href="source" icon large target="_blank" v-on="on">
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Home</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {
    name: 'Home',
    data: () => ({

    })
}
</script>