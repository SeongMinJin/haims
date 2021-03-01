<template>
  <div>
    <v-app-bar
      color="#fff"
      class="d-flex justify-center"
      flat
    >
      <template>
        <v-tabs
          v-model="model"
          slider-color="yellow"
        >
          <v-tab
            v-for="(menuTitle, i) in this.menuTitles"
            :key="menuTitle.title"
            :href="`#tab-${menuTitle.title}`"
            @click="saveCurrentValue(i)"
          >
            {{ menuTitle.title }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-tabs-items v-model="model">
      <v-tab-item
        v-for="menuTitle in this.menuTitles"
        :key="menuTitle.title"
        :value="`tab-${menuTitle.title}`"
      >
      <v-card flat>
        <template v-if="currentValue == `커피`">
          <Coffee :coffee="menu.coffee"></Coffee>
        </template>
        <template v-if="currentValue == `라떼`">
          <Latte :latte="menu.latte"></Latte>
        </template>
        <template v-if="currentValue == `에이드`">
          <Ade :ade="menu.ade"></Ade>>
        </template>
        <template v-if="currentValue == `디저트`">
          <Desert :desert="menu.desert"></Desert>>
        </template>
      </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Coffee from '@/components/Coffee.vue'
import Latte from '@/components/Latte.vue'
import Ade from '@/components/Ade.vue'
import Desert from '@/components/Desert.vue'

export default {
  props: [
    'menu'
  ],
  mounted () {
  },
  components: {
    Coffee,
    Latte,
    Ade,
    Desert
  },
  data () {
    return {
      menuTitles: [
        {
          title: '커피'
        },
        {
          title: '라떼'
        },
        {
          title: '에이드'
        },
        {
          title: '디저트'
        }
      ],
      model: 'tab-커피',
      currentValue: '커피'
    }
  },
  methods: {
    saveCurrentValue (i) {
      this.currentValue = this.menuTitles[i].title
    }
  }
}
</script>
