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
                                    <v-select :items="Ssemester" v-model="searchSemester" outlined dense required label="Semester"></v-select>
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
                                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="form.date_go" label="Date to go" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker @change="dateStart" v-model="form.date_go" @input="menu2 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="form.date_arrive" label="Date to arrive" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="form.date_arrive" @change="dateStart" @input="menu2 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="form.date_intern" label="Date to visit" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="form.date_intern" @input="menu2 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12" sm="6">
                                    <span class="black--text">Start time visit</span>
                                    <b-form-timepicker id="FTime" locale="th" dense v-model="form.time_start"></b-form-timepicker>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <span class="black--text">End time visit</span>
                                    <b-form-timepicker id="TTime" locale="th" dense v-model="form.time_end"></b-form-timepicker>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field label="Organization Name" v-model="form.workplace" outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Organization Telephone Number" v-model="form.telephone" outlined dense required>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-textarea label="Address" ref="Address" v-model="form.address" rows="2" outlined dense required>
                                    </v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea label="Remark" ref="Address" v-model="form.remark" rows="2" outlined dense required>
                                    </v-textarea>
                                </v-col>

                            </v-row>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color=#8c1515 @click="submit" dark>Submit</v-btn>
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
import moment from 'moment';
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
        async dateStart() {
            this.form.date_go = moment(this.form.date_go).format('YYYY-MM-DD');
            console.log(this.form.date_go)
            var check = false
            console.log('start')
            await axios.post('http://localhost:5010/checkVformDstart', {
                    Tname: this.teacher.T_name,
                    DStart: this.form.date_go
                })
                .then((response) => {
                    console.log(response)
                    if (response.data == false) {
                        check = true
                    } else {
                        alert('ช่วงวันที่นี้มีแบบฟอร์มอยู่แล้ว ระบบจึงกรอกวันที่ไปและกลับอัตโนมัติ')
                        this.form.date_arrive = response.data[0].v_date_arrive
                        this.form.date_arrive = moment(this.form.date_arrive).format('YYYY-MM-DD');
                    }
                }, (error) => {
                    console.log(error);
                });
            if (check) {
                await axios.post('http://localhost:5010/checkVformDupStart', {
                        Tname: this.teacher.T_name,
                        DStart: this.form.date_go
                    })
                    .then((response) => {
                        console.log(response.data)
                        if (response.data != false) {
                            alert('ช่วงวันที่นี้มีแบบฟอร์มอยู่แล้ว ระบบจึงกรอกวันที่ไปและกลับอัตโนมัติ')
                            this.form.date_arrive = response.data[0].v_date_arrive
                        this.form.date_arrive = moment(this.form.date_arrive).format('YYYY-MM-DD');
                            this.form.date_go = response.data[0].V_date_go
                        this.form.date_go = moment(this.form.date_arrive).format('YYYY-MM-DD');
                        } else {

                        }
                    }, (error) => {
                        console.log(error);
                    });
            } else {

            }
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
        async submit() {
            this.form.date_go + 1
            await axios.post('http://localhost:5010/checkDuplicateFormStudents', {
                    Sname: this.form.student,
                })
                .then((response) => {
                    this.dup = response.data
                }, (error) => {
                    console.log(error);
                });
            if (this.dup == true) {
                alert('นักเรียนคนนี้มีแบบฟอร์มนิเทศในเทอมนี้อยู่แล้ว')
            } else {
                this.form.date_go = moment(this.form.date_go).format('YYYY-MM-DD');
                this.form.date_arrive = moment(this.form.date_arrive).format('YYYY-MM-DD');
                this.form.date_intern = moment(this.form.date_intern).format('YYYY-MM-DD');
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
                        if(this.form.date_intern > this.form.date_arrive&&this.form.date_intern < this.form.date_go){
                            alert('วันที่นิเทศต้องอยู่ระหว่างวันที่ไป-กลับ')
                        }else{

                        
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
                                acyear: this.form.AccYear,
                                semester: this.form.semester
                            }
                        });
                        location.reload();
                        }
                        this.close()
                    } else {
                        this.close()
                    }
                }
            }

        }
    }
}
</script>
