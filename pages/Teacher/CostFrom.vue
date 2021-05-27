<template>
<v-app id="inspire">
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="10" md="10">
                                <v-col class="ml-5 mr-5" cols="12" sm="3">
                                    <v-text-field label="Academic Year" v-model="searchAccYear" outlined dense required>
                                    </v-text-field>
                                </v-col>

                                <v-col class="ml-5 mr-5" cols="12" sm="3">
                                    <v-select :items="Ssemester" v-model="searchSemester" filled label="Semester"></v-select>
                                </v-col>
                    <v-card class="elevation-12 mb-6">
                        <v-toolbar color=#8c1515 dark flat>
                            <v-checkbox v-model="checkroundtrip" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                            <v-toolbar-title>Vehicle round trip</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text v-if="checkroundtrip == true">
                            <v-row>
                                <v-col class="ml-5 mr-5 " cols="12" sm="3">
                                    <v-checkbox v-model="costform.checkBox.C111" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field label="Air fares" disabled outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col v-if="costform.checkBox.C111" class="ml-5 mr-5 mt-5" cols="12" sm="3">
                                    <v-checkbox v-model="costform.checkBox.C112" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field label="Flight Origin date" :disabled="!costform.checkBox.C112" v-model="s" outlined dense required>
                                    </v-text-field>
                                    <v-text-field label="From" :disabled="!costform.checkBox.C112" v-model="s" outlined dense required>
                                    </v-text-field>
                                    <v-text-field label="To" :disabled="!costform.checkBox.C112" v-model="s" outlined dense required>
                                    </v-text-field>
                                    <span class="black--text">Departure Time</span>
                                    <b-form-timepicker id="FTime" :disabled="!costform.checkBox.C112" locale="th" dense v-model="s"></b-form-timepicker>
                                    <span class="black--text">Arrival Time</span>
                                    <b-form-timepicker id="FTime" :disabled="!costform.checkBox.C112" locale="th" dense v-model="s"></b-form-timepicker>
                                    <v-text-field class="mt-6" label="Cost" :disabled="!costform.checkBox.C112" v-model="s" outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col v-if="costform.checkBox.C111" class="ml-5 mr-5 mt-5" cols="12" sm="3">
                                    <v-checkbox v-model="costform.checkBox.C113" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field label="Flight Destination date" :disabled="!costform.checkBox.C113" v-model="s" outlined dense required>
                                    </v-text-field>
                                    <v-text-field label="From" :disabled="!costform.checkBox.C113" v-model="s" outlined dense required>
                                    </v-text-field>
                                    <v-text-field label="To" :disabled="!costform.checkBox.C113" v-model="teacher.T_name" outlined dense required>
                                    </v-text-field>
                                    <span class="black--text">Departure Time</span>
                                    <b-form-timepicker id="FTime" :disabled="!costform.checkBox.C113" locale="th" dense v-model="form.time_start"></b-form-timepicker>
                                    <span class="black--text">Arrival Time</span>
                                    <b-form-timepicker id="FTime" :disabled="!costform.checkBox.C113" locale="th" dense v-model="form.time_start"></b-form-timepicker>
                                    <v-text-field class="mt-6" label="Cost" :disabled="!costform.checkBox.C113" v-model="s" outlined dense required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="ml-5 mr-5 " cols="12" sm="3">
                                    <v-checkbox v-model="costform.checkBox.C121" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field label="Bus Fares" disabled outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col v-if="costform.checkBox.C121" class="ml-5 mr-5 " cols="12" sm="3">
                                    <v-checkbox v-model="costform.checkBox.C122" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field label="Origin date" :disabled="!costform.checkBox.C122" v-model="s" outlined dense required>
                                    </v-text-field>
                                    <v-text-field label="From" :disabled="!costform.checkBox.C122" v-model="s" outlined dense required>
                                    </v-text-field>
                                    <v-text-field label="To" :disabled="!costform.checkBox.C122" v-model="s" outlined dense required>
                                    </v-text-field>
                                    <span class="black--text">Departure Time</span>
                                    <b-form-timepicker id="FTime" :disabled="!costform.checkBox.C122" locale="th" dense v-model="s"></b-form-timepicker>
                                    <span class="black--text">Arrival Time</span>
                                    <b-form-timepicker id="FTime" :disabled="!costform.checkBox.C122" locale="th" dense v-model="s"></b-form-timepicker>
                                    <v-text-field class="mt-6" label="Cost" :disabled="!costform.checkBox.C122" v-model="s" outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col v-if="costform.checkBox.C121" class="ml-5 mr-5 " cols="12" sm="3">
                                    <v-checkbox v-model="costform.checkBox.C123" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field label="Destination date" :disabled="!costform.checkBox.C123" v-model="s" outlined dense required>
                                    </v-text-field>
                                    <v-text-field label="From" :disabled="!costform.checkBox.C123" v-model="s" outlined dense required>
                                    </v-text-field>
                                    <v-text-field label="To" :disabled="!costform.checkBox.C123" v-model="s" outlined dense required>
                                    </v-text-field>
                                    <span class="black--text">Departure Time</span>
                                    <b-form-timepicker id="FTime" :disabled="!costform.checkBox.C123" locale="th" dense v-model="s"></b-form-timepicker>
                                    <span class="black--text">Arrival Time</span>
                                    <b-form-timepicker id="FTime" :disabled="!costform.checkBox.C123" locale="th" dense v-model="s"></b-form-timepicker>
                                    <v-text-field class="mt-6" label="Cost" :disabled="!costform.checkBox.C113" v-model="s" outlined dense required>
                                    </v-text-field>
                                </v-col>

                            </v-row>
                            <v-row>
                                <v-col class="ml-5 mr-5 " cols="12" sm="3">
                                    <v-checkbox v-model="costform.checkBox.C131" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field label="Private Car" disabled outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col v-if="costform.checkBox.C131" class="ml-5 " cols="12" sm="6">
                                    <v-text-field class="mt-7" label="In case of round-trip travelling between province by private car" disabled outlined dense required>
                                    </v-text-field>

                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col v-if="costform.checkBox.C131" class="ml-5 " cols="12" sm="3">
                                    <v-text-field label="Distance (Kilometre x 3.50 Bath)" :disabled="!costform.checkBox.C131" outlined dense required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="ml-5 mr-5 " cols="12" sm="3">
                                    <v-checkbox v-model="costform.checkBox.C141" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field label="Taxi" disabled outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col v-if="costform.checkBox.C141" class="ml-5 " cols="12" sm="4">
                                    <v-checkbox v-model="costform.checkBox.C142" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field class="" label="Round trip-way back (700 Bath)" disabled outlined dense required>
                                    </v-text-field>
                                    <v-checkbox v-model="costform.checkBox.C143" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field class="" label="Round trip (350 Bath)" disabled outlined dense required>
                                    </v-text-field>
                                    <v-checkbox v-model="costform.checkBox.C144" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field class="" label="Way back (350 Bath)" disabled outlined dense required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12 mb-6">
                        <v-toolbar color=#8c1515 dark flat>
                            <v-checkbox v-model="checkvisit" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                            <v-toolbar-title>Vehicle traveling during supervision</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text v-if="checkvisit">
                            <v-row>
                                <v-col class="ml-5 mr-5 " cols="12" sm="8">
                                    <v-checkbox v-model="costform.checkBox.C211" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field label="Taxi Expenditure (Plaese fill information in document 6)" :disabled="!costform.checkBox.C211" outlined dense required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="ml-5 mr-5 " cols="12" sm="8">
                                    <v-checkbox v-model="costform.checkBox.C221" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field label="Cost of vehicle rental" disabled outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col v-if="costform.checkBox.C221" class="ml-15 " cols="12" sm="4">
                                    <v-checkbox v-model="costform.checkBox.C222" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field class="" label="Rental Car" disabled outlined dense required>
                                    </v-text-field>
                                    <v-col v-if="costform.checkBox.C222" class="ml-5 " cols="12" sm="5">
                                        <v-text-field class="" label="Day" disabled outlined dense required>
                                        </v-text-field>
                                        <v-text-field class="" label="Cost (Bath)" disabled outlined dense required>
                                        </v-text-field>
                                    </v-col>
                                    <v-checkbox v-model="costform.checkBox.C223" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field class="" label="Rental van" disabled outlined dense required>
                                    </v-text-field>
                                    <v-col v-if="costform.checkBox.C223" class="ml-5 " cols="12" sm="5">
                                        <v-text-field class="" label="Day" disabled outlined dense required>
                                        </v-text-field>
                                        <v-text-field class="" label="Cost (Bath)" disabled outlined dense required>
                                        </v-text-field>
                                    </v-col>

                                </v-col>

                            </v-row>
                            <row>
                                <v-col class="ml-3 mr-5 " cols="12" sm="8">
                                    <v-checkbox v-model="costform.checkBox.C231" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field class="" label="Car fuel cost" disabled outlined dense required>
                                    </v-text-field>
                                    <v-col v-if="costform.checkBox.C231" class="ml-5 " cols="12" sm="5">
                                        <v-text-field class="" label="Day" :disabled="!costform.checkBox.C231" outlined dense required>
                                        </v-text-field>
                                        <v-text-field class="" label="Cost (Bath)" :disabled="!costform.checkBox.C231" outlined dense required>
                                        </v-text-field>
                                    </v-col>
                                </v-col>
                            </row>
                            <row>
                                <v-col class="ml-3 mr-5 " cols="12" sm="8">
                                    <v-checkbox v-model="costform.checkBox.C241" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field class="" label="Ferry Prices" disabled outlined dense required>
                                    </v-text-field>
                                    <v-col v-if="costform.checkBox.C241" class="ml-5 " cols="12" sm="5">
                                        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="form.date_intern" label="Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="form.date_intern" @input="menu2 = false"></v-date-picker>
                                        </v-menu>
                                        <v-text-field class="" label="Cost (Bath)" :disabled="!costform.checkBox.C241" outlined dense required>
                                        </v-text-field>
                                    </v-col>
                                </v-col>
                            </row>
                            <row>
                                <v-col class="ml-3 mr-5 " cols="12" sm="8">
                                    <v-checkbox v-model="costform.checkBox.C251" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field class="" label="Expressway Fee" disabled outlined dense required>
                                    </v-text-field>
                                    <v-col v-if="costform.checkBox.C251" class="ml-5 " cols="12" sm="5">
                                        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="form.date_intern" label="Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="form.date_intern" @input="menu2 = false"></v-date-picker>
                                        </v-menu>
                                        <v-text-field class="" label="Cost (Bath)" :disabled="!costform.checkBox.C251" outlined dense required>
                                        </v-text-field>
                                    </v-col>
                                </v-col>
                            </row>
                            <row>
                                <v-col class="ml-3 mr-5 " cols="12" sm="8">
                                    <v-checkbox v-model="costform.checkBox.C261" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field class="" label="Car park service charge" disabled outlined dense required>
                                    </v-text-field>
                                    <v-col v-if="costform.checkBox.C261" class="ml-5 " cols="12" sm="5">
                                        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="form.date_intern" label="Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="form.date_intern" @input="menu2 = false"></v-date-picker>
                                        </v-menu>
                                        <v-text-field class="" label="Cost (Bath)" :disabled="!costform.checkBox.C261" outlined dense required>
                                        </v-text-field>
                                    </v-col>
                                </v-col>
                            </row>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12 mb-6">
                        <v-toolbar color=#8c1515 dark flat>
                            <v-checkbox v-model="checkAccom" hide-details class="shrink mr-2 mt-0"></v-checkbox>

                            <v-toolbar-title>Accommodation expenses</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-text v-if="checkAccom">
                            <row>
                                <v-col class="ml-3 mr-5 " cols="12" sm="8">
                                    <v-checkbox v-model="costform.checkBox.C311" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field class="" label="House" disabled outlined dense required>
                                    </v-text-field>
                                    <v-col v-if="costform.checkBox.C311" class="ml-5 " cols="12" sm="5">
                                        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="form.date_intern" label="Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="form.date_intern" @input="menu2 = false"></v-date-picker>
                                        </v-menu>
                                        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="form.date_intern" label="To date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="form.date_intern" @input="menu2 = false"></v-date-picker>
                                        </v-menu>
                                        <v-text-field class="" label="Duration Night(s)" :disabled="!costform.checkBox.C311" outlined dense required>
                                        </v-text-field>
                                        <v-text-field class="" label="x Bath" :disabled="!costform.checkBox.C311" outlined dense required>
                                        </v-text-field>
                                        <v-textarea class="" label="Address" :disabled="!costform.checkBox.C311" outlined dense required>
                                        </v-textarea>
                                    </v-col>
                                </v-col>
                                <v-col class="ml-3 mr-5 " cols="12" sm="8">
                                    <v-checkbox v-model="costform.checkBox.C321" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                    <v-text-field class="" label="Hotel (Not over 1600 per night)" disabled outlined dense required>
                                    </v-text-field>
                                    <v-col v-if="costform.checkBox.C321" class="ml-5 " cols="12" sm="5">
                                        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="form.date_intern" label="Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="form.date_intern" @input="menu2 = false"></v-date-picker>
                                        </v-menu>
                                        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="form.date_intern" label="To date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="form.date_intern" @input="menu2 = false"></v-date-picker>
                                        </v-menu>
                                        <v-text-field class="" label="Duration Night(s)" :disabled="!costform.checkBox.C321" outlined dense required>
                                        </v-text-field>
                                        <v-text-field class="" label="x Bath" :disabled="!costform.checkBox.C321" outlined dense required>
                                        </v-text-field>
                                    </v-col>
                                </v-col>
                            </row>
                        </v-card-text>

                    </v-card>
                    <v-card class="elevation-12 mb-6">
                        <v-toolbar color=#8c1515 dark flat>
                            <v-checkbox v-model="checkAllowance" hide-details class="shrink mr-2 mt-0"></v-checkbox>

                            <v-toolbar-title>Allowance</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-text v-if="checkAllowance">
                            <v-col class="ml-3 mr-5 " cols="12" sm="8">
                                <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="form.date_intern" label="Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="form.date_intern" @input="menu2 = false"></v-date-picker>
                                </v-menu>
                                <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="form.date_intern" label="To date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="form.date_intern" @input="menu2 = false"></v-date-picker>
                                </v-menu>
                                <v-text-field class="" label="Duration Day(s) x 350 Bath" outlined dense required>
                                </v-text-field>

                            </v-col>
                        </v-card-text>

                    </v-card>
                    <v-btn color=#8c1515 class="mb-6" @click="calculate" dark>Calculate cost</v-btn>
                    <v-text-field  label="Total Cost" disabled outlined dense required>
                    </v-text-field>
                    <v-btn color=#8c1515 @click="submit" v-if="cal == true" dark>Submit</v-btn>
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
    created() {
        this.getdata();
    },
    data: () => ({
        menu: false,
        teacher: {
            T_name: null,
            T_email: null,
            T_tel: null,
            T_School: null,
            T_Major: null,
            searchID: '',
            searchName: '',
            searchSchool: '',
            searchMajor: '',
            searchAccYear: '',
            searchSemester: '',
        },
        checkroundtrip: false,
        checkvisit: false,
        checkAccom: false,
        checkAllowance: false,
        checkroundtrip: false,
        costform: {
            checkBox: {
                C111: false,
                C112: false,
                C113: false,
                C121: false,
                C122: false,
                C123: false,
                C131: false,
                C141: false,
                C142: false,
                C143: false,
                C144: false,
                C211: false,
                C221: false,
                C222: false,
                C223: false,
                C231: false,
                C241: false,
                C251: false,
                C261: false,
                C311: false,
                C321: false,
                C411: false,
            },

        },
        cal:false,
        form: {
            student: null,
            teacher: null,
            workplace: null,
            address: null,
            telephone: null,
            date_go: null,
            date_arrive: null,
            date_intern: null,
            time_start: null,
            time_end: null,
            remark: null,
            comment: null,
            status: null,
            AccYear: null,
            semester: null
        },
        formstatus: ['Send to staff', 'Teacher Edit', 'Approve'],
        dup: null,
        Ssemester: ['1', '2', '3'],
        students: [],
        headers: [{
                text: 'Student ID',
                align: 'start',
                value: 'S_ID',
            },
            { text: 'Name', value: 'S_name' },
            { text: 'School', value: 'S_school' },
            { text: 'Major', value: 'S_major' },
            { text: 'Accademic Year', value: 's_acyear' },
            { text: 'Semester', value: 's_acsemester' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        TID: null
    }),
    computed: {

    },
    methods: {
        New() {
            this.$router.push('/Staff/NewStudent')
        },
        getdata() {
            axios.post('http://localhost:5010/getTeacherByID', {
                    TID: sessionStorage.getItem("TID"),
                })
                .then((response) => {
                    this.teacher.T_name = response.data[0].T_name
                    this.teacher.T_email = response.data[0].T_email
                    this.teacher.T_tel = response.data[0].T_tel
                    this.teacher.T_School = response.data[0].T_school
                    this.teacher.T_Major = response.data[0].T_major
                    console.log(response.data)
                }, (error) => {
                    console.log(error);
                });
        },
        search() {
            axios.post('http://localhost:5010/getSearchStudents', {
                    SID: this.searchID,
                    Sname: this.searchName,
                    Sschool: this.searchSchool,
                    Smajor: this.searchMajor,
                    SaccYear: this.searchAccYear,
                    Ssemester: this.searchSemester
                })
                .then((response) => {
                    this.students = response.data
                    console.log(response.data)
                }, (error) => {
                    console.log(error);
                });
        },
        addStudent(item) {
            let r = confirm('ต้องการเพิ่มนักเรียนคนนี้ในฟอร์ม?')
            if (r == true) {
                this.form.student = item.S_name
                this.form.AccYear = item.S_acYear
                this.form.semester = item.S_acsemester
            } else {

            }
        },
        calculate(){
          this.cal = true
        },
        async submit() {
            await axios.post('http://localhost:5010/checkDuplicateFormStudents', {
                    Sname: this.form.student
                })
                .then((response) => {
                    this.dup = response.data
                }, (error) => {
                    console.log(error);
                });
            if (this.dup == true) {
                alert('นักเรียนคนนี้มีแบบฟอร์มนิเทศอยู่แล้ว')
            } else {
                this.form.teacher = this.teacher.T_name
                console.log(this.form)
                if (this.form.date_go == null || this.form.date_arrive == null || this.form.date_intern == null ||
                    this.form.student == null || this.form.teacher == null || this.form.time_start == null || this.form.time_end == null ||
                    this.form.workplace == null || this.form.address == null || this.form.telephone == null
                ) {
                    alert('กรุณากรอกข้อมูลให้ครบถ้วน')
                } else {
                    let r = confirm('Are you sure you want to create?')
                    if (r == true) {
                        axios({
                            method: 'post',
                            url: `http://localhost:5010/createVisitForm`,
                            data: {
                                V_date_go: this.form.date_go,
                                V_date_arrive: this.form.date_arrive,
                                V_date_intern: this.form.date_intern,
                                remark: this.form.remark,
                                S_name: this.form.student,
                                T_name: this.form.teacher,
                                V_time_start: this.form.time_start,
                                V_time_end: this.form.time_end,
                                w_name: this.form.workplace,
                                w_add: this.form.address,
                                w_tel: this.form.telephone,
                            }
                        });
                        this.$router.push('/Staff/Student information')
                    } else {
                        this.close()
                    }
                }
            }

        }
    }
}
</script>
