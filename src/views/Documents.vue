<template>
  <v-container fluid>
    <v-card>
      <h2 class="text-center title">Здесь можно найти документы и положения автошколы</h2>

      <v-row>
          <v-col cols="12" md="6" align="center" v-for="(section, index) in DOCS_STATE" :key="section.id">
          <v-expansion-panels flat v-model="expandedPanels[index]" :id="section.tag">
            <v-expansion-panel>
              <v-expansion-panel-header style="font-size: 16px">
                <p class="text-justify text--secondary ma-0">{{ section.sectionName }}</p>
                <template v-slot:actions>
                  <a class="text-justify my-auto">Раскрыть</a>
                  <v-icon color="primary">$expand</v-icon>
                  <DocDialog class="d-flex" v-if="LOGIN_STATE" :editIndex="index">
                      <template v-slot:default="slotProps">
                          <v-btn icon class="align-self-center" @click.stop="slotProps.openDialog">
                            <v-icon>mdi-pencil-outline</v-icon>
                          </v-btn>
                      </template>
                  </DocDialog>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container fluid v-for="doc in section.docs" :key="doc.name" :class="`pa-0 pb-4 ${!checkMobile() ? 'd-flex flex-row justify-space-between' : ''}`">
                    <p @click="docOverlay = true; activeSrc = doc.filepath" :class="`text-button font-weight-${$vuetify.theme.dark ? 'light' : 'regular'} text-${checkMobile() ? 'left' : 'left'} text-capitalize mb-0 align-self-center`">
                      <v-icon left>mdi-file-outline</v-icon>{{ doc.name }}
                    </p>
                    <v-btn outlined :href="doc.filepath" :block="checkMobile()" :color="`${{pdf: 'red', doc: 'blue', docx: 'blue'}[extension(doc.filepath)] || 'green'} darken-3`" class="ma-2 align-self-center">
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
      <DocDialog v-if="LOGIN_STATE" :addMode="true" @addEvent="(ev) => events.unshift(ev)">
          <template v-slot:default="slotProps">
          <v-btn text block x-large color="info" class="mb-2" @click="slotProps.openDialog">
            Добавить
            <v-icon right>mdi-plus</v-icon>
          </v-btn>
          </template>
      </DocDialog>
    </v-card>
    <v-overlay :value="docOverlay" opacity="0.7">
      <!-- <v-container fluid> -->
      <!-- </v-container> -->
      <v-container fluid class="pa-0">
        <PdfViewer :src="activeSrc" />
      </v-container>
      <!-- <v-container fluid> -->
      <!-- <v-spacer></v-spacer> -->
      <v-btn text @click="docOverlay = false" color="error" class="ml-2 mt-2">
          Закрыть<v-icon right>mdi-close</v-icon>
      </v-btn>
      <!-- </v-container> -->
    </v-overlay>
  </v-container>
</template>

<script>
import PdfViewer from '../components/Pdf'
import DocDialog from '../components/DocDialog'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    PdfViewer, DocDialog
  },
  beforeRouteEnter(to, from, next) {
    if (to.hash) {
      next(vm => {
        vm.SET_ACTIVE_DOC(to.hash.slice(1))
        // vm.expandedPanels[vm.ACTIVE_DOC_INDEX] = 0
      })
    } else next(vm => {
      vm.SET_ACTIVE_DOC('')
    })
  },
  data: () => ({
    docOverlay: false,
    activeSrc: '',
      // expandedPanels: [0]
      // docs: [
      //     { name: 'Положение о комиссии по урегулированию споров', filepath: '/docs/args.pdf' },
      //     { name: 'Устав', filepath: '/docs/ustav.docx' },
      //     { name: 'Документ в картиночках', filepath: '/docs/gustav.jpeg' },
      // ]
  }),
  computed: {
    ...mapGetters(['DOCS_STATE', 'ACTIVE_DOC_INDEX', 'LOGIN_STATE']),
    expandedPanels() {
      const panels = []
      panels[this.ACTIVE_DOC_INDEX] = 0
      return panels
    }
  },
  methods: {
      ...mapMutations(['SET_ACTIVE_DOC']),
      extension(path) {
          return path.split('?').shift().split('.').pop()
      },
      checkMobile() {
          return this.$vuetify.breakpoint.xs
      }
  },
  mounted() {
    
  }
};
</script>

<style>
  .v-overlay__content {
    width: 90%;
    height: 80%;
  }
</style>