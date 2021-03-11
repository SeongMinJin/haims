<template>
  <div>
    <Header></Header>
    <v-container class="d-flex justify-center align-center">
    <GmapMap
      :center="{lat:35.84939, lng:129.16896}"
      :zoom="17"
      map-type-id="roadmap"
      style="width: 500px; height: 300px"
    >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="clickMarker"
    />
    </GmapMap>
    </v-container>
    <v-container class="d-flex justify-center">
      <v-card
        width="400">
        <h3>경주시 충현로4길-8, 1층 하임스카페</h3>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {

  components: {
    Header
  },

  data () {
    return {
      markers: [
        {
          position: {
            lat: 35.84939,
            lng: 129.16896
          }
        }
      ]
    }
  },
  methods: {
    clickMarker: function () {
      this.$dialog.confirm({ text: "경주시 충현로4길-8, 1층  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Natgeologo.svg/1200px-Natgeologo.svg.png' height=100/>" })
    }
  }
}

</script>
