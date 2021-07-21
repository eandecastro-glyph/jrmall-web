<template>
    <v-app-bar
    fixed
    flat
    height="74px"
    width="100%"
    color="#76AAD3"
    class="pa-0"
    >
        <v-row>
            <v-flex lg3 md3 sm12>
                <div>
                    <v-img
                    :class="$vuetify.breakpoint.mdAndUp ? 'ml-auto' : 'mx-auto' "
                    alt="JoyRide Mall Logo"
                    :height="$vuetify.breakpoint.mdAndUp ? '100px' : '100px'"
                    :width="$vuetify.breakpoint.mdAndUp ? '7em' : '300px'"
                    contain
                    eager
                    style="cursor: pointer"
                    @click="redirectUserToHome()"
                    src="../assets/images/JRMall_logo_white.png"
                    transition="scale-transition"
                    />
                </div>
            </v-flex>
            <v-flex lg5 md5 sm12>
                <v-btn id="no-background-hover" :ripple="false" @click="redirectUserToHome()" depressed tile elevation="0" color="#76AAD3" class="white--text mt-8">Deliver to Enter Address <v-icon>mdi-chevron-down</v-icon></v-btn>
                <!-- <v-toolbar
                color="#76AAD3"
                width="100%"
                flat
                >
                    <v-tabs color="white">
                    <v-tab class="white--text" to="/">Deliver to Enter Address <v-icon>mdi-chevron-down</v-icon></v-tab>
                    <v-tab class="white--text" to="/about">Sign Up or Login</v-tab>
                    <v-tab class="white--text" to="/contact-us"><v-icon color="white">mdi-cart-outline</v-icon> Checkout</v-tab>
                    </v-tabs>  
                </v-toolbar> -->
            </v-flex>
            <v-flex class="text-right" lg2 md2 sm12>
                <v-btn id="no-background-hover" :ripple="false" @click="redirectUserToHome()" depressed tile elevation="0" color="#76AAD3" class="white--text mt-8">Sign Up or Login</v-btn>
            </v-flex>
            <v-flex lg2 md2 sm12>
                <v-btn id="no-background-hover" :ripple="false" @click="redirectUserToCart()" depressed tile elevation="0" color="#76AAD3" class="white--text mt-8"><v-icon color="white">mdi-cart-outline</v-icon> Checkout</v-btn>
            </v-flex>
        </v-row>
    </v-app-bar>
</template>

<script>
    export default {
        data(){
        return {

            }
        },
        methods: {
            redirectUserToHome(){
                window.location.replace("https://jrmall.ph/")
            },
            redirectUserToCart(){
                window.location.replace("hhttps://jrmall.ph/cart/")
            }
        }
    }
    
</script>

<style lang="scss" scoped>
  @import '../assets/css/HeaderStyles.css';
  
</style>