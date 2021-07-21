<template>
    <v-row>
        <v-flex v-for="prod, a in products" :key="a.id" lg6 md6 sm12>
            <v-card
            flat
            elevation="2"
            class="mt-4 mb-4"
            width="592px"
            height="94px"
            @click.stop="selectProduct(prod.sku, prod.discountedPrice, prod.alias, prod.sellingPrice, prod.image)"
            :style="prod.isSelected == true ? 'border: 1px solid green;' : 'border-radius: 4px; border: 1px solid #152C59;'"
            >
                <v-card-text>
                    <v-row>
                        <v-flex lg6 md6 sm12>
                            <v-card-title style="color: #152C59" class="pb-0">{{prod.category}} P{{prod.basePrice}}</v-card-title>
                        </v-flex>
                        <v-flex lg6 md6 sm12>
                            <v-card-title style="color: #152C59" class="pb-0 justify-end">₱{{formatPrice(prod.discountedPrice)}}.00</v-card-title>
                        </v-flex>
                        <v-flex lg6 md6 sm12>
                            <v-card-subtitle style="color: #152C59" class="pt-0">Regular Load P{{prod.basePrice}}</v-card-subtitle>
                        </v-flex>
                        <v-flex lg6 md6 sm12>
                            <v-card-subtitle style="color: #152C59" class="pt-0 text-right">₱{{formatPrice(prod.sellingPrice)}}.00</v-card-subtitle>
                        </v-flex>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-row>
</template>

<script>
    export default{
        props: {
            products: {
                type: Array
            },
            isSelected: {
                type: Boolean
            }
        },
        data(){
            return {
                productData: {
                    productName: null,
                    productPrice: null,
                    productDesc: null,
                    productOrigPrice: null,
                    productImage: null
                }
            }
        },
        methods: {
            selectProduct(prodSku, prodPrice, prodAlias, prodOrigPrice, prodImage){
                // this.product.isSelected = true;
                this.productData.productSku = prodSku;
                this.productData.productPrice = prodPrice;
                this.productData.productAlias = prodAlias;
                this.productData.productOrigPrice = prodOrigPrice;
                this.productData.productImage = prodImage;
                this.$emit('submitProduct', this.productData)
            },
            formatPrice(price){
                return new Intl.NumberFormat().format(price);
            },
        }
    }
</script>