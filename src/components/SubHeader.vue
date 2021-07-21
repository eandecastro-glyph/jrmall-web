<template>
    <v-card
    flat
    tile
    color="white"
    height="95px"
    class="mt-12"
    >
        <v-row class="mt-6">
            <v-flex lg7 md7 sm12>
                <v-toolbar
                height="65px"
                color="white"
                width="100%"
                flat
                >
                    <v-tabs color="#76AAD3">
                    <v-tab style="color: #152C59" to="/">Home</v-tab>
                    <v-tab style="color: #152C59" to="/food">Food</v-tab>
                    <v-tab style="color: #152C59" to="/drinks">Drinks</v-tab>
                    <v-tab style="color: #152C59" to="/groceries">Groceries</v-tab>
                    <v-tab style="color: #152C59" to="/load">Load</v-tab>
                    <v-tab style="color: #152C59" to="/other">Other</v-tab>
                    </v-tabs>  
                </v-toolbar>
            </v-flex>
            <v-flex lg5 md5 sm12>
                <v-text-field
                    class="mt-2"
                    outlined
                    style="height: 37px; width: 473px"
                    label="Search a brand"
                    prepend-inner-icon="mdi-magnify"
                ></v-text-field>
            </v-flex>
        </v-row>
    </v-card>
</template>

<script>
</script>

<style scoped>
</style>