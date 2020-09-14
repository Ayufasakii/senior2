<template>
    <v-app id="inspire">
        <v-main>
            <v-container fluid class="fill-height">
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="6">
                        <v-card class="elevation-12">
                            <v-toolbar color=#8c1515 dark flat>
                                <v-toolbar-title>Teacher Information</v-toolbar-title>
                            </v-toolbar>

                            <v-card-title>
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
                            </v-card-title>

                            <v-data-table
                            :headers="headers"
                            :items="teachers"
                            :search="search"
                            >

                            <template v-slot:top>
                                <v-toolbar flat >
                                    <v-spacer></v-spacer>
                                    <v-dialog v-model="dialog" max-width="750px">

                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn class="mb-2" color=#8c1515 small dark v-bind="attrs" v-on="on" @click="New">New</v-btn>
                                        </template>

                                        <v-card>
                                            <v-toolbar color=#8c1515 dark flat>
                                            <v-toolbar-title>
                                                <span>{{ formTitle }}</span>
                                            </v-toolbar-title>
                                            <v-spacer></v-spacer>
                                                <v-btn
                                                v-if="!show"
                                                color=#8c1515
                                                fab
                                                small
                                                @click="isEditing=!isEditing">
                                                <v-icon v-if="isEditing">mdi-close</v-icon>
                                                <v-icon v-else>mdi-pencil</v-icon>
                                                </v-btn> 
                                            </v-toolbar>

                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12" sm="6">
                                                            <v-text-field  
                                                            label="First name" 
                                                            ref="Fname" 
                                                            v-model="editedItem.Fname"
                                                            outlined 
                                                            dense
                                                            required
                                                            :readonly="!isEditing">
                                                            </v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-text-field  
                                                            label="Last name" 
                                                            ref="Lname" 
                                                            v-model="editedItem.Lname"
                                                            outlined 
                                                            dense
                                                            required
                                                            :readonly="!isEditing">
                                                            </v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-text-field  
                                                            label="Teacher ID" 
                                                            ref="TID" 
                                                            v-model="editedItem.TID"
                                                            outlined 
                                                            dense
                                                            required
                                                            :readonly="!isEditing">
                                                            </v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                        <v-text-field 
                                                        label="Password" 
                                                        ref="Tpass" 
                                                        v-model="editedItem.Tpass"
                                                        outlined 
                                                        dense
                                                        required
                                                        :readonly="!isEditing">
                                                        </v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-text-field 
                                                            label="Email" 
                                                            ref="Temail" 
                                                            v-model="editedItem.Temail" 
                                                            outlined 
                                                            dense
                                                            required
                                                            :readonly="!isEditing">
                                                            </v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-text-field  
                                                            label="Mobile Phone" 
                                                            ref="Phone" 
                                                            v-model="editedItem.Phone"
                                                            outlined 
                                                            dense 
                                                            required
                                                            :readonly="!isEditing">
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
                                                            required
                                                            :readonly="!isEditing">
                                                            </v-select>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-select 
                                                            :items="Major" 
                                                            label="Major" 
                                                            v-model="editedItem.selectedMajor" 
                                                            dense 
                                                            outlined 
                                                            required
                                                            :readonly="!isEditing">
                                                            </v-select>
                                                        </v-col>                                              
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click="close" :disabled="!isEditing">Cancel</v-btn>
                                                <v-btn color="blue darken-1" text @click="save" :disabled="!isEditing">Save</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-toolbar>
                            </template>

                            <template v-slot:item.actions="{ item }">
                                <v-icon
                                small
                                class="mr-2"
                                @click="editItem(item)"
                                >
                                mdi-account-edit
                                </v-icon>
                                <v-icon
                                small
                                @click="deleteItem(item)"
                                >
                                mdi-delete
                                </v-icon>
                            </template>
                            </v-data-table>
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
  layout (context) {
    return 'SLayout'
  },
      async asyncData({ params }) {
        const { data } = await axios.get(`http://localhost:5010/getAllTeachers`)
        console.log(data)
        return { teachers: data }
    },
  data () {
      return {
        isEditing: false,
        dialog: false,
        search: '',
        headers: [
          {
            text: 'Teacher ID',
            align: 'start',
            value: 'T_ID',
          },
          { text: 'Name', value: 'T_name' },
          { text: 'Major', value: 'T_major' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        TID:null,
        teachers: [],
        editedIndex: -1,
        School: ['Agro-Industry', 'Cosmetic Science', 'Dentistry', 'Health Science', 'Information Teachnology', 
        'Integrative Medicine', 'Law', 'Liberal Arts', 'Management', 'Medicine', 'Nursing', 'Science', 'Sinology', 'Social of Innovation'],
        editedItem: {
            Major: [],
            selectedSchool: null,
            selectedMajor: null,
            Fname: null,
            Lname: null,
            TID: null,
            Tpass:null,
            Temail:null,
            Phone: null,
         },
        defaultItem: {
            Major: [],
            selectedSchool: null,
            selectedMajor: null,
            Fname: null,
            Lname: null,
            TID: null,
            Tpass:null,
            Temail:null,
            Phone: null,
      },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Teacher Information' : 'Edit Teacher Information'
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
            this.editedIndex = this.teachers.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
      },
        deleteItem (item) {
            const index = this.teachers.indexOf(item)
            this.TID = this.teachers[index].T_ID
            confirm('Are you sure you want to delete this item?') && axios({
                method: 'delete', 
                url: `http://localhost:5010/deleteTeacher`,
                data: {
                    TID:this.TID ,
                }
            });
            location.reload();
      },
        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        })
      },
        save () {
            let self = this
            if (self.editedItem.selectedSchool == null || self.editedItem.Fname == null || self.editedItem.selectedMajor == null ||
                self.editedItem.Lname == null || self.editedItem.TID == null || self.editedItem.Phone == null ||
                self.editedItem.Temail == null || self.editedItem.Tpass == null) {
                alert('Please check information that not empty!!')
            }else {
                let r = confirm('Are you sure you want to create?')
                if(r == true){
                    if (this.editedIndex > -1) {
                        Object.assign(this.desserts[this.editedIndex], this.editedItem)
                    } else {
                        axios({
                            method: 'post', 
                            url: `http://localhost:5010/createTeacher`,
                            data: {
                                TID:this.editedItem.TID ,
                                Tname: this.editedItem.Fname+" "+this.editedItem.Lname,
                                Ttel: this.editedItem.Phone,
                                Tmajor:this.editedItem.selectedMajor,
                                Tschool:this.editedItem.selectedSchool,
                                Tpass:this.editedItem.Tpass,
                                Temail:this.editedItem.Temail
                            }
                        });
                        location.reload()
                    }
                } else {
                    this.close()
                }
            }
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
  }
}
</script>