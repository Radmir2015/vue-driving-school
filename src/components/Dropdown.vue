<template>
    <v-menu open-on-hover offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          color=""
          v-bind="attrs"
          v-on="on"
          class="hidden-sm-and-down"
        >
          {{ header }}
          <v-icon right>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          link
          router :to="item.route"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
export default {
    props: ['header', 'items'],
    data: () => ({

    })
}
</script>