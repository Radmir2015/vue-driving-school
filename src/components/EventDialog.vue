<template>
  <div>
    <!-- <slot name="btn" v-bind:dialog="dialog"></slot> -->
    <v-btn v-if="isAdd" text block x-large color="info" class="mb-2" @click="dialog = true">
      Добавить
      <v-icon right>mdi-plus</v-icon>
    </v-btn>
    <v-btn v-else icon @click="dialog = true">
      <v-icon>mdi-pencil-outline</v-icon>
    </v-btn>
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
    events: {
        type: Array,
    },
    event: {
      type: Object,
      default: () => ({
        title: "",
        body: "",
        published: 0,
      })
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
    title: "",
    body: ""
  }),
  methods: {
    async submit() {
        this.loading.saveButton = true
        // console.log(this.event)
        if (this.event.id) {
            await db.collection('events').doc(this.event.id).update(this.event)
                // .then(() => {
            console.log('Updated!')

            this.loading.saveButton = false
            this.dialog = false
                // })
        } else {
            const eventWithDate = {
                ...this.event,
                published: new Date()
            }
            this.event.id = (await db.collection('events').add(eventWithDate)).id

            console.log('New id', this.event.id)

            this.loading.saveButton = false
            this.dialog = false

            // this.events = [this.event, ...this.events]
            if (this.events) {
                this.events.unshift({ id: this.event.id, ...eventWithDate })
            }
        }
    },
    async deleteEvent() {
        this.loading.deleteButton = true

        if (this.event.id) {
            console.log(await db.collection('events').doc(this.event.id).delete())

            this.$delete(this.events, this.events.findIndex(x => x.id === this.event.id))
        } else {
            this.$delete(this.events, this.events.findIndex(x => x === this.event))
        }

        this.loading.deleteButton = false
        this.dialog = false
    }
  },
  mounted() {
    this.$root.$on("add-event", () => {
      this.dialog = true;
    });
  }
};
</script>