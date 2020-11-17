<template>
    <v-app id="inspire">
        <v-main>
            <v-container fluid class="fill-height">
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="8" lg="7">
                        <v-card class="elevation-12">
                            <v-toolbar color=#8c1515 dark flat dense>
                                <v-toolbar-title>Form</v-toolbar-title>
                            <v-spacer></v-spacer>
                            </v-toolbar>

                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
const axios = require('axios');
export default {
    layout(context) {
        return 'TLayout'
    },
}
</script>