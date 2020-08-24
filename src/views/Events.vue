<template>
    <v-container fluid>
        <v-row>
            <v-col md="8" offset-md="2" class="py-0">
                <v-card class="pa-4 mb-2" v-for="(event, index) in events" :key="index">
                    <v-container class="d-flex pt-0" >
                        <p class="title pa-0 ma-0 align-self-center">{{ event.title.repeat(5) }}</p>
                        <v-spacer></v-spacer>
                        <v-icon left>mdi-clock</v-icon>
                        <p class="text-body-1 pa-0 ma-0 align-self-center" >{{ event.published.toLocaleString() }}</p>
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
import CarouselOrItem from '../components/CarouselOrItem';

export default {
    components: {
      CarouselOrItem
    },
    data: () => ({
        events: [
            { title: 'Hello world', published: new Date(), body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At alias repellat voluptate tempore impedit numquam sint similique obcaecati inventore pariatur. Facilis ut, \nofficiis eum laborum dicta excepturi illum quaerat! Numquam dolore sequi voluptas, harum molestias \naccusamus incidunt culpa tempore dolor modi explicabo saepe delectus nulla necessitatibus illo distinctio officia reprehenderit.', images: [ { photo: 'https://picsum.photos/800/498?random'}, { photo: 'https://picsum.photos/800/300?random' } ] },
            { title: 'Hello world', published: new Date(), body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At alias repellat voluptate tempore impedit numquam sint similique obcaecati inventore pariatur. Facilis ut, officiis eum laborum dicta excepturi illum quaerat! Numquam dolore sequi voluptas, harum molestias accusamus incidunt culpa tempore dolor modi explicabo saepe delectus nulla necessitatibus illo distinctio officia reprehenderit.', images: [ { photo: 'https://picsum.photos/800/498?random'} ] },
            { title: 'Hello world', published: new Date(), body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At alias repellat voluptate tempore impedit numquam sint similique obcaecati inventore pariatur. Facilis ut, officiis eum laborum dicta excepturi illum quaerat! Numquam dolore sequi voluptas, harum molestias accusamus incidunt culpa tempore dolor modi explicabo saepe delectus nulla necessitatibus illo distinctio officia reprehenderit.', images: [] },
            { title: 'Hello world', published: new Date(), body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At alias repellat voluptate tempore impedit numquam sint similique obcaecati inventore pariatur. Facilis ut, officiis eum laborum dicta excepturi illum quaerat! Numquam dolore sequi voluptas, harum molestias accusamus incidunt culpa tempore dolor modi explicabo saepe delectus nulla necessitatibus illo distinctio officia reprehenderit.' },
        ]
    })
}
</script>