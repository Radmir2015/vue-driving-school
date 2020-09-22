<template>
    <v-container class="pa-0">
        <Carousel v-if="items && items.length > 1" :items="items" :sliderItemsBreakpoints="sliderItemsBreakpoints" :aspectRatio="aspectRatio" :avatar="avatar" :imageStyle="imageStyle"></Carousel>
        <v-card v-else-if="items && items.length == 1" class="text-center my-3">
            <v-img :src="items[0].photo" :aspect-ratio="aspectRatio||1" :style="avatar ? imageStyle : ''" :contain="avatar"></v-img>
            <v-card-title v-if="items[0].name" class="text-subtitle-1 font-weight-bold justify-center">{{ items[0].name }}</v-card-title>
            <v-card-subtitle v-if="items[0].exp">{{ items[0].exp }}</v-card-subtitle>
        </v-card>
        <!-- <v-skeleton-loader v-else-if="items && items.length == 0"
          class="mx-auto"
          type="card"
        ></v-skeleton-loader> -->
    </v-container>
</template>

<script>
import Carousel from './Carousel'

export default {
    props: ['items', 'sliderItemsBreakpoints', 'aspectRatio', 'avatar', 'imageStyle'],
    components: {
        Carousel
    },
    data: () => ({

    })
}
</script>