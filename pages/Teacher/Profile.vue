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
                                <v-row>
                                <b-avatar size="72px"></b-avatar>
                                <v-col cols="12" sm="6">
                                <v-text-field
                                label="Name"
                                outlined
                                dense
                                readonly>
                                </v-text-field>
                                </v-col>
                                </v-row>

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