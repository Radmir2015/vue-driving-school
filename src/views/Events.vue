<template>
    <v-container fluid>
        <v-row>
            <v-col md="8" offset-md="2" class="py-0">
                <!-- <v-btn text block x-large color="info" class="mb-2" v-if="editMode" @click="$root.$emit('add-event')">Добавить<v-icon right>mdi-plus</v-icon></v-btn> -->
                <!-- <EventDialog v-if="editMode" isAdd :event="$set(events, events.length, {})"/> -->
                <!-- <EventDialog v-if="editMode" isAdd :event="events[events.length] = {}"/> -->
                <EventDialog v-if="LOGIN_STATE" @addEvent="(ev) => events.unshift(ev)">
                    <template v-slot:default="slotProps">
                    <v-btn text block x-large color="info" class="mb-2" @click="slotProps.openDialog">
                      Добавить
                      <v-icon right>mdi-plus</v-icon>
                    </v-btn>
                    </template>
                </EventDialog>
                <v-card class="pa-4 mb-2" v-for="(event, index) in events" :key="event.published.toLocaleString()">
                    <v-container class="pt-0" >
                        <p class="title pa-0 ma-0 align-self-center">{{ event.title }}</p>
                        <v-spacer></v-spacer>
                        <v-container class="d-flex pa-0" fluid>
                            <v-icon left small>mdi-clock</v-icon>
                            <p class="text-body-1 pa-0 ma-0 align-self-center" >{{ event.published.toLocaleString() }}</p>
                            <!-- <v-btn v-if="editMode" icon @click="$delete(events, index)">
                                <v-icon>mdi-pencil-outline</v-icon>
                            </v-btn> -->

                            <EventDialog class="d-flex" v-if="LOGIN_STATE" :eventRef="event" @removeEvent="$delete(events, index)" @updateEvent="(ev) => $set(events, index, ev)">
                                <template v-slot:default="slotProps">
                                    <v-btn icon class="align-self-center" @click="slotProps.openDialog">
                                    <v-icon>mdi-pencil-outline</v-icon>
                                    </v-btn>
                                </template>
                            </EventDialog>
                        </v-container>
                    </v-container>                   

                    <!-- <v-divider></v-divider> -->

                    <p class="text-justify text-body-1 mb-2" style="text-indent: 2em" v-for="(chunk, ind) in event.body.split('\n')" :key="ind">{{ chunk }}</p>

                    <CarouselOrItem :items="event.images" :sliderItemsBreakpoints="{cols: 12}" :aspectRatio="2"></CarouselOrItem> 
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { db } from '@/fb'
import CarouselOrItem from '../components/CarouselOrItem'
import EventDialog from '../components/EventDialog'
import { mapGetters } from 'vuex'

export default {
    components: {
      CarouselOrItem, EventDialog
    },
    data: () => ({
        // editMode: false,
        events: [
            // { title: 'Hello world', published: new Date(), body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At alias repellat voluptate tempore impedit numquam sint similique obcaecati inventore pariatur. Facilis ut, \nofficiis eum laborum dicta excepturi illum quaerat! Numquam dolore sequi voluptas, harum molestias \naccusamus incidunt culpa tempore dolor modi explicabo saepe delectus nulla necessitatibus illo distinctio officia reprehenderit.', images: [ { photo: 'https://picsum.photos/800/498?random'}, { photo: 'https://picsum.photos/800/300?random' } ] },
            // { title: 'Hello world', published: new Date(), body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At alias repellat voluptate tempore impedit numquam sint similique obcaecati inventore pariatur. Facilis ut, officiis eum laborum dicta excepturi illum quaerat! Numquam dolore sequi voluptas, harum molestias accusamus incidunt culpa tempore dolor modi explicabo saepe delectus nulla necessitatibus illo distinctio officia reprehenderit.', images: [ { photo: 'https://picsum.photos/800/498?random'} ] },
            // { title: 'Hello world', published: new Date(), body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At alias repellat voluptate tempore impedit numquam sint similique obcaecati inventore pariatur. Facilis ut, officiis eum laborum dicta excepturi illum quaerat! Numquam dolore sequi voluptas, harum molestias accusamus incidunt culpa tempore dolor modi explicabo saepe delectus nulla necessitatibus illo distinctio officia reprehenderit.', images: [] },
            // { title: 'Hello world', published: new Date(), body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At alias repellat voluptate tempore impedit numquam sint similique obcaecati inventore pariatur. Facilis ut, officiis eum laborum dicta excepturi illum quaerat! Numquam dolore sequi voluptas, harum molestias accusamus incidunt culpa tempore dolor modi explicabo saepe delectus nulla necessitatibus illo distinctio officia reprehenderit.' },
        ]
    }),
    computed: {
        ...mapGetters(['LOGIN_STATE'])
    },
    async created() {
        // this.$root.$emit('request-sign-status')

        // db.collection('events').onSnapshot(res => {
        //     const changes = res.docChanges()

        //     console.log('change', changes)

        //     changes.forEach(change => {
        //         if (change.type === 'added' && change.doc.data) {
        //             this.events.push({ ...change.doc.data })
        //         }
        //     })
        // })

        // const url = await storageRef.child('images/events/afdgdnsgxn651.jpg').getDownloadURL()

        // console.log('url', url)

        const snapshot = await db.collection('events').orderBy("published", "desc").get()
        snapshot.docs.map(doc => {
            const chunk = doc.data()
            // console.log(chunk.body, chunk.body.split('\n'))
            chunk.id = doc.id
            chunk.body = chunk.body.replace('\\n', '\n')
            chunk.published = chunk.published.toDate()
            this.events.push({ ...chunk })
        })
    },
    mounted() {
        // this.editMode = this.LOGIN_STATE
        // this.$root.$emit('request-sign-status')
        
        // this.$root.$on('sign-in', () => {
        //     this.editMode = true
        // })
        // this.$root.$on('sign-out', () => {
        //     this.editMode = false
        // })
    }
}
</script>