<template>
    <div>
      <slot :openDialog="() => { dialog = true }"></slot>
      <v-dialog max-width="600px" v-model="dialog">
        <v-card>
          <v-card-title>
            <h1 class="title">Редактирование документов</h1>
            <v-spacer></v-spacer>
            <v-btn text color="info" @click="dialog = false">
              Закрыть
              <v-icon right>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="currentDoc.sectionName"
                label="Название секции раздела документов"
                prepend-icon="mdi-format-text-rotation-none"
              />
              <v-text-field
                v-model="currentDoc.tag"
                label="Тег раздела"
                prepend-icon="mdi-at"
              />
              <v-container v-if="currentDoc.docs && currentDoc.docs.length > 0" fluid class="pa-0">
                  <p class="text-body-1 mb-0"><v-icon left>mdi-file-multiple</v-icon>Добавленные документы</p>
                  <v-container fluid v-for="(doc, ind) in currentDoc.docs" :key="ind" :class="`pa-0 ${!checkMobile() ? 'd-flex flex-row justify-space-between' : ''}`">
                    <v-text-field
                        label="Название документа"
                        v-model="doc.name"
                        :prepend-icon="'mdi-file' + (['doc', 'docx'].includes(extension(doc.filepath)) ? '-word-box' : extension(doc.filepath) == 'pdf' ? '-pdf-box' : '')"
                        :append-icon="docsToDelete.includes(ind) ? 'mdi-close-outline' : 'mdi-close'"
                        @click:append="docsToDelete.includes(ind) ? docsToDelete = docsToDelete.filter(x => x !== ind) : docsToDelete.push(ind)"
                    ></v-text-field>
                </v-container>
              </v-container>
              <v-file-input v-model="files" counter chips multiple accept="*" label="Добавить документы">
                  <template v-slot:selection="{ text, index }">
                      <v-chip small label close @click:close="$delete(files, index)">{{ text }}</v-chip>
                  </template>
              </v-file-input>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="success" @click="submit" :loading="loading.saveButton">Сохранить</v-btn>
            <v-btn
              text
              color="error"
              @click="dialogDelete = true"
              :loading="loading.deleteButton"
            >Удалить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog max-width="400px" v-model="dialogDelete">
        <v-card>
          <v-card-title>Предупреждение</v-card-title>
          <v-card-text>
            <p
              class="text-body-1 ma-0"
            >Вы действительно хотите удалить данный раздел с документами ({{ currentDoc.sectionName }})?</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="success"
              @click="dialogDelete = false"
            >Оставить</v-btn>
            <v-btn
              text
              color="error"
              @click="dialogDelete = false; deleteEvent()"
            >Удалить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { db, storage, storageRef } from '@/fb'

export default {
    props: ['addMode', 'editIndex'],
    data: () => ({
        dialog: false,
        dialogDelete: false,
        currentDoc: {},
        docsToDelete: [],

        files: [],

        loading: {
            saveButton: false,
            deleteButton: false,
        }
    }),
    computed: {
        // ...mapGetters(['GET_DOC']),
    },
    watch: {
        files() {
            // this.currentDoc.docs.push()
            this.currentDoc.docs = [
                ...this.currentDoc.docs.filter(x => !x.file),
                ...this.files.map(file => ({ filepath: file.name, name: file.name.slice(0, file.name.lastIndexOf('.')), file }))
            ]
            console.log(this.currentDoc.docs)
        },
        docsToDelete() {
          console.log(this.docsToDelete)
        }
    },
    methods: {
        ...mapActions(['ADD_NEW_DOC', 'GET_DOC', 'REMOVE_DOC', 'SAVE_DOC']),
        // ...mapMutations(['SAVE_DOC']),
        async submit() {
            this.loading.saveButton = true
            await this.filterFilesAndUpload()
            this.docsToDelete = []
            if (this.addMode) {
              
              // const { id, ...currentDocWithoutId } = this.currentDoc; id;
                delete this.currentDoc.id
                delete this.currentDoc.uploaded

                this.currentDoc.id = (await db.collection('docs').add(this.currentDoc)).id

                this.currentDoc.uploaded = true

                await this.ADD_NEW_DOC({ doc: this.currentDoc, method: 'unshift' })
                console.log('addMode', this.currentDoc, this.editIndex)

                this.currentDoc = {
                    tag: '', sectionName: '', docs: [], id: (new Date()).getTime(), uploaded: false
                }
                this.files = []

                this.loading.saveButton = false
                this.dialog = false
            } else if (this.editIndex >= 0) {
                // this.currentDoc = await this.GET_DOC(this.editIndex)
                if (this.currentDoc.uploaded) {
                  console.log(this.currentDoc)
                  delete this.currentDoc.uploaded
                  const { id, ...currentDocWithoutId } = this.currentDoc
                  await db.collection('docs').doc(id).update(currentDocWithoutId)
                  this.currentDoc.uploaded = true
                } else {
                  // const { id, ...currentDocWithoutId } = this.currentDoc
                  delete this.currentDoc.id
                  delete this.currentDoc.uploaded
                  this.currentDoc.id = (await db.collection('docs').add(this.currentDoc)).id
                  this.currentDoc.uploaded = true
                  console.log('New id', this.currentDoc.id)
                }

                await this.SAVE_DOC(this.currentDoc, this.editIndex)

                this.loading.saveButton = false
                this.dialog = false
            }
        },
        async deleteEvent() {
            this.loading.deleteButton = true
            if (this.addMode) {
                // await this.ADD_NEW_DOC(this.currentDoc, 'unshift')
                console.log('addMode', this.currentDoc, this.editIndex)
                this.currentDoc = {
                    tag: '', sectionName: '', docs: [], id: (new Date()).getTime(), uploaded: false
                }
                this.loading.deleteButton = false
            } else if (this.editIndex >= 0) {
                console.log('remove', this.editIndex)

                if (this.currentDoc.uploaded) {
                  // this.currentDoc.docs.map(doc => {
                  //     storage.refFromURL(doc.filepath).delete()
                  //         .then(() => console.log('Successfully deleted file'))
                  //         .catch((err) => console.error(err))
                  // })
                  this.currentDoc.docs.map(doc => {
                      storage.refFromURL(doc.filepath).delete()
                          .then(() => console.log('Successfully deleted file'))
                          .catch((err) => console.error(err))
                  })

                  await db.collection('docs').doc(this.currentDoc.id).delete()
                } else {
                  this.currentDoc = {
                      tag: '', sectionName: '', docs: [], id: (new Date()).getTime(), uploaded: false
                  }
                }

                await this.REMOVE_DOC(this.editIndex)
                // dialogDelete = false
                this.loading.deleteButton = false
                this.dialog = false
            }
        },
        async filterFilesAndUpload() {
            if (!this.currentDoc.docs) return

            this.currentDoc.docs.filter((doc, index) => !doc.file && this.docsToDelete.includes(index)).map(doc => {
                storage.refFromURL(doc.filepath).delete()
                    .then(() => console.log('Successfully deleted file'))
                    .catch((err) => console.error(err))
            })

            this.currentDoc.docs = this.currentDoc.docs.filter((doc, index) => !this.docsToDelete.includes(index))

            console.log('delete selected doc', this.currentDoc.docs)

            this.currentDoc.docs = await Promise.all(this.currentDoc.docs.map(async doc => ({ ...doc, filepath: doc.file ? await this.uploadFile(doc.file, doc.name) : doc.filepath })))

            console.log('uploaded docs', this.currentDoc.docs)

            // this.currentDoc.docs = this.currentDoc.docs.map(({ id: docId, file, ...doc }) => ({ ...doc }))
            this.currentDoc.docs = this.currentDoc.docs.map(doc => { delete doc.id; delete doc.file; return doc })

            console.log('deleted extra info', this.currentDoc.docs)
        },
        async uploadFile(file, filename) {
            return new Promise((resolve, reject) => {
                // Upload file and metadata to the object 'images/mountains.jpg'
                let uploadTask = storageRef.child(`docs/${filename ? filename + '.' + file.name.split('.').pop() : file.name}`).put(file);

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on('state_changed',
                  function(snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                      case 'paused':
                        console.log('Upload is paused');
                        break;
                      case 'running':
                        console.log('Upload is running');
                        break;
                    }
                  }, function(error) {
                    reject(error.code)
                }, function() {
                  // Upload completed successfully, now we can get the download URL
                  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL)
                  });
                });
            })
        },
        extension(path) {
            return path.split('?').shift().split('.').pop()
        },
        checkMobile() {
            return this.$vuetify.breakpoint.xs
        }
    },
    async mounted() {
        if (this.addMode) {
            // this.currentDoc = this.GET_LAST_DOC()
            this.currentDoc = {
                tag: '', sectionName: '', docs: [], id: (new Date()).getTime(), uploaded: false
            }
        } else if (this.editIndex >= 0) {
            this.currentDoc = await this.GET_DOC(this.editIndex)
            console.log(this.currentDoc, this.editIndex)
        }
    }
}
</script>