<template>
<v-app id="inspire">
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="6">
                    <v-card class="elevation-12">
                        <v-toolbar color=#8c1515 dark flat>
                            <v-toolbar-title>Student Information</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-text>
                                                    <v-row>
                                                        <v-col cols="12" sm="6">
                                                            <v-text-field  
                                                            label="First name" 
                                                            ref="Fname" 
                                                            v-model="editedItem.Fname" 
                                                            outlined 
                                                            dense 
                                                            required>
                                                            </v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-text-field  
                                                            label="Last name" 
                                                            ref="Lname" 
                                                            v-model="editedItem.Lname" 
                                                            outlined 
                                                            dense 
                                                            required>
                                                            </v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-text-field  
                                                            label="Student ID" 
                                                            ref="SID" 
                                                            v-model="editedItem.SID" 
                                                            outlined 
                                                            dense 
                                                            required>
                                                            </v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-text-field  
                                                            label="Mobile Phone" 
                                                            ref="Phone" 
                                                            v-model="editedItem.Phone"  
                                                            outlined 
                                                            dense 
                                                            required>
                                                            </v-text-field>
                                                        </v-col>
                                                    </v-row>

                                                    <v-row>
                                                        <v-col cols="12" sm="6">
                                                            <v-select 
                                                            :items="School" 
                                                            label="School" 
                                                            v-model="editedItem.selectedSchool" 
                                                            @input="schoolSelect" 
                                                            dense 
                                                            outlined 
                                                            required>
                                                            </v-select>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-select 
                                                            :items="Major" 
                                                            label="Major" 
                                                            v-model="editedItem.selectedMajor"
                                                            dense 
                                                            outlined 
                                                            required>
                                                            </v-select>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">                                                
                                                            <v-text-field  
                                                            label="Academic Year" 
                                                            ref="AcYear" 
                                                            v-model="editedItem.Fname" 
                                                            outlined 
                                                            dense 
                                                            required>
                                                            </v-text-field>
                                                        </v-col>
                                                         <v-col cols="12" sm="6">
                                                        <v-text-field  
                                                            label="Semester" 
                                                            ref="Semester" 
                                                            v-model="editedItem.Fname" 
                                                            outlined 
                                                            dense 
                                                            required>
                                                            </v-text-field>
                                                        </v-col>


                                                        <!-- <v-col cols="12" sm="6">
                                                            <v-text-field  
                                                            label="Organization contact" 
                                                            ref="Contact" 
                                                            v-model="editedItem.Contact" 
                                                            outlined 
                                                            dense 
                                                            required>
                                                            </v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-select 
                                                            :items="Province" 
                                                            label="Province"
                                                            v-model="editedItem.Province" 
                                                            dense 
                                                            outlined 
                                                            required>
                                                            </v-select>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-textarea 
                                                            auto-grow 
                                                            label="Address" 
                                                            ref="Address" 
                                                            v-model="editedItem.Address"  
                                                            outlined 
                                                            dense 
                                                            rows="3" 
                                                            row-height="25" 
                                                            required>
                                                            </v-textarea>
                                                        </v-col> -->
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
    layout (context) {
    return 'SLayout'
    },
      async asyncData({ params }) {
        const { data } = await axios.get(`http://localhost:5010/getAllStudents`)
        console.log(data)
        return { students: data }
    },
    data () {
      return {
        isEditing: false,
        dialog: false,
        search: '',
        headers: [
          {
            text: 'Student ID',
            align: 'start',
            value: 'S_ID',
          },
          { text: 'Name', value: 'S_name' },
          { text: 'Major', value: 'S_major' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        students: [],
        sID:null,
        editedIndex: -1,
        School: ['Agro-Industry', 'Cosmetic Science', 'Dentistry', 'Health Science', 'Information Teachnology',
         'Integrative Medicine', 'Law', 'Liberal Arts', 'Management', 'Medicine', 'Nursing', 'Science', 'Sinology', 'Social of Innovation'],
        Province: ['Krabi', 'Bangkok', 'Kanchanaburi', 'Kalasin', 'Kamphaengphet', 'Khonkaen', 'Chanthaburi', 'Chachoengsao', 'Chonburi', 'Chainat',
            'Chaiyaphum', 'Chumphon', 'Chiangrai', 'Chiangmai', 'Trang', 'Trat', 'Tak', 'Nakhonnayok', 'Nakhonpathom', 'Nakhonphanom', 'Nakhonratchasima',
            'Nakhonsithammarat', 'Nakhonsawan', 'Nonthaburi', 'Narathiwat', 'Nan', 'Buriram', 'Pathumthani', 'Prachuapkhirikhan', 'Prachinburi',
            'Pattani', 'Ayutthaya', 'Phayao', 'Phangnga', 'Phatthalung', 'Phichit', 'Phitsanulok', 'Phetchaburi', 'Phetchabun', 'Phrae',
            'Phuket', 'Mahasarakham', 'Mukdahan', 'Maehongson', 'Yasothon', 'Yala', 'Roiet', 'Ranong', 'Rayong', 'Ratchaburi', 'Lopburi',
            'Loei', 'Lampang', 'Lamphun', 'Sisaket', 'Sakonnakhon', 'Songkhla', 'Satun', 'Samutprakan', 'Samutsongkhram', 'Samutsakhon', 'Sakaeo', 'Saraburi',
            'Singburi', 'Sukhothai', 'Suphanburi', 'Suratthani', 'Surin', 'Nongkhai', 'Nongbualamphu', 'Angthong', 'Amnatcharoen', 'Udonthani',
            'Uttaradit', 'Uthaithani', 'Ubonratchathani', 'Betong', 'Other'
        ],
        editedItem: {
            Major: [],
            selectedSchool: null,
            selectedMajor: null,
            Fname: null,
            Lname: null,
            SID: null,
            Phone: null,
            Oname: null,
            Contact: null,
            Province: null,
            Address: null,
         },
        defaultItem: {
            Major: [],
            selectedSchool: null,
            selectedMajor: null,
            Fname: null,
            Lname: null,
            SID: null,
            Phone: null,
            Oname: null,
            Contact: null,
            Province: null,
            Address: null,
      },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Student Information' : 'Edit Student Information'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    methods: {
        New () {
            this.show=true
            this.isEditing=true
      },
        editItem (item) {
            this.show=false
            this.isEditing=false
            this.editedIndex = this.students.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
      },
        deleteItem (item) {
            const index = this.students.indexOf(item)
            this.sID = this.students[index].S_ID
            console.log(this.students[index].S_ID)
            confirm('Are you sure you want to delete this item?') && axios({
                method: 'delete', 
                url: `http://localhost:5010/deleteStudent`,
                data: {
                    sID:this.sID ,
                }
            });
            location.reload();
      },
        save () {
            let self = this
            if (self.editedItem.selectedSchool == null || self.editedItem.Fname == null || self.editedItem.selectedMajor == null ||
                self.editedItem.Lname == null || self.editedItem.SID == null || self.editedItem.Phone == null 
                 ) {
                alert('Please check information that not empty!!')
            }else {
                let r = confirm('Are you sure you want to create?')
                if(r == true){
                    if (this.editedIndex > -1) {
                        Object.assign(this.students[this.editedIndex], this.editedItem)
                    } else {
                        axios({
                            method: 'post', 
                            url: `http://localhost:5010/createStudents`,
                            data: {
                                sID:this.editedItem.SID ,
                                Sname: this.editedItem.Fname+" "+this.editedItem.Lname,
                                Stel: this.editedItem.Phone,
                                Smajor:this.editedItem.selectedMajor,
                                Sschool:this.editedItem.selectedSchool,
                                W_name:this.editedItem.Oname,
                                W_address:this.editedItem.Address,
                                W_contract:this.editedItem.Contact,
                                W_province:this.editedItem.Province
                            }
                        });
                         this.$router.push('/Staff/Student information')
                    }
                } else {
                    this.close()
                }
            }
      },
        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        })
      },
      schoolSelect: function () {
            let self = this
            if (self.editedItem.selectedSchool == "Agro-Industry") {
                self.Major = ["Food Science and Technology", "Postharvest Technology and Logistics", "Postharvest Technology and Logistics And Bachelor of Business Administration Program in Logistics and Supply Chain Management"]
            } else if (self.editedItem.selectedSchool == "Cosmetic Science") {
                self.Major = ["Beauty Technology", "Cosmetic Science"]
            } else if (self.editedItem.selectedSchool == "Dentistry") {
                self.Major = ["Dental Surgery"]
            } else if (self.editedItem.selectedSchool == "Health Science") {
                self.Major = ["Environmental Health", "Public Health Program", "Occupational Health and Safety", "Sports and Health Science"]
            } else if (self.editedItem.selectedSchool == "Information Teachnology") {
                self.Major = ["Computer Engineering", "Digital Technology for Business Innovation", "Multimedia Technology and Animation", "Software Engineering"]
            } else if (self.editedItem.selectedSchool == "Integrative Medicine") {
                self.Major = ["Applied Thai Traditional Medicine", "Physical Therapy Program", "Traditional Chinese Medicine"]
            } else if (self.editedItem.selectedSchool == "Law") {
                self.Major = ["Laws"]
            } else if (self.editedItem.selectedSchool == "Liberal Arts") {
                self.Major = ["English", "Thai Language and Culture"]
            } else if (self.editedItem.selectedSchool == "Management") {
                self.Major = ["Accounting", "Aviation Business Management", "Business Administration", "Hospitality Industry Management", "Logistics and Supply Chain Management", "Tourism Management", "Economics"]
            } else if (self.editedItem.selectedSchool == "Medicine") {
                self.Major = ["Medicine"]
            } else if (self.editedItem.selectedSchool == "Nursing") {
                self.Major = ["Practical Nursing"]
            } else if (self.editedItem.selectedSchool == "Science") {
                self.Major = ["Materials Engineering", "Applied Chemistry", "Biotechnology"]
            } else if (self.editedItem.selectedSchool == "Sinology") {
                self.Major = ["Teaching Chines Language", "Business Chinese", "Chinese Language and Culture", "Chinese Studies"]
            } else if (self.editedItem.selectedSchool == "Social of Innovation") {
                self.Major = ["International Development"]
            }
        },
    },
  }
</script>