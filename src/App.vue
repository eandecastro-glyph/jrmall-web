<template>
  <v-app>
    <Header/>
    <!-- <SubHeader/> -->
    <v-main>
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Header from './components/Header';
// import SubHeader from './components/SubHeader'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,Footer
  },
  data: () => ({
    //
  }),
  beforeMount(){
    document.title = `Load`;
  },
  watch: {
    $route(to) {
      document.title = `${to.meta.title}`;
      // const link = document.querySelector("[rel='icon']")
      // link.setAttribute('href',to.meta.icon)
    }
  }
};
</script>
