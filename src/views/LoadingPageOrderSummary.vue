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
          <v-dialog                                  
          v-model="paymentSummaryDialog"
          persistent
          width="30%"
          height="100%"
          @keydown.esc="closePaymentSummaryDialog()"
          >
            <v-card
                class="my-auto"
                height="80%"
                width="100%"
                elevation="0"
            >
                <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-toolbar-title>SUMMARY</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    x-small
                    @click="closePaymentSummaryDialog()"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                <v-container>
                    <v-layout column>
                        <v-flex class="mx-auto mb-n4" lg12 md12 sm12>
                        <v-icon color="green" x-large v-if="cardholderDetails.status == 'PAID'">
                            mdi-checkbox-marked-circle
                        </v-icon>
                        <v-icon color="red" x-large v-if="cardholderDetails.status == 'CANCELLED' || cardholderDetails.status == 'FAILED' || cardholderDetails.status == 'PENDING'">
                            mdi-close-circle-outline
                        </v-icon>
                        </v-flex>
                        <v-flex class="mx-auto" lg12 md12 sm12>
                        <v-card-subtitle v-if="cardholderDetails.status == 'PAID'" class="justify-center green--text">Payment Successful</v-card-subtitle>
                        <v-card-subtitle v-if="cardholderDetails.status == 'CANCELLED' || cardholderDetails.status == 'FAILED' || cardholderDetails.status == 'PENDING'" class="justify-center red--text">Payment Failed</v-card-subtitle>
                        </v-flex>
                        <v-flex lg12 md12 sm12>
                        <v-img
                        class="mx-auto mt-n2"
                        contain
                        height="50%"
                        width="50%"
                        :src="cardholderDetails.productImage"
                        ></v-img>
                        </v-flex>
                        <v-flex lg12 md12 sm12>
                            <v-card-title class="justify-center">{{cardholderDetails.productName}} {{cardholderDetails.productPrice}}</v-card-title>
                        </v-flex>
                        <v-flex lg12 md12 sm12>
                        <v-row>
                            <v-card-subtitle>Customer's Name</v-card-subtitle>
                            <v-spacer></v-spacer>
                            <v-card-subtitle>{{cardholderDetails.cardholdersFullName}}</v-card-subtitle>
                        </v-row>
                        </v-flex>
                        <v-flex lg12 md12>
                        <v-row>
                            <v-card-subtitle>Billing Address</v-card-subtitle>
                            <v-spacer></v-spacer>
                            <v-card-subtitle>{{cardholderDetails.cardholderAddress}}</v-card-subtitle>
                        </v-row>
                        </v-flex>
                        <v-flex lg12 md12>
                        <v-row>
                            <v-card-subtitle>Email Address</v-card-subtitle>
                            <v-spacer></v-spacer>
                            <v-card-subtitle>{{cardholderDetails.cardholderEmailAddress}}</v-card-subtitle>
                        </v-row>
                        </v-flex>
                        <v-flex lg12 md12>
                        <v-row>
                            <v-card-subtitle>Mobile Number</v-card-subtitle>
                            <v-spacer></v-spacer>
                            <v-card-subtitle>{{cardholderDetails.cardholderMobileNumber}}</v-card-subtitle>
                        </v-row>
                        </v-flex>
                        <v-flex lg12 md12>
                        <v-row>
                            <v-card-subtitle class="font-weight-regular">Reference ID</v-card-subtitle>
                            <v-spacer></v-spacer>
                            <v-card-subtitle>{{cardholderDetails.referenceId}}</v-card-subtitle>
                        </v-row>
                        </v-flex>
                        <v-flex lg12 md12>
                        </v-flex>
                        <v-flex lg12 md12>
                        <v-row>
                            <v-card-title class="font-weight-bold">Total Amount:</v-card-title>
                            <v-spacer></v-spacer>
                            <v-card-title class="font-weight-bold">₱{{formatPrice(cardholderDetails.productPrice)}}.00</v-card-title>
                        </v-row>
                        </v-flex>
                    </v-layout>
                </v-container>
                </v-card-text>
            </v-card>
          </v-dialog>
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
    <v-container class="pa-0" v-if="userMobileOperator" :id="$vuetify.breakpoint.mdAndUp ? 'loading-products' : '' ">
        <v-layout row>
          <v-flex lg12 md12 sm12>
            <LoadProducts v-on:submitProduct="storeProductData($event)" :isSelected="isSelected" :products="isRegularLoad == true ? testLoad : testData"/>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex lg12 md12 sm12>
            <v-btn
            block
            rounded
            color="#152C59"
            class="white--text"
            @click.stop="openPaymentDialog()"
            height="50px"
            >
            SUBMIT
            </v-btn>
            <v-dialog                                  
            v-model="paymentSummaryDialog"
            persistent
            width="30%"
            height="100%"
            @keydown.esc="closePaymentSummaryDialog()"
            >
            <v-card
                class="my-auto"
                height="80%"
                width="100%"
                elevation="0"
            >
                <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-toolbar-title>SUMMARY</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    x-small
                    @click="closePaymentSummaryDialog()"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                <v-container>
                    <v-layout column>
                        <v-flex class="mx-auto mb-n4" lg12 md12 sm12>
                        <v-icon color="green" x-large v-if="cardholderDetails.status == 'PAID'">
                            mdi-checkbox-marked-circle
                        </v-icon>
                        <v-icon color="red" x-large v-if="cardholderDetails.status == 'CANCELLED' || cardholderDetails.status == 'FAILED' || cardholderDetails.status == 'PENDING'">
                            mdi-close-circle-outline
                        </v-icon>
                        </v-flex>
                        <v-flex class="mx-auto" lg12 md12 sm12>
                        <v-card-subtitle v-if="cardholderDetails.status == 'PAID'" class="justify-center green--text">Payment Successful</v-card-subtitle>
                        <v-card-subtitle v-if="cardholderDetails.status == 'CANCELLED' || cardholderDetails.status == 'FAILED' || cardholderDetails.status == 'PENDING'" class="justify-center red--text">Payment Failed</v-card-subtitle>
                        </v-flex>
                        <v-flex lg12 md12 sm12>
                        <v-img
                        class="mx-auto mt-n2"
                        contain
                        height="50%"
                        width="50%"
                        :src="cardholderDetails.productImage"
                        ></v-img>
                        </v-flex>
                        <v-flex lg12 md12 sm12>
                            <v-card-title class="justify-center">{{cardholderDetails.productName}} {{cardholderDetails.productPrice}}</v-card-title>
                        </v-flex>
                        <v-flex lg12 md12 sm12>
                        <v-row>
                            <v-card-subtitle>Customer's Name</v-card-subtitle>
                            <v-spacer></v-spacer>
                            <v-card-subtitle>{{cardholderDetails.cardholdersFullName}}</v-card-subtitle>
                        </v-row>
                        </v-flex>
                        <v-flex lg12 md12>
                        <v-row>
                            <v-card-subtitle>Billing Address</v-card-subtitle>
                            <v-spacer></v-spacer>
                            <v-card-subtitle>{{cardholderDetails.cardholderAddress}}</v-card-subtitle>
                        </v-row>
                        </v-flex>
                        <v-flex lg12 md12>
                        <v-row>
                            <v-card-subtitle>Email Address</v-card-subtitle>
                            <v-spacer></v-spacer>
                            <v-card-subtitle>{{cardholderDetails.cardholderEmailAddress}}</v-card-subtitle>
                        </v-row>
                        </v-flex>
                        <v-flex lg12 md12>
                        <v-row>
                            <v-card-subtitle>Mobile Number</v-card-subtitle>
                            <v-spacer></v-spacer>
                            <v-card-subtitle>{{cardholderDetails.cardholderMobileNumber}}</v-card-subtitle>
                        </v-row>
                        </v-flex>
                        <v-flex lg12 md12>
                        <v-row>
                            <v-card-subtitle class="font-weight-regular">Reference ID</v-card-subtitle>
                            <v-spacer></v-spacer>
                            <v-card-subtitle>{{cardholderDetails.referenceId}}</v-card-subtitle>
                        </v-row>
                        </v-flex>
                        <v-flex lg12 md12>
                        <v-row>
                            <v-card-subtitle class="font-weight-regular">Partner ID</v-card-subtitle>
                            <v-spacer></v-spacer>
                            <v-card-subtitle>{{cardholderDetails.partnerId}}</v-card-subtitle>
                        </v-row>
                        </v-flex>
                        <v-flex lg12 md12>
                        <v-row>
                            <v-card-title class="font-weight-bold">Total Amount:</v-card-title>
                            <v-spacer></v-spacer>
                            <v-card-title class="font-weight-bold">₱{{formatPrice(cardholderDetails.productPrice)}}.00</v-card-title>
                        </v-row>
                        </v-flex>
                    </v-layout>
                </v-container>
                </v-card-text>
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
            testLoad: [
              {
                id: 1,
                productName: 'Globe P10',
                productPrice: 'P10',
                productDesc: 'Regular P10 Load',
                productOrigPrice: 'P20'
              },
              {
                id: 2,
                productName: 'Globe P20',
                productPrice: 'P20',
                productDesc: 'Regular P20 Load',
                productOrigPrice: 'P30'
              },
              {
                id: 3,
                productName: 'Globe P30',
                productPrice: 'P30',
                productDesc: 'Regular P30 Load',
                productOrigPrice: 'P40'
              },
              {
                id: 4,
                productName: 'Globe P40',
                productPrice: 'P40',
                productDesc: 'Regular P40 Load',
                productOrigPrice: 'P50'
              },
              {
                id: 5,
                productName: 'Globe P50',
                productPrice: 'P50',
                productDesc: 'Regular P50 Load',
                productOrigPrice: 'P60'
              },
              {
                id: 6,
                productName: 'Globe P60',
                productPrice: 'P60',
                productDesc: 'Regular P60 Load',
                productOrigPrice: 'P70'
              }
            ],
            testData: [
              {
                id: 1,
                productName: 'Data P10',
                productPrice: 'P10',
                productDesc: 'Regular P10 Data',
                productOrigPrice: 'P20'
              },
              {
                id: 2,
                productName: 'Data P20',
                productPrice: 'P20',
                productDesc: 'Regular P20 Data',
                productOrigPrice: 'P30'
              },
              {
                id: 3,
                productName: 'Data P30',
                productPrice: 'P30',
                productDesc: 'Regular P30 Data',
                productOrigPrice: 'P40'
              },
              {
                id: 4,
                productName: 'Data P40',
                productPrice: 'P40',
                productDesc: 'Regular P40 Data',
                productOrigPrice: 'P50'
              },
              {
                id: 5,
                productName: 'Data P50',
                productPrice: 'P50',
                productDesc: 'Regular P50 Data',
                productOrigPrice: 'P60'
              },
              {
                id: 6,
                productName: 'Data P60',
                productPrice: 'P60',
                productDesc: 'Regular P60 Data',
                productOrigPrice: 'P70'
              }
            ],
            isSelected: false,
            productData: {},
            paymentDialog: false,
            cardholderDetails: {
                cardholdersFullName: null,
                cardholderAddress: null,
                cardholderEmailAddress: null,
                cardholderMobileNumber: null,
                referenceId: null,
                productName: null,
                productImage: null,
                productPrice: null,
                status: null,
                sku: null,
                partnerId: null
            },
            paymentSummaryDialog: true,
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
    },
    beforeCreate(){
      this.$store.dispatch("orders/getOrderDetails", this.$route.params.id).then((res) => {
        if(res != undefined){
          this.paymentSummaryDialog = true;
          this.cardholderDetails.productName = res.productName;
          this.cardholderDetails.productImage = res.productImage;
          this.cardholderDetails.cardholdersFullName = res.cardholdersFullName;
          this.cardholderDetails.cardholderAddress = res.cardholderAddress;
          this.cardholderDetails.cardholderEmailAddress = res.cardholderEmailAddress;
          this.cardholderDetails.cardholderMobileNumber = res.cardholderMobileNumber;
          this.cardholderDetails.productPrice = res.productPrice;
          this.cardholderDetails.referenceId = res.referenceId;
          this.cardholderDetails.status = res.status;
          this.cardholderDetails.sku = res.sku;


          // if(res.status == 'PAID'){
          //   this.$gtag.event('Payment Result', {
          //     'event_category': 'Success',
          //     'event_label': this.cardholderDetails.sku,
          //     'value': this.cardholderDetails.productPrice
          //   })
          // }else{
          //   this.$gtag.event('Payment Result', {
          //     'event_category': 'Failed',
          //     'event_label': this.cardholderDetails.sku,
          //     'value': this.cardholderDetails.productPrice
          //   })
          // }
        }else{
          this.$router.push({name: 'PageNotFound'});
        }
        
      })
    },
    methods: {
        selectingProduct(){
          this.isSelected = !this.isSelected;
        },
        storeProductData(data){
          this.productData = {...data};
        },
        proceedPayment(){
          console.log(this.productData)
        },
        openPaymentDialog(){
          this.$v.userMobileNumber.$touch();
          if(!this.$v.userMobileNumber.$invalid){
            this.$v.userMobileNumber.$reset();
            this.paymentDialog = true;
          }
        },
        closePaymentSummaryDialog(){
            this.$router.push({path: `/`});
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