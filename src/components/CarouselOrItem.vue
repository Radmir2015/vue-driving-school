<template>
    <v-container class="pa-0">
        <Carousel v-if="items.length > 1" :items="items" :sliderItemsBreakpoints="sliderItemsBreakpoints" :aspectRatio="aspectRatio"></Carousel>
        <v-card v-else-if="items.length == 1" class="text-center my-3">
            <v-img :src="items[0].photo" :aspect-ratio="aspectRatio||1"></v-img>
            <v-card-title class="text-subtitle-1 font-weight-bold justify-center">{{ items[0].name }}</v-card-title>
            <v-card-subtitle>{{ items[0].exp }}</v-card-subtitle>
        </v-card>
        <v-skeleton-loader v-else
          class="mx-auto"
          type="card"
        ></v-skeleton-loader>
    </v-container>
</template>

<script>
import Carousel from './Carousel'

export default {
    props: ['items', 'sliderItemsBreakpoints', 'aspectRatio'],
    components: {
        Carousel
    },
    data: () => ({

    })
}
</script>