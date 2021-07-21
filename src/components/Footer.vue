<template>
    <div id="footer-wrapper">
        <div id="footer-container">
            <v-card
                class="mx-auto"
                flat
                tile
                elevation="0"
                color="red"
                width="90%"
                height="100%"
            >
                <v-row>
                    <v-flex lg2 md2 sm12>
                        <v-layout class="mt-6" column>
                            <v-flex lg12 md12 sm12>
                                <v-card-title class="py-3 white--text">Quick Links</v-card-title>
                            </v-flex>
                            <v-flex lg12 md12 sm12>
                                <v-card-subtitle class="py-1 white--text">Home</v-card-subtitle>
                                <v-card-subtitle class="py-1 white--text">My Account</v-card-subtitle>
                                <v-card-subtitle class="py-1 white--text">Checkout</v-card-subtitle>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex lg2 md2 sm12>
                        <v-layout class="mt-6" column>
                            <v-flex lg12 md12 sm12>
                                <v-card-title class="py-3 white--text">Support</v-card-title>
                            </v-flex>
                            <v-flex lg12 md12 sm12>
                                <v-card-subtitle class="py-1 white--text">Help Center</v-card-subtitle>
                                <v-card-subtitle class="py-1 white--text">Become A Merchant</v-card-subtitle>
                                <v-card-subtitle class="py-1 white--text">Bulk Orders</v-card-subtitle>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex lg2 md2 sm12>
                        <v-layout class="mt-6" column>
                            <v-flex lg12 md12 sm12>
                                <v-card-title class="py-3 white--text">Follow Us</v-card-title>
                            </v-flex>
                            <v-flex lg12 md12 sm12>
                                <v-card-subtitle class="py-1 white--text">Facebook</v-card-subtitle>
                                <v-card-subtitle class="py-1 white--text">Twitter</v-card-subtitle>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex lg3 md3 sm12>
                        <v-layout class="mt-6" column>
                            <v-flex lg12 md12 sm12>
                                <v-card-title class="py-3 white--text">Payment Methods</v-card-title>
                            </v-flex>
                            <v-flex lg12 md12 sm12>
                                <v-row>
                                    <v-img width="68px" contain height="30px" src="https://jrmall.ph/images/jrpay-icon.png" eager/>
                                    <v-img width="68px" contain height="30px" src="https://jrmall.ph/images/visa.png" eager/>
                                    <v-img width="68px" contain height="30px" src="https://jrmall.ph/images/mastercard.png" eager/>
                                    <v-img width="68px" contain height="30px" src="https://jrmall.ph/images/jcb.png" eager/>
                                    <v-img width="68px" contain height="30px" src="https://jrmall.ph/images/paymaya.png" eager/>
                                    <v-img width="68px" contain height="30px" src="https://jrmall.ph/images/wechat.jpg" eager/>
                                </v-row>
                            </v-flex>
                            <v-flex lg12 md12 sm12>
                                <v-card-title class="py-3 white--text">Delivery Services</v-card-title>
                            </v-flex>
                            <v-flex lg12 md12 sm12>
                                <v-row>
                                    <v-img width="68px" contain height="30px" src="https://jrmall.ph/images/joyride-note-white.png" eager/>
                                    <v-img width="68px" contain height="30px" src="https://jrmall.ph/images/happymove-note.png" eager/>
                                </v-row>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex lg3 md3 sm12>
                        <v-layout class="mt-6" column>
                            <v-flex lg12 md12 sm12>
                                <v-card-title class="py-3 white--text">Access JR Mall in the JoyRide App!</v-card-title>
                            </v-flex>
                            <v-flex lg12 md12 sm12>
                                <v-row>
                                    <v-img width="68px" contain height="30px" src="https://jrmall.ph/images/joyride-logo.png" eager/>
                                    <v-img width="68px" contain height="30px" src="https://jrmall.ph/images/google-play.png" eager/>
                                    <v-img width="68px" contain height="30px" src="https://jrmall.ph/images/app-store.png" eager/>
                                </v-row>
                            </v-flex>
                            
                        </v-layout>
                    </v-flex>
                </v-row>
            </v-card>
        </div>
        <div id="footer-terms">
            <v-card
                flat
                tile
                elevation="0"
                width="90%"
                height="100%"
                color="green"
                class="mx-auto"
            >
                <v-row>
                    <v-flex lg1 md2 sm12>
                        <v-card-title class="white--text">© 2021 JR Mall</v-card-title>
                    </v-flex>
                    <v-flex lg1 md2 sm12>
                        <v-card-title class="white--text">Terms and Conditions</v-card-title>
                    </v-flex>
                    <v-flex lg2 md2 sm12>
                        <v-card-title class="white--text">Privacy Policy</v-card-title>
                    </v-flex>
                </v-row>
            </v-card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
  @import '../assets/css/FooterStyles.css';
  
</style>