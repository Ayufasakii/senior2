<template>
<v-app id="inspire">
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="6">
                    <v-card class="elevation-12">
                        <v-toolbar color=#8c1515 dark flat>
                            <v-toolbar-title>Workplace Visits Form</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field  
                                    label="First name" 
                                    ref="Fname" 
                                    v-model="Fname"
                                    outlined 
                                    dense
                                    required
                                    readonly>
                                    </v-text-field>
                                    </v-col>

                                <v-col cols="12" sm="6">
                                    <v-text-field  
                                    label="Last name" 
                                    ref="Lname" 
                                    v-model="Lname"
                                    outlined 
                                    dense
                                    required
                                    readonly>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-text-field  
                                    label="Major" 
                                    ref="Major" 
                                    v-model="Major"
                                    outlined 
                                    dense
                                    required
                                    readonly>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-text-field  
                                    label="School" 
                                    ref="School" 
                                    v-model="School"
                                    outlined 
                                    dense
                                    required
                                    readonly>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-menu
                                        ref="menu"
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        :return-value.sync="date"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                        >

                                        <template v-slot:activator="{ on, attrs }">
                                        <v-text-field  
                                        v-model="DateRange"
                                        label="Visiting Date"
                                        prepend-icon="mdi-calendar" 
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        required>
                                        </v-text-field>
                                        </template>

                                        <v-date-picker
                                        v-model="dates"
                                        no-title
                                        scrollable
                                        range
                                        >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                        text
                                        color="primary"
                                        @click="menu = false"
                                        >
                                        Cancel
                                        </v-btn>
                                        <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menu.save(date)"
                                        >
                                        OK
                                        </v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color=#8c1515 @click="save" dark>Submit</v-btn>
                        </v-card-actions>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>
    </v-content>
</v-app>
</template>
<script>
const axios = require('axios');
export default {
    layout(context) {
        return 'TLayout'
    },
    data: () => ({
      dates: [],
      menu: false,
    }),
    computed: {
      DateRange () {
        return this.dates.join(' ~ ')
      },
    },
}
</script>