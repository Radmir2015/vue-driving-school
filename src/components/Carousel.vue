<template>
    <v-carousel :light="!$vuetify.theme.isDark" cycle height="100%" hide-delimiter-background hide-delimiters>
      <v-carousel-item v-for="index in arr(amountSliderPages)" :key="index">
        <v-sheet height="100%">
          <v-row justify="center" align="center" class="fill-height">
            <v-col v-bind="sliderItemsBreakpoints" v-for="ind in arr(Math.min(itemsPerSlide, items.length - index * itemsPerSlide))" :key="ind">
              <v-card class="text-center">
                <v-img :src="items[index * itemsPerSlide + ind].photo" :aspect-ratio="aspectRatio"></v-img>
                <v-card-title v-if="items[index * itemsPerSlide + ind].name" class="text-subtitle-1 font-weight-bold justify-center">{{ items[index * itemsPerSlide + ind].name }}</v-card-title>
                <v-card-subtitle v-if="items[index * itemsPerSlide + ind].exp">{{ items[index * itemsPerSlide + ind].exp }}</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
</template>

<script>
export default {
    props: ['items', 'sliderItemsBreakpoints', 'aspectRatio'],
    computed: {
      itemsPerSlide() {
        const breakpoint = {"xs": "cols"}[this.$vuetify.breakpoint.name]||this.$vuetify.breakpoint.name
        const savedBreak = Math.min(...Object.keys(this.sliderItemsBreakpoints).map(x => this.breaks.indexOf(x)).filter(x => x >= this.breaks.indexOf(breakpoint)))
        return Math.floor(12 / this.sliderItemsBreakpoints[this.breaks[savedBreak]])
      },
      amountSliderPages() {
        return Math.ceil(this.items.length / this.itemsPerSlide)
      }
    },
    methods: {
      arr: function(len) {
        return [...Array(len).keys()]
      }
    },
    data: () => ({
        breaks: ['xl', 'lg', 'md', 'sm', 'cols']
    })
}
</script>