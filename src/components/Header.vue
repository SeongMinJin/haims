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
      <v-menu offset-y v-if="!$store.state.fireUser">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" x-large>
            <v-btn icon v-on="on" x-large><v-icon>mdi-account</v-icon></v-btn>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>로그인</v-card-title>
          <v-divider/>
          <v-card-actions>
            <v-btn color="red" dark @click="signInWithGoogle" block><v-icon>mdi-google</v-icon>구글로 로그인</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

      <v-menu offset-y v-else>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" x-large>
            <v-avatar><v-img :src="$store.state.fireUser.photoURL"></v-img></v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>로그인</v-card-title>
          <v-divider/>
          <v-card-actions>
            <v-btn dark @click="signOut" block>로그아웃</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
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
          <v-list-item @click="redirectToYoutube">
            <v-icon large color="red">mdi-youtube</v-icon><v-spacer></v-spacer><v-list-item-title class="ml-4">하임스 유튜브 채널</v-list-item-title>
          </v-list-item>

          <v-list-item @click="redirectToInstagram">
            <v-icon large color="red">mdi-instagram</v-icon><v-list-item-title class="ml-4">하임스 인스타그램</v-list-item-title>
          </v-list-item>

          <v-list-item @click="drawer = false" :to="`/location`">
            <v-icon large color="primary">mdi-map-marker</v-icon><v-list-item-title class="ml-4">찾아오시는 길</v-list-item-title>
          </v-list-item>

          <v-list-item @click="redirectToKaKao">
            <v-icon large color="#FFD54F">mdi-hand</v-icon><v-list-item-title class="ml-4">비대면 주문하기</v-list-item-title>
          </v-list-item>

          <v-list-item @click="drawer = false" :to="`/`">
            <v-icon large color="#6D4C41">mdi-coffee</v-icon><v-list-item-title class="ml-4">메뉴 보기</v-list-item-title>
          </v-list-item>

          <v-list-item @click="getAdmin">
            <v-icon large color="red">mdi-account-alert</v-icon><v-list-item-title class="ml-4">관리자</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-footer outlined rounded=""><v-icon small color="#000000">mdi-copyright</v-icon><div class="ml-2">made by - 진뚱딴지</div></v-footer>
      </v-list>
    </v-navigation-drawer>

    <v-snackbar
      v-model="snackbar"
      color="red"
      timeout="2000"
    >

    <v-icon class="mr-4">mdi-alert</v-icon>{{ text }}

    </v-snackbar>
  </div>
</template>
<script>
import { Bus } from '@/main.js'
export default {
  data () {
    return {
      drawer: false,
      loading: false,
      admin: false,
      snackbar: false,
      text: ''
    }
  },
  methods: {
    async signInWithGoogle () {
      const provider = new this.$firebase.auth.GoogleAuthProvider()
      this.$firebase.auth().languageCode = 'ko'
      try {
        const sn = this.$firebase.auth().signInWithRedirect(provider)
        this.$store.commit('setFireUser', sn.user)
      } finally {
        this.loading = false
      }
    },
    signOut () {
      this.$firebase.auth().signOut()
      this.admin = false
      Bus.$emit('adminValue', this.admin)
    },
    redirectToYoutube () {
      var url = 'https://www.youtube.com/channel/UCsgCW2WGxdpxsBEO59OUFqA'
      window.open(url)
      this.drawer = false
    },
    redirectToKaKao () {
      var url = 'https://pf.kakao.com/_xjfxixcK'
      window.open(url)
      this.drawer = false
    },
    redirectToInstagram () {
      var url = 'https://www.instagram.com/ha_tae_hatae/'
      window.open(url)
      this.drawer = false
    },
    getAdmin () {
      this.$firebase.auth().onAuthStateChanged((user) => {
        var uid
        if (user) {
          uid = user.uid
          if (uid === 'okTxzmK3inNZMHpaLrGyV7lubT23' || uid === 'hOwIty0vscNrn7bRhgAMqg1H4Sf2') {
            this.admin = true
          } else {
            this.snackbar = true
            this.text = '관리자만 접근할 수 있습니다.'
          }
        } else {
          this.snackbar = true
          this.text = '로그인 후 이용할 수 있습니다.'
        }
        this.drawer = false
        Bus.$emit('adminValue', this.admin)
      })
    }

  }
}
</script>
