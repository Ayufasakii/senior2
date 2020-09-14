<template>
    <v-app id="inspire">
        <v-main>
            <v-container fluid class="fill-height">
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="6">
                        <v-card class="elevation-12">
                            <v-toolbar color=#8c1515 dark flat>
                                <v-toolbar-title>Profile</v-toolbar-title>
                            <v-spacer></v-spacer>
                            </v-toolbar>

                            <v-card-text>
                                <b-row>
                                    <b-col cols="12" sm="6">
                                        <b-input-group prepend="Name" class="mt-3">
                                        <b-input
                                        disabled>
                                        </b-input>
                                        </b-input-group>
                                    </b-col>

                                    <b-col cols="12" sm="6">
                                        <b-input-group prepend="ID" class="mt-3">
                                        <b-input
                                        disabled>
                                        </b-input>
                                        </b-input-group>
                                    </b-col>
                                    <b-col cols="12" sm="6">
                                        <b-input-group prepend="Tel." class="mt-3">
                                        <b-input
                                        disabled>
                                        </b-input>
                                        </b-input-group>
                                    </b-col>
                                </b-row>

                            </v-card-text>
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