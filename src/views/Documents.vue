<template>
  <v-container fluid>
    <v-card>
      <h2 class="text-center title">Здесь можно найти документы и положения автошколы</h2>

      <v-row>
        <v-col cols="12" md="6" align="center" v-for="i in 5" :key="i">
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header style="font-size: 16px">
                <p class="text-justify text--secondary ma-0">Уставные документы</p>
                <template v-slot:actions>
                  <a class="text-justify my-auto">Раскрыть</a>
                  <v-icon color="primary">$expand</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container fluid v-for="doc in docs" :key="doc.name" :class="`pa-0 pb-4 ${!checkMobile() ? 'd-flex flex-row justify-space-between' : ''}`">
                    <p :class="`text-button font-weight-${$vuetify.theme.dark ? 'light' : 'regular'} text-${checkMobile() ? 'left' : 'left'} text-capitalize mb-0 align-self-center`"><v-icon left>mdi-file-outline</v-icon>{{ doc.name }}
                    </p>
                    <v-btn outlined :block="checkMobile()" :color="`${{pdf: 'red', doc: 'blue', docx: 'blue'}[extension(doc.filepath)] || 'green'} darken-3`" class="ma-2 align-self-center">
                        <v-icon left>mdi-file{{['doc', 'docx'].includes(extension(doc.filepath)) ? "-word-box" : extension(doc.filepath) == 'pdf' ? "-pdf-box" : "" }}</v-icon>Скачать .{{ extension(doc.filepath) }}
                    </v-btn>
                </v-container>
                <!-- <v-container fluid v-for="doc in docs" :key="doc.name" class="pa-0 pb-4 d-flex flex-row justify-space-between">
                    <p class="text-h6 font-weight-light text-left text-capitalize mb-0 align-self-center"><v-icon left>mdi-file-outline</v-icon>{{ doc.name }}
                    </p>
                    <v-btn outlined :color="`${{pdf: 'red', doc: 'blue', docx: 'blue'}[extension(doc.filepath)] || 'green'} darken-3`" class="ma-2 align-self-center">
                        <v-icon left>mdi-file{{['doc', 'docx'].includes(extension(doc.filepath)) ? "-word-box" : extension(doc.filepath) == 'pdf' ? "-pdf-box" : "" }}</v-icon>Скачать .{{ extension(doc.filepath) }}
                    </v-btn>
                </v-container> -->

              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
      docs: [
          { name: 'Положение о комиссии по урегулированию споров', filepath: '/docs/args.pdf' },
          { name: 'Устав', filepath: '/docs/ustav.docx' },
          { name: 'Документ в картиночках', filepath: '/docs/gustav.jpeg' },
      ]
  }),
  methods: {
      extension(path) {
          return path.split('.').pop()
      },
      checkMobile() {
          return this.$vuetify.breakpoint.xs
      }
  }
};
</script>