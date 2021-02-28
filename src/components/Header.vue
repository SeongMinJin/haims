<template>
  <div>
    <v-app-bar
      color="#F9FBE7"
      height="100"
      class="d-flex justify-center"
    >
      <v-btn icon @click="drawer=!drawer"><v-icon x-large>mdi-menu</v-icon></v-btn>
      <v-img
        src="@/assets/coffeeremovebg.png"
        max-height="100"
        max-width="100"
      />
      <v-img
        src="@/assets/fontremovebg.png"
        max-height="200"
        max-width="200"
      />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      style="z-index:3"
    >
      <v-list
        nav
      >
        <v-list-item-group>
          <v-list-item @click="drawer = false">
            <v-icon large color="red">mdi-youtube</v-icon><v-spacer></v-spacer><v-list-item-title class="ml-4">하임스 유튜브 채널</v-list-item-title>
          </v-list-item>

          <v-list-item @click="drawer = false">
            <v-icon large color="primary">mdi-map-marker</v-icon><v-list-item-title class="ml-4">찾아오시는 길</v-list-item-title>
          </v-list-item>

          <v-list-item @click="drawer = false">
            <v-icon large color="#FFD54F">mdi-comment-processing</v-icon><v-list-item-title class="ml-4">하임스 실시간 채팅방</v-list-item-title>
          </v-list-item>

          <v-list-item @click="drawer = false">
            <v-icon large color="#6D4C41">mdi-coffee</v-icon><v-list-item-title class="ml-4">메뉴 보기</v-list-item-title>
          </v-list-item>
          <v-footer outlined rounded=""><v-icon small color="#000000">mdi-copyright</v-icon><div class="ml-2">made by - 진뚱딴지</div></v-footer>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      drawer: false
    }
  }
}
</script>
