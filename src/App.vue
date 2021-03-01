<template>
  <v-app>
    <Header/>
    <v-main>
      <MenuList :menu="this.menu"></MenuList>
    </v-main>
  </v-app>
</template>

<script>
import MenuList from '@/components/MenuList.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'App',

  components: {
    MenuList,
    Header
  },

  data () {
    return {
      menu: {
      }
    }
  },
  created () {
    this.subscribe()
  },
  mounted () {
  },
  methods: {
    subscribe () {
      this.$firebase.database().ref().child('menu').on('value', (snapshot) => {
        const menu = snapshot.val()
        this.menu = menu
        console.log(this.menu.coffee)
      })
    }
  }
}
</script>
