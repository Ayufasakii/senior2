<template>
<v-app id="inspire">
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="6">
                    <v-card class="elevation-12">
                        <v-toolbar color=#8c1515 dark flat>
                            <v-toolbar-title>Cost form Information</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-text>
                            <v-row>
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
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon=""
            readonly
            dense
            outlined
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
        </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field label="Teacher Name" v-model="Tname" outlined dense disabled>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field label="School" v-model="Tschool" outlined dense disabled>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field label="Major" v-model="Tmajor" outlined dense disabled>
                                </v-text-field>

                            </v-col>
                            </v-row>
                            
                            <v-row>
                            <v-spacer></v-spacer>
                            <v-col cols="12" sm="6" >
                            <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                            ></v-text-field>
                            </v-col>
                            </v-row>

                            <v-data-table :headers="headers" :items="student" :search="search">

                                <template v-slot:item.actions="{ item }">
                                    <nuxt-link class="nuxt-link" to="/SSP">
                                        <v-icon small class="mr-2" @click="editItem(item)">
                                            mdi-account-edit
                                        </v-icon>
                                    </nuxt-link>
                                    <v-icon small @click="deleteItem(item)">
                                        mdi-delete
                                    </v-icon>
                                </template>

                            </v-data-table>
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
export default {
    layout(context) {
        return 'TLayout'
    },
    async asyncData({ params }) {
        const { data } = await axios.get(`http://localhost:5010/getAllStudents`)
        console.log(data)
        return { students: data }
    },
    data() {
        return {
            search: '',
            picker: new Date().toISOString().substr(0, 10),
            headers: [{
                    text: 'Student ID',
                    align: 'start',
                    value: 'S_ID',
                },
                { text: 'Name', value: 'S_name' },
                { text: 'Major', value: 'S_major' },
                { text: 'Organization name', value: '' },
                { text: 'Province', value: '' },
                { text: 'Actions', value: 'actions', sortable: true },
            ],
            student: [],
            menu: false,
            sID: null
        }
    },
    created() {
        this.student = this.students
    },
    methods: {
        schoolSelect: function () {
            let self = this
            if (self.selectedSchool == "Agro-Industry") {
                self.Major = ["Food Science and Technology", "Postharvest Technology and Logistics", "Postharvest Technology and Logistics And Bachelor of Business Administration Program in Logistics and Supply Chain Management"]
            } else if (self.selectedSchool == "Cosmetic Science") {
                self.Major = ["Beauty Technology", "Cosmetic Science"]
            } else if (self.selectedSchool == "Dentistry") {
                self.Major = ["Dental Surgery"]
            } else if (self.selectedSchool == "Health Science") {
                self.Major = ["Environmental Health", "Public Health Program", "Occupational Health and Safety", "Sports and Health Science"]
            } else if (self.selectedSchool == "Information Teachnology") {
                self.Major = ["Computer Engineering", "Digital Technology for Business Innovation", "Multimedia Technology and Animation", "Software Engineering"]
            } else if (self.selectedSchool == "Integrative Medicine") {
                self.Major = ["Applied Thai Traditional Medicine", "Physical Therapy Program", "Traditional Chinese Medicine"]
            } else if (self.selectedSchool == "Law") {
                self.Major = ["Laws"]
            } else if (self.selectedSchool == "Liberal Arts") {
                self.Major = ["English", "Thai Language and Culture"]
            } else if (self.selectedSchool == "Management") {
                self.Major = ["Accounting", "Aviation Business Management", "Business Administration", "Hospitality Industry Management", "Logistics and Supply Chain Management", "Tourism Management", "Economics"]
            } else if (self.selectedSchool == "Medicine") {
                self.Major = ["Medicine"]
            } else if (self.selectedSchool == "Nursing") {
                self.Major = ["Practical Nursing"]
            } else if (self.selectedSchool == "Science") {
                self.Major = ["Materials Engineering", "Applied Chemistry", "Biotechnology"]
            } else if (self.selectedSchool == "Sinology") {
                self.Major = ["Teaching Chines Language", "Business Chinese", "Chinese Language and Culture", "Chinese Studies"]
            } else if (self.selectedSchool == "Social of Innovation") {
                self.Major = ["International Development"]
            }
        },
        submit: function () {
            let self = this
            if (self.selectedSchool == null || self.Fname == null || self.selectedMajor == null ||
                self.Lname == null || self.SID == null || self.MPhone == null ||
                self.Oname == null || self.Contact == null || self.SProvince == null ||
                self.Address == null) {
                alert('Please check information that not empty!!')
            } else {
                let obj1 = self.students.find(o => o.S_name === self.Fname + " " + self.Lname);
                let obj2 = self.students.find(o => o.S_ID === self.SID);
                if (obj1 == undefined && obj2 == undefined) {
                    let data = {
                        selectedSchool: self.selectedSchool,
                        Fname: self.Fname,
                        selectedMajor: self.selectedMajor,
                        Lname: self.Lname,
                        SID: self.SID,
                        MPhone: self.MPhone,
                        Oname: self.Oname,
                        Contact: self.Contact,
                        SProvince: self.SProvince,
                        Address: self.Address
                    }
                    sessionStorage.setItem('Cdata', JSON.stringify(data))
                    sessionStorage.setItem('Cstatus', 'Y')
                    this.$router.push('/SSC')
                } else {
                    alert('This student already exist in system!!')
                }
            }
        }
    }

}
</script>
