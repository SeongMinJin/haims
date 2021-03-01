<template>
  <div class="d-flex justify-center align-center">
    <v-card
      class="d-flex flex-wrap justify-center"
      color=""
      tile
      flat
      max-width="1000"
      min-width="500"
    >
      <v-card
        v-for="(menu, i) in this.coffee"
        v-bind:key="i.title"
        class="pa-2 ma-8"
        tile
        min-width="350"
      >

        <!--상품 사진-->
        <v-img
        src="@/assets/jamongAde.jpg"
        max-height=""
        max-width="350">
        </v-img>

        <!--상품명-->
        <v-card-title>
          <h3 class="title primary--text">{{ menu.title }}</h3>
        </v-card-title>

        <!--상품 설명, 가격-->
        <v-card-text>
          <p>{{ menu.description }}</p>
          <div class="d-flex justify-space-between">
            <h2><v-icon small>mdi-currency-krw</v-icon>{{ menu.price }}</h2>
            <div class="d-flex">
              <v-rating
              color="yellow accent-4"
              dense
              half-increments
              hover
              size="18"
              ></v-rating>
              <div class="ml-2">(45)</div>
            </div>
          </div>
        </v-card-text>

        <!--상품 상세정보 버튼-->
        <v-btn
          class="white--text"
          color="teal"
          block
        >
          상세 정보
        </v-btn>

        <!--상품 수정 버튼-->
        <v-btn
          absolute
          top
          left
          fab
          @click="openEditDialog(i)"
          style="z-index:2"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <!--상품 삭제 버튼-->
        <v-btn
          absolute
          top
          right
          fab
          @click="del=!del"
        >
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>

      </v-card>

      <!--상품 추가하기 폼-->
      <v-card
        class="d-flex flex-column justify-center align-center pa-2 ma-8"
        tile
        width="366"
        min-height="542"
      >
        <v-btn
          fab
          @click="update = !update"
        >
          <v-icon color="grey" large>mdi-plus</v-icon>
        </v-btn>
        <v-card-title>상품 추가하기</v-card-title>
        <v-dialog
          v-model="update"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar
              dark
              color="primary"
            >
              <v-btn
                icon
                dark
                @click="update = !update"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>상품 추가하기</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  dark
                  text
                  @click="updateMenu"
                >
                  저장
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>

            <v-card flat class="d-flex flex-column justify-center align-center">
              <v-card class="d-flex ma-12" width="500">
                <v-text-field
                  placeholder="추가할 상품명을 적어주세요."
                  v-model="menuTitle"
                  class="ma-8" label="상품명"
                >
                </v-text-field>
              </v-card>

              <v-divider></v-divider>

              <v-card class="d-flex justify-center ma-12" width="500">
                <v-textarea
                  v-model="menuDescription"
                  placeholder="추가할 상품설명을 적어주세요."
                  dense
                  auto-grow
                  class="ma-8"
                  label="상품설명"
                ></v-textarea>
              </v-card>

            </v-card>
          </v-card>
        </v-dialog>
      </v-card>
    </v-card>
    <!--수정 다이얼로그-->
    <v-dialog
      v-model="edit"
      hide-overlay
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="edit =! edit"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ this.selectedItemTitle }}(수정하기)</v-toolbar-title>
        </v-toolbar>
        <v-card flat class="d-flex flex-column justify-center align-center">
          <v-card class="d-flex ma-12" width="500">
            <v-text-field
              v-model="menuTitle"
              class="ma-8" label="상품명"
            >
            </v-text-field>
            <v-btn icon absolute top right @click="saveTitle(selectedItemIndex)"><v-icon large>mdi-content-save</v-icon></v-btn>
          </v-card>

          <v-divider></v-divider>

          <v-card class="d-flex justify-center ma-12" width="500">
            <v-textarea
              v-model="menuDescription"
              placeholder="수정하고 싶은 상품설명으로 적어주세요."
              dense
              auto-grow
              class="ma-8"
              label="상품설명"
            ></v-textarea>
            <v-btn icon absolute top right @click="saveDescription(selectedItemIndex)"><v-icon large>mdi-content-save</v-icon></v-btn>
          </v-card>
        </v-card>

      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      edit: false,
      del: false,
      update: false,
      menuTitle: '',
      menuDescription: '',
      selectedItemIndex: -1,
      selectedItemTitle: '',
      selectedItemDescription: ''
    }
  },
  props: [
    'coffee'
  ],
  mounted () {
  },
  methods: {
    saveTitle (i) {
      var currentValue = i
      this.$firebase.database().ref().child('menu').child('coffee').child(currentValue).update({ title: this.menuTitle })
      this.selectedItemTitle = this.menuTitle
    },
    saveDescription (i) {
      var currentValue = i
      this.$firebase.database().ref().child('menu').child('coffee').child(currentValue).update({ description: this.menuDescription })
      this.selectedItemDescription = this.menuDescription
    },
    updateMenu () {
      this.coffee.push({
        title: this.menuTitle,
        description: this.menuDescription,
        price: '3,000',
        picture: '@/assets/jamongAde.jpg'
      })
      this.menuTitle = ''
      this.menuDescription = ''
      this.$firebase.database().ref().child('menu').update({ coffee: this.coffee })
      this.update = false
    },
    openEditDialog (index) {
      this.edit = true
      this.selectedItemIndex = index
      this.selectedItemTitle = this.coffee[this.selectedItemIndex].title
      this.selectedItemDescription = this.coffee[this.selectedItemIndex].description
      this.menuTitle = this.selectedItemTitle
      this.menuDescription = this.selectedItemDescription
    },
    closeDialog () {
      this.edit = false
      this.del = false
      this.update = false
      this.selectedItemTitle = ''
      this.selectedItemDescription = ''
    }
  }
}
</script>
