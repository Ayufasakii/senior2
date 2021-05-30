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
                            <v-toolbar-title>Visit Form Information</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-text>
                            <v-row>
                                <v-col class="ml-5 mr-5 mt-5" cols="12" sm="3">
                                    <v-text-field label="Name" v-model="search.Sname" outlined dense required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4">
                                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="search.Date2Go" label="Date to go" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="search.Date2Go" @input="menu2 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="4">
                                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="search.Date2Arrive" label="Date to arrive" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="search.Date2Arrive" @input="menu2 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="4">
                                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="search.Date2Visit" label="Date to visit" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="search.Date2Visit" @input="menu2 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col class="ml-5 mr-5" cols="12" sm="3">
                                    <v-text-field label="Academic Year" v-model="search.acyear" outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col class="ml-5 mr-5" cols="12" sm="3">
                                    <v-select :items="Ssemester" v-model="search.semester" outlined dense required label="Semester"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="ml-5 mr-5" cols="12" sm="3">
                                    <v-text-field label="Workplace Name" v-model="search.workplace" outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col class="ml-5 mr-5" cols="12" sm="3">
                                    <v-select :items="formstatus" v-model="search.status" outlined dense required label="Status"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="ml-5 mr-5" cols="12" sm="3">
                                    <v-btn color=#8c1515 @click="searchVisit" dark>Search</v-btn>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col  cols="12" sm="3">
                                    <v-btn color=#8c1515 @click="Clear" dark>Clear</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="ml-5 mr-5" cols="12" sm="11">
                                    <v-data-table :headers="headers" :items="visitforms" :search="search">
                                        <template v-slot:[`item.actions`]="{ item }">
                                            <v-icon small class="mr-2" @click="edit(item)">
                                                mdi-account-edit
                                            </v-icon>
                                            <v-icon small class="mr-2" @click="del(item)">
                                                mdi-account-remove
                                            </v-icon>
                                        </template>
                                    </v-data-table>
                                </v-col>
                            </v-row>

                        </v-card-text>
                    </v-card>
                    <v-dialog v-model="dialog" max-width="1000px">
                        <v-card>
                            
                            <v-toolbar color=#8c1515 dark flat>
                                <v-toolbar-title>
                                    <span>{{ formTitle }}</span>
                                </v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                                                        <v-col cols="12">
                                                            <v-textarea label="Comment from staff" disabled ref="Comment from staff" v-model="form.comment" rows="2" outlined dense required>
                                                            </v-textarea>
                                                        </v-col>
                            <v-card-text>
                                <v-container class="fill-height" fluid>
                                    <v-row align="center" justify="center">
                                        <v-col cols="12" sm="10" md="10">
                                            <v-card class="elevation-4 mb-6">
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
                                            <v-card class="elevation-4 mb-6">
                                                <v-toolbar color=#8c1515 dark flat>
                                                    <v-toolbar-title>Student</v-toolbar-title>
                                                    <v-spacer></v-spacer>
                                                </v-toolbar>

                                                <v-card-text>
                                                    <v-row>
                                                        <v-col class="ml-5 mr-5 mt-5" cols="12" sm="3">
                                                            <v-text-field label="Student ID" v-model="student.ID" outlined dense required>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col class="ml-5 mr-5 mt-5" cols="12" sm="3">
                                                            <v-text-field label="Name" v-model="student.name" outlined dense required>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col class="ml-5 mr-5 mt-5" cols="12" sm="3">
                                                            <v-text-field label="School" v-model="student.school" outlined dense required>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col class="ml-5 mr-5" cols="12" sm="3">
                                                            <v-text-field label="Major" v-model="student.major" outlined dense required>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col class="ml-5 mr-5" cols="12" sm="3">
                                                            <v-text-field label="Academic Year" v-model="student.acyear" outlined dense required>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col class="ml-5 mr-5" cols="12" sm="3">
                                                            <v-text-field label="Semester" v-model="student.semester" outlined dense required>
                                                            </v-text-field>
                                                        </v-col>
                                                    </v-row>

                                                </v-card-text>
                                            </v-card>
                                            <v-card class="elevation-4">
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
                                                                <v-date-picker v-model="form.date_go" @input="menu2 = false"></v-date-picker>
                                                            </v-menu>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-text-field v-model="form.date_arrive" label="Date to arrive" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                                </template>
                                                                <v-date-picker v-model="form.date_arrive" @input="menu2 = false"></v-date-picker>
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

                                            </v-card>

                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="save" :disabled="!isEditing">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
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
        show: null,
        isEditing: null,
                formstatus: ['Send to staff', 'Teacher Edit', 'Approved'],
        menu: false,
                Ssemester:['1','2','3'],
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
        search: {
            Sname: null,
            Tname: null,
            Date2Go: null,
            Date2Arrive: null,
            Date2Visit: null,
            semester: null,
            acyear: null,
            workplace: null,
            status: null
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
            semester: null,
        },
        student:{name:null,
        ID:null,
        school:null,
        major:null,
        acyear:null,
        semester:null
        },
        dialog: false,
        dup: null,
        visitforms: [],
        headers: [{
                text: 'Student Name',
                align: 'start',
                value: 'S_name',
            },
            { text: 'Workplace Name', value: 'w_name' },
            { text: 'Status', value: 'status' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        TID: null
    }),
    computed: {

    },
    methods: {
        New() {

        },
        async edit(item) {
            this.show = true
            this.isEditing = true
            this.dialog = true
            console.log(item)
            await axios.post('http://localhost:5010/getSearchStudents', {
                    Sname: item.S_name,
                })
                .then((response) => {
                    this.student.name = response.data[0].S_name
                    this.student.ID = response.data[0].S_ID
                    this.student.school = response.data[0].S_school
                    this.student.major = response.data[0].S_major
                    this.student.semester = response.data[0].s_acsemester
                    this.student.acyear = response.data[0].s_acyear
                }, (error) => {
                    console.log(error);
                });
                console.log(item)
                item.V_date_go = item.V_date_go.toString();
                item.v_date_arrive= item.v_date_arrive.toString();
                item.v_date_intern= item.v_date_intern.toString();
                item.V_date_go = item.V_date_go.split("T")[0]
                item.v_date_arrive= item.v_date_arrive.split("T")[0]
                item.v_date_intern= item.v_date_intern.split("T")[0]
                this.form.date_go = item.V_date_go
                this.form.date_arrive = item.v_date_arrive
                this.form.date_intern = item.v_date_intern
                this.form.time_start=item.V_time_start
                this.form.time_end=item.v_time_end
                this.form.workplace=item.w_name
                this.form.telephone=item.w_tel
                this.form.address=item.w_address
                this.form.remark=item.remark
                this.form.comment = item.comment
            
        },
        close() { this.dialog = false },
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
        searchVisit() {
            axios.post('http://localhost:5010/getSearchVisitForm', {
                    Sname: this.search.Sname,
                    Tname: this.teacher.T_name,
                    Date2Go: this.search.Date2Go,
                    Date2Arrive: this.search.Date2Arrive,
                    Date2Visit: this.search.Date2Visit,
                    semester: this.search.semester,
                    acyear: this.search.acyear,
                    workplace: this.search.workplace,
                    status: this.search.status,
                })
                .then((response) => {
                    this.visitforms = response.data
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
        del(item){
                confirm('Are you sure you want to delete this item?') && axios({
                method: 'delete',
                url: `http://localhost:5010/deleteVisitform`,
                data: {
                    VID: this.VID,
                }
            });
            location.reload();
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

        },
        Clear(){
                this.search.Sname= null,
                this.search.Tname= null,
                this.search.Date2Go= null,
                this.search.Date2Arrive= null,
                this.search.Date2Visit= null,
                this.search.semester= null,
                this.search.acyear= null,
                this.search.workplace= null,
                this.search.status= null
        },
    }
}
</script>
