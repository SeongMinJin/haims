<template>
  <div class="home">
      <Header/>
      <MenuList :menu="this.menu"></MenuList>
  </div>
</template>

<script>

// @ is an alias to /src
import MenuList from '@/components/MenuList.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    MenuList,
    Header
  },
  data () {
    return {
      menu: {
      },
      currentUserId: ''

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
      })
    }
  }
}
</script>
