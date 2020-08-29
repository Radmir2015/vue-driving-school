<template>
  <div>
    <!-- <slot name="btn" v-bind:dialog="dialog"></slot> -->
    <slot v-bind:openDialog="() => { dialog = true }"></slot>
    <v-dialog max-width="600px" v-model="dialog">
      <v-card>
        <v-card-title>
          <h1 class="title">Редактирование события</h1>
          <v-spacer></v-spacer>
          <v-btn text color="info" @click="dialog = false">
            Закрыть
            <v-icon right>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="event.title"
              label="Заголовок"
              prepend-icon="mdi-format-text-rotation-none"
            />
            <v-textarea
              counter
              v-model="event.body"
              label="Основной текст"
              prepend-icon="mdi-card-text-outline"
            />
            <v-container v-if="event.images && event.images.length > 0" fluid class="pa-0">
                <p class="text-body-1 mb-0"><v-icon left>mdi-image-multiple</v-icon>Добавленные фото</p>
                <v-container fluid class="pb-0">
                    <v-item-group
                      v-model="photosToDelete"
                      multiple
                    >
                    <!-- <v-row> -->
                        <!-- <v-col :cols="Math.max(3, 12 / event.images.length)" v-for="(image, index) in event.images" :key="index" class="d-flex">
                            <v-img :src="image.photo" class="align-self-center"></v-img>
                        </v-col> -->
                        <draggable class="row" v-model="event.images" @start="drag = true" @end="drag = false">
                            <v-col cols="12" :sm="Math.max(3, 12 / event.images.length)" v-for="(image) in event.images" :key="`${image.photo}-${image.id}`" class="d-flex">
                            <v-item v-slot:default="{ active, toggle }" :value="image.id">
                                <v-img :src="image.photo" class="text-right pa-2">
                                    <v-btn fab small @click="toggle">
                                        <v-icon large>{{ active ? 'mdi-close-circle' : 'mdi-close-circle-outline' }}</v-icon>
                                    </v-btn>
                                <v-overlay :absolute="true" :value="active" opacity="0.7">
                                    <p class="text-center">Фото будет удалено</p>
                                    <v-btn text @click="toggle" color="success">
                                        <v-icon left>mdi-file-restore</v-icon>Отменить<v-icon right>mdi-file-restore</v-icon>
                                    </v-btn>
                                </v-overlay>
                                </v-img>
                            </v-item>
                            </v-col>
                        </draggable>
                    <!-- </v-row> -->
                    </v-item-group>
                </v-container>
            </v-container>
            <v-file-input v-model="files" counter chips multiple accept="image/*" label="Добавить фото">
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
          >Вы действительно хотите удалить данное событие ({{ event.title }})?</p>
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
import { db, storage, storageRef } from "@/fb"
import draggable from 'vuedraggable'

export default {
  props: {
    eventRef: {
      type: Object,
    //   default: () => ({
    //     title: "",
    //     body: "",
    //     published: new Date(),
    //   })
    },
    withoutDataBind: {
      type: Boolean,
      default: false
    }
  },
  components: {
      draggable
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: {
      saveButton: false,
      deleteButton: false,
    },
    event: null,
    photosToDelete: [],
    drag: false,
    files: [],
  }),
  watch: {
      files: function() {
          this.filesChanged()
      },
      photosToDelete: function() {
          console.log(this.photosToDelete)
        //   console.log(this.event.images)
      }
  },
  methods: {
    async submit() {
        this.loading.saveButton = true
        // console.log(this.event)
        if (this.event.id) {
            
            await this.filterImagesAndUpload()

            const { id, ...eventWithoutId } = this.event

            await db.collection('events').doc(id).update(eventWithoutId)
                // .then(() => {
            console.log(`Updated doc with id ${id}!`)

            if (this.withoutDataBind) {
                this.$emit('updateEvent', this.eventDataCopy(this.event))
                // this.$emit('updateEvent', this.withoutDataBind ? this.eventDataCopy(this.event) : this.event)
            }

            this.loading.saveButton = false
            this.dialog = false
                // })
        } else {
            // const eventWithDate = {
            //     ...this.event,
            //     published: new Date()
            // }

            await this.filterImagesAndUpload()

            this.event.published = new Date()
            this.event.id = (await db.collection('events').add(this.event)).id

            console.log('New id', this.event.id)

            this.loading.saveButton = false
            this.dialog = false

            // this.events = [this.event, ...this.events]
            // if (this.events) {
            //     this.events.unshift({ id: this.event.id, ...eventWithDate })
            // }
            
            this.$emit('addEvent', this.withoutDataBind ? this.eventDataCopy(this.event) : this.event)

            // delete this.event.id
            // this.event.title = ''
            // this.event.body = ''
            // this.event.published = new Date()
            if (!this.eventRef) {
                this.event = this.defaultData()
            }
        }
        this.files = []
    },
    async deleteEvent() {
        this.loading.deleteButton = true

        if (this.event.id) {
            this.event.images.map(img => {
                storage.refFromURL(img.photo).delete()
                    .then(() => console.log('Successfully deleted file'))
                    .catch((err) => console.error(err))
            })

            await db.collection('events').doc(this.event.id).delete()

            // this.$delete(this.events, this.events.findIndex(x => x.id === this.event.id))
            this.$emit('removeEvent')
        } else {
            // this.$delete(this.events, this.events.findIndex(x => x === this.event))
            this.$emit('removeEvent')
        }

        // deleting not yet created event 
        if (!this.eventRef) {
            this.event = this.defaultData()
        }

        this.loading.deleteButton = false
        this.dialog = false
    },
    async filterImagesAndUpload() {
        if (!this.event.images) return

        this.event.images.filter(img => !img.file && this.photosToDelete.includes(img.id)).map(img => {
            storage.refFromURL(img.photo).delete()
                .then(() => console.log('Successfully deleted file'))
                .catch((err) => console.error(err))
        })

        this.event.images = this.event.images.filter(img => !this.photosToDelete.includes(img.id))

        console.log('delete selected photo', this.event.images)

        this.event.images = await Promise.all(this.event.images.map(async img => ({ ...img, photo: img.file ? await this.uploadFile(img.file) : img.photo })))

        console.log('uploaded photos', this.event.images)

        // this.event.images = this.event.images.map(({ id: imgId, file, ...img }) => ({ ...img }))
        this.event.images = this.event.images.map(img => { delete img.id; delete img.file; return img })

        console.log('deleted extra info', this.event.images)
    },
    async uploadFile(file) {
        return new Promise((resolve, reject) => {
            // Upload file and metadata to the object 'images/mountains.jpg'
            let uploadTask = storageRef.child('images/events/' + file.name).put(file);
    
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
    filesChanged() {
        // this.files = event.map(file => ({ photo: (window.URL || window.webkitURL).createObjectURL(file), type: 'fromFile' }))

        // console.log(this.files)
        if (!this.event.images) {
            // this.event.images = []
            this.$set(this.event, 'images', [])
        }

        this.event.images = [
            ...this.event.images.filter(x => !x.file),
            ...this.files.map(file =>
                ({ photo: (window.URL || window.webkitURL).createObjectURL(file), file })
                )
            ]
        // this.event.images = [
        //     ...this.event.images.filter(x => !x.type || x.type !== 'fromFile'),
        //     ...this.files.map(file =>
        //         ({ photo: (window.URL || window.webkitURL).createObjectURL(file), type: 'fromFile', file })
        //         )
        //     ]

        this.event.images = this.event.images.map((img, ind) => ({ ...img, id: ind }))

        console.log(this.photosToDelete)
        // this.event.images = [ ...this.event.images, ...this.files.map(file => ({ photo: (window.URL || window.webkitURL).createObjectURL(file) })) ]
        // this.event.images.push(...this.files.map(file => ({ photo: (window.URL || window.webkitURL).createObjectURL(file) })))
    },
    defaultData() {
        return {
            title: "",
            body: "",
            published: new Date(),
        }
    },
    eventDataCopy(eventRef) {
        if (eventRef) {
            const eventRefCopy = JSON.parse(JSON.stringify(eventRef))
            eventRefCopy.published = new Date(eventRefCopy.published)

            return eventRefCopy
        } else {
            return null
        } // or in one line: return eventRef && eventRefCopy

    }
  },
  created() {
    // this.$root.$on("add-event", () => {
    //   this.dialog = true;
    // });

    // let eventRefCopy = null
    // if (this.eventRef) {
    //     eventRefCopy = JSON.parse(JSON.stringify(this.eventRef))
    //     eventRefCopy.published = new Date(eventRefCopy.published)

    //     console.log(eventRefCopy)
    // }

    this.event = (this.withoutDataBind ? this.eventDataCopy(this.eventRef) : this.eventRef) || this.defaultData()

    if (this.event.images) {
        this.event.images = this.event.images.map((img, ind) => ({ ...img, id: ind }))
    }
    // if (this.event.images)
    //     this.event.images = [ ...this.event.images, ...this.files.map(file => ({ photo: (window.URL || window.webkitURL).createObjectURL(file) })) ]
  }
};
</script>