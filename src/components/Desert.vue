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
        v-for="(menu, i) in this.desert"
        v-bind:key="i.title"
        class="pa-2 ma-8"
        tile
        min-width="350"
      >

        <!--상품 사진-->
          <v-img
          :src="menu.picture"
          height="400"
          width="350">
          </v-img>

        <!--상품명-->
        <v-card-title>
          <h3 class="title primary--text">{{ menu.title }}</h3>
        </v-card-title>

        <!--상품 설명, 가격-->
        <v-card-text>
          <p>{{ menu.description }}</p>
          <div class="d-flex justify-space-between">
            <h2><v-icon small>mdi-currency-krw</v-icon>{{ menu.price | comma }}</h2>
          </div>
        </v-card-text>

        <!--상품 수정 버튼-->
        <v-btn
          absolute
          top
          left
          fab
          @click="openEditDialog(i)"
          style="z-index:2"
          v-if="admin"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <!--상품 삭제 버튼-->
        <v-btn
          absolute
          top
          right
          fab
          @click="openDeleteDialog(i)"
          v-if="admin"
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
        v-if="admin"
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

              <v-card class="d-flex ma-12" width="500">
                <v-file-input
                  v-model="menuImage"
                  placeholder="메뉴 대표 사진을 선택 해주세요."
                  prepend-icon="mdi-image"
                  class="ma-8"
                  dense
                  @change="updateMenuImage"
                >
                </v-file-input>
              </v-card>

              <v-card class="d-flex ma-12" width="500">
                <v-textarea
                  v-model="menuDescription"
                  placeholder="추가할 상품설명을 적어주세요."
                  dense
                  auto-grow
                  class="ma-8"
                  label="상품설명"
                ></v-textarea>
              </v-card>
              <v-card class="d-flex ma-12" width="500">
                <v-text-field
                  v-model="price"
                  placeholder="가격을 적어주세요. 단위는 자동으로 전환 됩니다."
                  dense
                  auto-grow
                  class="ma-8"
                  label="가격"
                  prepend-icon="mdi-currency-krw"
                ></v-text-field>
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
            @click="closeDialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ this.selectedItemTitle }}(수정하기)</v-toolbar-title>
        </v-toolbar>
        <v-card flat class="d-flex flex-column justify-center align-center">
          <v-card class="d-flex ma-12" width="500">
            <v-text-field
              v-model="selectedItemTitle"
              class="ma-8" label="상품명"
            >
            </v-text-field>
            <v-btn icon absolute top right @click="saveTitle(selectedItemIndex)"><v-icon large>mdi-content-save</v-icon></v-btn>
          </v-card>

          <v-card class="d-flex ma-12" width="500">
            <v-file-input
              v-model="menuImage"
              placeholder="메뉴 대표 사진을 선택 해주세요."
              prepend-icon="mdi-image"
              class="ma-8"
              dense
              @change="updateMenuImage"
            >
            </v-file-input>
            <v-btn icon absolute top right @click="saveImage(selectedItemIndex)"><v-icon large>mdi-content-save</v-icon></v-btn>
          </v-card>

          <v-card class="d-flex justify-center ma-12" width="500">
            <v-textarea
              v-model="selectedItemDescription"
              placeholder="수정하고 싶은 상품설명으로 적어주세요."
              dense
              auto-grow
              class="ma-8"
              label="상품설명"
            ></v-textarea>
            <v-btn icon absolute top right @click="saveDescription(selectedItemIndex)"><v-icon large>mdi-content-save</v-icon></v-btn>
          </v-card>

          <v-card class="d-flex ma-12" width="500">
            <v-text-field
              v-model="selectedItemPrice"
              placeholder="가격을 적어주세요. 단위는 자동으로 전환 됩니다."
              dense
              auto-grow
              class="ma-8"
              label="가격"
              prepend-icon="mdi-currency-krw"
            ></v-text-field>
            <v-btn icon absolute top right @click="savePrice(selectedItemIndex)"><v-icon large>mdi-content-save</v-icon></v-btn>
          </v-card>
        </v-card>

      </v-card>
    </v-dialog>
    <!--삭제 다이얼로그-->
    <v-dialog
      v-model="del"
      max-width="400"
      hide-overlay
    >
      <v-card>
        <v-card flat>
          <v-card-title>정말 삭제 하시겠습니까?</v-card-title>
          <p class="ml-4"><v-icon color="red">mdi-alert-circle-outline</v-icon>삭제한 데이터는 복구할 수 없습니다.</p>
        </v-card>
        <v-card flat class="d-flex justify-center">
          <v-card-actions>
            <v-btn width="100" @click="deleteMenu(selectedItemIndex)">삭제하기</v-btn>
            <v-btn width="100" @click="closeDialog">취소</v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Bus } from '@/main.js'
export default {
  data () {
    return {
      edit: false,
      del: false,
      update: false,
      menuTitle: '',
      menuDescription: '',
      menuPrice: '',
      selectedItemIndex: -1,
      selectedItemTitle: '',
      selectedItemDescription: '',
      selectedItemPrice: '',
      emptyDesert: [],
      menuImage: [],
      menuImageURL: '',
      price: '',
      admin: false
    }
  },
  props: [
    'desert',
    'id'
  ],
  filters: {
    comma (val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  created () {
    Bus.$on('adminValue', (data) => {
      this.admin = data
    })
  },
  mounted () {
  },
  methods: {
    saveTitle () {
      this.$firebase.database().ref().child('menu').child('desert').child(this.selectedItemIndex).update({ title: this.selectedItemTitle })
    },
    saveDescription () {
      this.$firebase.database().ref().child('menu').child('desert').child(this.selectedItemIndex).update({ description: this.selectedItemDescription })
    },
    savePrice () {
      this.menuPrice = this.selectedItemPrice
      this.$firebase.database().ref().child('menu').child('desert').child(this.selectedItemIndex).update({ price: this.selectedItemPrice })
    },
    saveImage () {
      this.$firebase.database().ref().child('menu').child('desert').child(this.selectedItemIndex).update({ picture: this.menuImageURL })
    },
    updateMenu () {
      if (!this.desert) {
        this.emptyDesert.push({
          title: this.menuTitle,
          description: this.menuDescription,
          price: this.price,
          picture: this.menuImageURL
        })
        this.$firebase.database().ref().child('menu').update({ desert: this.emptyDesert })
      } else {
        this.desert.push({
          title: this.menuTitle,
          description: this.menuDescription,
          price: this.price,
          picture: this.menuImageURL
        })
        this.$firebase.database().ref().child('menu').update({ desert: this.desert })
      }
      this.menuTitle = ''
      this.menuDescription = ''
      this.price = ''
      this.menuImage = []
      this.menuImageURL = ''
      this.update = false
    },
    async updateMenuImage () {
      var sn = await this.$firebase.storage().ref().child('desert').child(this.menuTitle).put(this.menuImage)
      var url = await sn.ref.getDownloadURL()
      this.menuImageURL = url
    },
    openEditDialog (index) {
      this.edit = true
      this.selectedItemIndex = index
      this.selectedItemTitle = this.desert[this.selectedItemIndex].title
      this.selectedItemDescription = this.desert[this.selectedItemIndex].description
      this.selectedItemPrice = this.desert[this.selectedItemIndex].price
    },
    closeDialog () {
      this.edit = false
      this.del = false
      this.update = false
      this.selectedItemTitle = ''
      this.selectedItemDescription = ''
      this.menuTitle = ''
      this.menuDescription = ''
    },
    openDeleteDialog (index) {
      this.del = true
      this.selectedItemIndex = index
    },
    deleteMenu (index) {
      var title = this.desert[index].title
      this.desert.splice(index, 1)
      this.del = false
      this.$firebase.database().ref().child('menu').update({ desert: this.desert })
      this.$firebase.storage().ref().child('desert').child(title).delete()
    }
  }
}
</script>
