<template>
<v-app id="inspire">
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="10" md="10">
                    <v-card class="elevation-12 mb-6">
                        <v-toolbar color=#8c1515 dark flat>
                            <v-toolbar-title>Teacher Information</v-toolbar-title>

                        </v-toolbar>
                        <v-row>
                            <v-col class="ml-5 mr-5 mt-5" cols="12" sm="3">
                                <v-text-field label="Name" v-model="teacher.T_name" disabled outlined dense required>
                                </v-text-field>
                            </v-col>
                            <v-col class="ml-5 mr-5 mt-5" cols="12" sm="3">
                                <v-text-field label="Email" v-model="teacher.T_email" disabled outlined dense required>
                                </v-text-field>
                            </v-col>
                            <v-col class="ml-5 mr-5 mt-5" cols="12" sm="3">
                                <v-text-field label="Telephone Number" v-model="teacher.T_tel" disabled outlined dense required>
                                </v-text-field>
                            </v-col>
                            <v-col class="ml-5 mr-5" cols="12" sm="3">
                                <v-text-field label="School" v-model="teacher.T_School" disabled outlined dense required>
                                </v-text-field>
                            </v-col>
                            <v-col class="ml-5 mr-5" cols="12" sm="3">
                                <v-text-field label="Major" v-model="teacher.T_Major" disabled outlined dense required>
                                </v-text-field>
                            </v-col>
                            <v-spacer></v-spacer>
                        </v-row>

                        <v-card-text>

                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12 mb-6">
                        <v-toolbar color=#8c1515 dark flat>
                            <v-toolbar-title>Student</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-text>
                            <v-row>
                                <v-col class="ml-5 mr-5 mt-5" cols="12" sm="3">
                                    <v-text-field label="Student ID" v-model="searchID" outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col class="ml-5 mr-5 mt-5" cols="12" sm="3">
                                    <v-text-field label="Name" v-model="searchName" outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col class="ml-5 mr-5 mt-5" cols="12" sm="3">
                                    <v-text-field label="School" v-model="searchSchool" outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col class="ml-5 mr-5" cols="12" sm="3">
                                    <v-text-field label="Major" v-model="searchMajor" outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col class="ml-5 mr-5" cols="12" sm="3">
                                    <v-text-field label="Academic Year" v-model="searchAccYear" outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col class="ml-5 mr-5" cols="12" sm="3">
                                    <v-text-field label="Semester" v-model="searchSemester" outlined dense required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="ml-5 mr-5" cols="12" sm="3">
                                    <v-btn color=#8c1515 @click="search" dark>Search</v-btn>
                                </v-col>

                            </v-row>
                            <v-row>
                                <v-col class="ml-5 mr-5" cols="12" sm="11">
                                    <v-data-table :headers="headers" :items="students" :search="search">
                                        <template v-slot:[`item.actions`]="{ item }">
                                            <v-icon small class="mr-2" @click="addStudent(item)">
                                                mdi-plus-circle
                                            </v-icon>
                                        </template>
                                    </v-data-table>
                                </v-col>
                            </v-row>

                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12">
                        <v-toolbar color=#8c1515 dark flat>
                            <v-toolbar-title>Workplace Visits Form</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="290px">

                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="DateRange" label="Visiting Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" required dense>
                                            </v-text-field>
                                        </template>

                                        <v-date-picker v-model="dates" no-title scrollable range>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu = false">
                                                Cancel
                                            </v-btn>
                                            <v-btn text color="primary" @click="$refs.menu.save(date)">
                                                OK
                                            </v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            

                            <v-row>
                                <v-col cols="12" sm="6">
                                    <span class="black--text">Time from</span>
                                    <b-form-timepicker id="FTime" locale="th" dense></b-form-timepicker>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <span class="black--text">Time To</span>
                                    <b-form-timepicker id="TTime" locale="th" dense></b-form-timepicker>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field label="Organization Name" v-model="searchID" outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Organization Telephone Number" v-model="searchID" outlined dense required>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-textarea label="Address" ref="Address" v-model="Address" rows="2" outlined dense required>
                                    </v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea label="Remark" ref="Address" v-model="Address" rows="2" outlined dense required>
                                    </v-textarea>
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
    created() {
        this.getdata();
    },
    data: () => ({
        dates: [],
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
            student: null

        },
        students: [],
        headers: [{
                text: 'Student ID',
                align: 'start',
                value: 'S_ID',
            },
            { text: 'Name', value: 'S_name' },
            { text: 'Major', value: 'S_major' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        TID: null
    }),
    computed: {
        DateRange() {
            return this.dates.join(' ~ ')
        },
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
                this.student = item.S_name

            } else {

            }
        }
    }
}
</script>
