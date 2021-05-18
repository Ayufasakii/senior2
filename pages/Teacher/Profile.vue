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
                                    <v-col cols="12">
                                        <span class="black--text">Name : {{ TName }}</span>
                                    </v-col>

                                    <v-col cols="12">
                                        <span class="black--text">ID : {{ TId }}</span>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <span class="black--text">School : {{  }}</span>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <span class="black--text">Major : {{  }}</span>
                                    </v-col>
                                    <v-col cols="12">
                                        <span class="black--text">Email : {{ Email }}</span>
                                    </v-col>
                                    <v-col cols="12">
                                        <span class="black--text">Tel. : {{ TTelephoneNum }}</span>
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
        data() {
        return {
            TName:null,
            TId:null,
            TTelephoneNum:null
        }
        },
    layout(context) {
        return 'TLayout'
    },
    created() {
        this.getdata();
    },
    methods: {
    getdata() {
            axios.post('http://localhost:5010/getTeacherByID', {
                    TID: sessionStorage.getItem("TID"),
                })
                .then((response) => {
                    console.log(response)
                    this.TName = response.data[0].T_name
                    this.TId = response.data[0].T_ID
                    this.TTelephoneNum = response.data[0].T_tel
                }, (error) => {
                    console.log(error);
                });
        },
    }
}
</script>