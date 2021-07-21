<template>
  <div id="slide-wrapper">
    <v-container class="fill-height pa-0" fluid>
      <v-carousel
        hide-delimiter-background
      >
        <v-carousel-item
          v-for="color in colors"
          :key="color"
        >
          <v-sheet
            color="red"
            height="100%"
            tile
          >
            <v-row
              class="fill-height"
            >
              <div class="py-0" style="width: 100%; height: 100%">
                <v-img
                  eager
                  contain
                  height="361px"
                  width="100%"
                  src="../assets/images/slide_1.png"
                />
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script>

  export default {
    data(){
      return {
        colors: [
          'primary',
          'secondary',
          'yellow darken-2',
          'red',
          'orange',
        ],
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/HomeStyles.css';
</style>