<template>
  <div id="loading-wrapper">
    <v-container :class="$vuetify.breakpoint.mdAndUp ? 'fill-height mt-12' : 'mt-12 pa-0'" :id="$vuetify.breakpoint.mdAndUp ? 'loading-form' : '' " fluid>
        <v-card
            class="mx-auto mt-12"
            height="100%"
            width="100%"
            elevation="0"
            color="white"
        >
            <v-card-text>
                <p class="display-1 text--primary" align="center">
                    Top up your Mobile Phones
                </p>
                <v-container class="fill-height">
                    <v-row>
                        <v-flex :style="$vuetify.breakpoint.smAndDown ? 'width: 521px' : ''" lg12 md12 sm12>
                            <v-text-field
                            :class="$vuetify.breakpoint.mdAndUp ? 'px-10 mt-5 mx-auto' : 'mt-4 mx-auto'"
                            :style="$vuetify.breakpoint.mdAndUp ? 'width: 60%' : 'width: 80%'"
                            v-model="userMobileNumber"
                            :error-messages="userMobileNumberErrors"
                            label="Prepaid Phone Number (e.g. 09151234567)"
                            @input="checkMobileOperator()"
                            required
                            outlined
                            ></v-text-field>
                        </v-flex>
                        <v-flex :style="$vuetify.breakpoint.smAndDown ? 'width: 521px' : ''" lg12 md12 sm12>
                            <v-text-field
                            :class="$vuetify.breakpoint.mdAndUp ? 'px-10 mx-auto' : 'mt-4 mx-auto'"
                            :style="$vuetify.breakpoint.mdAndUp ? 'width: 60%' : 'width: 80%'"
                            :value="userMobileOperator"
                            label="Operator"
                            disabled
                            required
                            outlined
                            ></v-text-field>
                        </v-flex>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
    <v-container class="pa-0 mt-4" v-if="!userMobileOperator" :id="$vuetify.breakpoint.mdAndUp ? 'loading-products' : '' ">
        <v-layout row>
          <v-flex lg12 md12 sm12>
            <v-img
            :class="$vuetify.breakpoint.mdAndUp ? 'mx-auto' : 'mx-auto' "
            alt="JoyRide Mall Logo"
            :height="$vuetify.breakpoint.mdAndUp ? '315px' : '100px'"
            :width="$vuetify.breakpoint.mdAndUp ? '1200px' : '300px'"
            contain
            eager
            src="../assets/images/jrmall_banner.jpg"
            transition="scale-transition"
            />
          </v-flex>
        </v-layout>
    </v-container>
    <v-container class="pa-0" v-if="userMobileOperator" :id="$vuetify.breakpoint.mdAndUp ? 'loading-tabs' : '' " fluid>
        <v-divider></v-divider>
        <!-- <v-toolbar
        color="white"
        width="100%"
        flat
        >
            <v-tabs color="#76AAD3" centered>
            <v-row>
              <v-flex lg6 md6 sm12>
                <v-tab style="color: #152C59" @click="isRegularLoad = true">Regular Load</v-tab>
              </v-flex>
              <v-flex lg6 md6 sm12>
                <v-tab style="color: #152C59" @click="isRegularLoad = false">Data</v-tab>
              </v-flex>
            </v-row>
            </v-tabs>  
        </v-toolbar> -->
        <v-row class="mt-1">
          <v-flex class="text-right" lg6 md6 sm12>
            <v-btn depressed tile outlined elevation="0" :style="isRegularLoad? 'border-top: 0; border-left: 0; border-right: 0; border-bottom: 2px solid #76AAD3; color: #152C59': 'border-top: 0; border-left: 0; border-right: 0; border-bottom: 0; color: #152C59'" @click="isRegularLoad = true">Regular Load</v-btn>
            <!-- <v-tabs color="#76AAD3" right>
              <v-tab style="color: #152C59" @click="isRegularLoad = true">Regular Load</v-tab>
            </v-tabs> -->
          </v-flex>
          <v-flex lg6 md6 sm12>
            <v-btn depressed tile outlined elevation="0" :style="isRegularLoad? 'border-top: 0; border-left: 0; border-right: 0; border-bottom: 0; color: #152C59': 'border-top: 0; border-left: 0; border-right: 0; border-bottom: 2px solid #76AAD3; color: #152C59'" @click="isRegularLoad = false">Data</v-btn>
          </v-flex>
        </v-row>
        <v-divider class="mt-4"></v-divider>
    </v-container>
    <v-container class="pa-0 mt-4" v-if="userMobileOperator" :id="$vuetify.breakpoint.mdAndUp ? 'loading-products' : '' ">
        <v-layout id="products" row>
          <v-flex  lg12 md12 sm12>
            <LoadProducts v-on:submitProduct="storeProductData($event)" :products="isRegularLoad == true ? testLoad : testData"/>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex lg12 md12 sm12>
            <div class="text-center mt-8">
              <v-btn
              rounded
              color="#152C59"
              class="white--text"
              @click.stop="openPaymentDialog()"
              height="50px"
              width="521px"
              >
              TOP UP NOW
              </v-btn>
            </div>
            
            <v-dialog
              transition="dialog-bottom-transition"
              v-model="paymentDialog"
              persistent
              width="70%"
              height="70%"
              @keydown.esc="closePaymentDialog()"
            >
              <v-card
                class="mx-auto"
                height="100%"
                width="100%"
                elevation="0"
              >
                <v-layout fill-height column>
                  <v-flex lg12 md12 sm12>
                    <v-toolbar flat>
                      <v-spacer></v-spacer>
                      
                      <v-toolbar-title style="color: #152C59" centered>CUSTOMER INFORMATION</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                        icon
                        @click="closePaymentDialog()"
                        :disabled="disableButton"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-progress-linear
                      indeterminate
                      color="#152C59"
                      v-if="isLoadingPaymentUrl"
                    ></v-progress-linear>
                  </v-flex>
                  <v-flex lg12 md12 sm12>
                    <v-card-text>
                      <v-container class="fill-height">                                                 
                        <v-layout row wrap>
                          <v-flex lg6 md6 sm12>
                            <v-card
                            class="mx-auto"
                            height="100%"
                            width="100%"
                            color="white"
                            elevation="0"
                            flat
                            >
                              <v-layout row wrap>
                                <v-flex lg12 md12 sm12>
                                  <v-card-title class="mx-2"><h4>Amount to Pay: </h4></v-card-title>
                                </v-flex>
                                <v-flex lg12 md12 sm12>
                                  <v-text-field
                                  class="px-5"
                                  v-model="cardholderFirstName"
                                  :error-messages="cardholderFirstNameErrors"
                                  label="Customer's First Name"
                                  required
                                  @input="$v.cardholderFirstName.$touch()"
                                  @blur="$v.cardholderFirstName.$touch()"
                                  outlined
                                  ></v-text-field>
                                </v-flex>
                                <v-flex lg12 md12 sm12>
                                  <v-text-field
                                  class="px-5"
                                  v-model="cardholderLastName"
                                  :error-messages="cardholderLastNameErrors"
                                  @input="$v.cardholderLastName.$touch()"
                                  @blur="$v.cardholderLastName.$touch()"
                                  label="Customer's Last Name"
                                  required
                                  outlined
                                  ></v-text-field>
                                </v-flex>
                                <v-flex lg12 md12 sm12>
                                  <v-textarea
                                  class="px-5"
                                  label="First Line of the Customer's Billing Address:"
                                  no-resize
                                  rows="4"
                                  :error-messages="cardholderBillingAddressFirstLineErrors"
                                  v-model="cardholderBillingAddressFirstLine"
                                  @input="$v.cardholderBillingAddressFirstLine.$touch()"
                                  @blur="$v.cardholderBillingAddressFirstLine.$touch()"
                                  outlined
                                  ></v-textarea>
                                </v-flex>
                                <v-flex lg12 md12 sm12>
                                  <v-textarea
                                  class="px-5"
                                  label="Second Line of the Customer's Billing Address:"
                                  no-resize
                                  rows="4"
                                  :error-messages="cardholderBillingAddressSecondLineErrors"
                                  v-model="cardholderBillingAddressSecondLine"
                                  @input="$v.cardholderBillingAddressSecondLine.$touch()"
                                  @blur="$v.cardholderBillingAddressSecondLine.$touch()"
                                  outlined
                                  ></v-textarea>
                                </v-flex>
                              </v-layout>
                            </v-card> 
                          </v-flex>
                          <v-flex lg6 md6 sm12>
                            <v-card
                            class="mx-auto"
                            height="100%"
                            width="100%"
                            color="white"
                            elevation="0"
                            flat>
                              <v-layout row wrap>
                                <v-flex lg12 md12 sm12>
                                  <v-card-title class="mx-2 justify-end"><h4>₱{{formatPrice(productData.productPrice)}}.00</h4></v-card-title>
                                </v-flex>
                                <v-flex lg12 md12 sm12>
                                  <v-text-field
                                  class="px-5"
                                  :error-messages="cardholderBillingAddressCityErrors"
                                  v-model="cardholderBillingAddressCity"
                                  @input="$v.cardholderBillingAddressCity.$touch()"
                                  @blur="$v.cardholderBillingAddressCity.$touch()"                                                                               
                                  label="The City of the Customer's Billing Address"
                                  required
                                  outlined
                                  ></v-text-field>
                                </v-flex>
                                <v-flex lg12 md12 sm12>
                                  <v-text-field
                                  class="px-5"
                                  :error-messages="cardholderBillingAddressPostalCodeErrors"
                                  v-model="cardholderBillingAddressPostalCode"                 
                                  @input="$v.cardholderBillingAddressPostalCode.$touch()"
                                  @blur="$v.cardholderBillingAddressPostalCode.$touch()"                      
                                  label="Zip/Postal Code of the Customer's Billing Address"
                                  required
                                  outlined
                                  ></v-text-field>
                                </v-flex>
                                <v-flex lg12 md12 sm12>
                                  <v-text-field
                                  class="px-5"
                                  :error-messages="emailAddressErrors"
                                  v-model="emailAddress"     
                                  @input="$v.emailAddress.$touch()"
                                  @blur="$v.emailAddress.$touch()"                                 
                                  label="Email Address"
                                  required
                                  outlined
                                  ></v-text-field>
                                </v-flex>
                                <v-flex lg12 md12 sm12>
                                  <v-text-field
                                  class="px-5"
                                  :error-messages="mobileNumberErrors"
                                  v-model="mobileNumber"  
                                  @input="$v.mobileNumber.$touch()"
                                  @blur="$v.mobileNumber.$touch()"                                   
                                  label="Mobile Number"
                                  required
                                  outlined
                                  ></v-text-field>         
                                </v-flex>
                                <v-flex lg12 md12 sm12>
                                  <div class="ml-5">
                                    <v-checkbox 
                                    :error-messages="termsAndConditionCheckboxErrors"
                                    v-model="termsAndConditionCheckbox">
                                      <template v-slot:label>
                                        <div>
                                          I agree to the
                                          <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                              <a
                                                target="_blank"
                                                href="https://www.findshare.com/"
                                                @click.stop
                                                v-on="on"
                                              >
                                                Terms and Conditions
                                              </a>
                                            </template>
                                            Opens in new window
                                          </v-tooltip>
                                        .
                                        </div>
                                      </template>
                                    </v-checkbox>
                                  </div>
                                </v-flex>
                                <v-flex lg12 md12 sm12>
                                  <v-card-actions  class="justify-center">
                                    <v-flex  class="px-3" lg12 md12 sm12>
                                      <v-btn
                                          block
                                          class="white--text"
                                          color="#152C59"
                                          style="position: absolute; bottom: 1%; margin-bottom: 1px"
                                          @click="submitPaymentSummary()"
                                          :disabled="isLoadingPaymentUrl"
                                      >
                                          PAY NOW
                                      </v-btn>
                                    </v-flex>
                                  </v-card-actions>
                                </v-flex>
                              </v-layout>
                            </v-card> 
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, helpers, numeric, maxLength, sameAs } from 'vuelidate/lib/validators';
import LoadProducts from '../components/LoadProducts';
const mobileNumValidator = helpers.regex('mobileNumValid', /^(09)\d{9}$/);
const emailValidator = helpers.regex('emailValid', /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const nameValidator = helpers.regex('nameValid', /^[a-zA-Z ]+$/);

export default {
    components: {
      LoadProducts
    },
    mixins: [validationMixin],
    data(){
        return {
            userMobileNumber: null,
            userMobileOperator: null,
            isRegularLoad: true,
            allProducts: [],
            // testLoad: [
            //   {
            //     id: 1,
            //     productName: 'Globe P10',
            //     productPrice: 10,
            //     productDesc: 'Regular P10 Load',
            //     productOrigPrice: 20,
            //     isSelected: false
            //   },
            //   {
            //     id: 2,
            //     productName: 'Globe P20',
            //     productPrice: 20,
            //     productDesc: 'Regular P20 Load',
            //     productOrigPrice: 30,
            //     isSelected: false
            //   },
            //   {
            //     id: 3,
            //     productName: 'Globe P30',
            //     productPrice: 30,
            //     productDesc: 'Regular P30 Load',
            //     productOrigPrice: 40,
            //     isSelected: false
            //   },
            //   {
            //     id: 4,
            //     productName: 'Globe P40',
            //     productPrice: 40,
            //     productDesc: 'Regular P40 Load',
            //     productOrigPrice: 50,
            //     isSelected: true
            //   },
            //   {
            //     id: 5,
            //     productName: 'Globe P50',
            //     productPrice: 50,
            //     productDesc: 'Regular P50 Load',
            //     productOrigPrice: 60,
            //     isSelected: false
            //   },
            //   {
            //     id: 6,
            //     productName: 'Globe P60',
            //     productPrice: 60,
            //     productDesc: 'Regular P60 Load',
            //     productOrigPrice: 70,
            //     isSelected: false
            //   }
            // ],
            // testData: [
            //   {
            //     id: 1,
            //     productName: 'Data P10',
            //     productPrice: 'P10',
            //     productDesc: 'Regular P10 Data',
            //     productOrigPrice: 'P20'
            //   },
            //   {
            //     id: 2,
            //     productName: 'Data P20',
            //     productPrice: 'P20',
            //     productDesc: 'Regular P20 Data',
            //     productOrigPrice: 'P30'
            //   },
            //   {
            //     id: 3,
            //     productName: 'Data P30',
            //     productPrice: 'P30',
            //     productDesc: 'Regular P30 Data',
            //     productOrigPrice: 'P40'
            //   },
            //   {
            //     id: 4,
            //     productName: 'Data P40',
            //     productPrice: 'P40',
            //     productDesc: 'Regular P40 Data',
            //     productOrigPrice: 'P50'
            //   },
            //   {
            //     id: 5,
            //     productName: 'Data P50',
            //     productPrice: 'P50',
            //     productDesc: 'Regular P50 Data',
            //     productOrigPrice: 'P60'
            //   },
            //   {
            //     id: 6,
            //     productName: 'Data P60',
            //     productPrice: 'P60',
            //     productDesc: 'Regular P60 Data',
            //     productOrigPrice: 'P70'
            //   }
            // ],
            productData: {
              productAlias: null,
              productPrice: null,
              productSku: null,
              productOrigPrice: null,
              productImage: null
            },
            paymentDialog: false,
            disableButton: false,
            isLoadingPaymentUrl: false,
            cardholderFirstName: '',
            cardholderLastName: '',
            cardholderBillingAddressFirstLine: '',
            cardholderBillingAddressSecondLine: '',
            cardholderBillingAddressCity: '',
            cardholderBillingAddressPostalCode: '',
            emailAddress: '',
            mobileNumber: '',
            termsAndConditionCheckbox: false,
        }
    },
    validations(){
      return {
        userMobileNumber: {
          required,
          mobileNumValidator
        },
        cardholderFirstName: {
          required,
          nameValidator
        },
        cardholderLastName: {
          required,
          nameValidator
        },
        cardholderBillingAddressFirstLine: {
          required,
          maxLength: maxLength(200)
        },
        cardholderBillingAddressSecondLine: {
          maxLength: maxLength(200)
        },
        cardholderBillingAddressCity: {
          required,
          maxLength: maxLength(15),
          nameValidator
        },
        cardholderBillingAddressPostalCode: {
          required,
          numeric,
          maxLength: maxLength(4)
        },
        emailAddress: {
          required,
          emailValidator
        },
        mobileNumber: {
          required,
          mobileNumValidator
        },
        termsAndConditionCheckbox: {
          sameAs: sameAs( () => true )
        }
      }
    },
    computed: {
      userMobileNumberErrors(){
        const errors = []
        if(!this.$v.userMobileNumber.$dirty) return errors
        !this.$v.userMobileNumber.required && errors.push('Mobile Number is required')
        !this.$v.userMobileNumber.mobileNumValidator && errors.push('Mobile Number must be valid')
        return errors
      },
      cardholderFirstNameErrors(){
        const errors = []
        if(!this.$v.cardholderFirstName.$dirty) return errors
        !this.$v.cardholderFirstName.required && errors.push('First Name is required')
        !this.$v.cardholderFirstName.nameValidator && errors.push('First Name must not contain special characters')
        return errors
      },
      cardholderLastNameErrors(){
        const errors = []
        if(!this.$v.cardholderLastName.$dirty) return errors
        !this.$v.cardholderLastName.required && errors.push('Last Name is required')
        !this.$v.cardholderLastName.nameValidator && errors.push('Last Name must not contain special characters')
        return errors
      },
      cardholderBillingAddressFirstLineErrors(){
        const errors = []
        if(!this.$v.cardholderBillingAddressFirstLine.$dirty) return errors
        !this.$v.cardholderBillingAddressFirstLine.required && errors.push('Address First Line is required')
        !this.$v.cardholderBillingAddressFirstLine.maxLength && errors.push('Address First Line exceeds character')
        return errors
      },
      cardholderBillingAddressSecondLineErrors(){
        const errors = []
        if(!this.$v.cardholderBillingAddressSecondLine.$dirty) return errors
        !this.$v.cardholderBillingAddressSecondLine.maxLength && errors.push('Address Second Line exceeds character')
        return errors
      },
      cardholderBillingAddressCityErrors(){
        const errors = []
        if(!this.$v.cardholderBillingAddressCity.$dirty) return errors
        !this.$v.cardholderBillingAddressCity.required && errors.push('Address City is required')
        !this.$v.cardholderBillingAddressCity.maxLength && errors.push('Address City exceeds character')
        !this.$v.cardholderBillingAddressCity.nameValidator && errors.push('City must not contain special characters')
        return errors
      },
      cardholderBillingAddressPostalCodeErrors(){
        const errors = []
        if(!this.$v.cardholderBillingAddressPostalCode.$dirty) return errors
        !this.$v.cardholderBillingAddressPostalCode.required && errors.push('Address Postal Code is required')
        !this.$v.cardholderBillingAddressPostalCode.numeric && errors.push('Address Postal Code must be valid')
        !this.$v.cardholderBillingAddressPostalCode.maxLength && errors.push('Address Postal Code exceeds character')
        return errors
      },
      emailAddressErrors(){
        const errors = []
        if(!this.$v.emailAddress.$dirty) return errors
        !this.$v.emailAddress.required && errors.push('Email Address is required')
        !this.$v.emailAddress.emailValidator && errors.push('Email Address must be valid')
        return errors
      },
      mobileNumberErrors(){
        const errors = []
        if(!this.$v.mobileNumber.$dirty) return errors
        !this.$v.mobileNumber.required && errors.push('Mobile Number is required')
        !this.$v.mobileNumber.mobileNumValidator && errors.push('Mobile Number must be valid')
        return errors
      },
      termsAndConditionCheckboxErrors(){
        const errors = []
        if(!this.$v.termsAndConditionCheckbox.$dirty) return errors
        !this.$v.termsAndConditionCheckbox.sameAs && errors.push('You must agree to terms and conditions')
        return errors
      },
      testLoad(){
        return this.allProducts.filter((elem) => {return elem.type == 'LOAD' && elem.category.toUpperCase() == this.userMobileOperator})
      },
      testData(){
        return this.allProducts.filter((elem) => {return elem.type == 'DATA' && elem.category.toUpperCase() == this.userMobileOperator})
      }
    },
    created(){
      this.$store.dispatch("products/getProductList").then((res) => {
        console.log(res.products)
        this.allProducts = [...res.products];
      })
    },
    methods: {
        submitMessage(){
          if(!this.$v.$invalid){
            this.$store.dispatch("emailService/emailConcerns", {
              
            }).then(() => {
              this.$v.$reset();
              setTimeout(() => {this.isEmailSent = false}, 4000);
              this.userMobileNumber = null;
            })
          }
        },
        selectingProduct(){
          this.isSelected = !this.isSelected;
        },
        storeProductData(data){
          this.productData.productAlias =  data.productAlias;
          this.productData.productPrice =  data.productPrice;
          this.productData.productSku =  data.productSku;
          this.productData.productOrigPrice =  data.productOrigPrice;
          this.productData.productImage =  data.productImage;
        },
        openPaymentDialog(){
          this.$v.userMobileNumber.$touch();
          if(!this.$v.userMobileNumber.$invalid && this.productData.productAlias){
            this.$v.userMobileNumber.$reset();
            this.paymentDialog = true;
            console.log(this.productData)
          }else{
            alert('Please select a product')
          }
        },
        submitPaymentSummary(){
          this.$v.$touch();
          if(!this.$v.$invalid){
            this.isLoadingPaymentUrl = true;
            this.disableButton = true;
            
            this.$store.dispatch("orders/createOrder", {
              user: {
                mobile: this.mobileNumber,
                email: this.emailAddress,
                firstName: this.cardholderFirstName,
                lastName: this.cardholderLastName,
                address1: this.cardholderBillingAddressFirstLine,
                city: this.cardholderBillingAddressCity,
                state: "PH-00",
                zip: this.cardholderBillingAddressPostalCode,
                country: "PH"
              },
              items: [
                  {
                      name: this.productData.productAlias,
                      quantity: 1,
                      amount: this.productData.productPrice
                  }
              ],
              misc: {
                  status: "PENDING",
                  image: this.productData.productImage,
                  sku: this.productData.productImage,
                  address2: this.cardholderBillingAddressSecondLine
              },
              amount: this.productData.productPrice

            }).then((result) => {
              this.productData.productAlias =  null;
              this.productData.productSku =  null;
              this.productData.productOrigPrice =  null;
              this.productData.productImage =  null;
              window.location.replace(result.redirect_url);
            })
          }
        },
        checkMobileOperator(){
          this.$v.userMobileNumber.$touch();
          if(this.userMobileNumber.length == 11){
            this.$store.dispatch("user/verifyMobileOperator", {
              mobileNumber: this.userMobileNumber
            }).then((result) => {
              console.log(result)
              this.userMobileOperator = result.telcoNetwork.toUpperCase()
            })
          }
        },
        closePaymentDialog(){
          this.$v.$reset();
          this.cardholderFirstName = '';
          this.cardholderLastName = '';
          this.cardholderBillingAddressFirstLine = '';
          this.cardholderBillingAddressSecondLine = '';
          this.cardholderBillingAddressCity = '';
          this.cardholderBillingAddressPostalCode = '';
          this.emailAddress = '';
          this.mobileNumber = '';
          this.paymentDialog = false;
        },
        formatPrice(price){
          return new Intl.NumberFormat().format(price);
        }
    }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/LoadingStyles.css';
  
</style>