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
            <v-file-input counter chips multiple accept="image/*" label="Добавить фото" />
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
import { db } from "@/fb";

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
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: {
      saveButton: false,
      deleteButton: false,
    },
    event: null,
  }),
  methods: {
    async submit() {
        this.loading.saveButton = true
        // console.log(this.event)
        if (this.event.id) {
            const { id, ...eventWithoutId } = this.event

            await db.collection('events').doc(id).update(eventWithoutId)
                // .then(() => {
            console.log(`Updated doc with id ${id}!`)

            this.loading.saveButton = false
            this.dialog = false
                // })
        } else {
            // const eventWithDate = {
            //     ...this.event,
            //     published: new Date()
            // }
            this.event.published = new Date()
            this.event.id = (await db.collection('events').add(this.event)).id

            console.log('New id', this.event.id)

            this.loading.saveButton = false
            this.dialog = false

            // this.events = [this.event, ...this.events]
            // if (this.events) {
            //     this.events.unshift({ id: this.event.id, ...eventWithDate })
            // }
            this.$emit('addEvent', this.event)

            // delete this.event.id
            // this.event.title = ''
            // this.event.body = ''
            // this.event.published = new Date()
            if (!this.eventRef) {
                this.event = this.defaultData()
            }
        }
    },
    async deleteEvent() {
        this.loading.deleteButton = true

        if (this.event.id) {
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
    defaultData() {
        return {
            title: "",
            body: "",
            published: new Date(),
        }
    }
  },
  created() {
    // this.$root.$on("add-event", () => {
    //   this.dialog = true;
    // });
    this.event = this.eventRef || this.defaultData()
  }
};
</script>