<template>
    <v-app id="inspire">
        <v-main>
            <v-container fluid class="fill-height">
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="6">
                        <v-card class="elevation-12">
                            <v-toolbar color=#8c1515 dark flat>
                                <v-toolbar-title>Student Information</v-toolbar-title>
                            <v-spacer></v-spacer>
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
                            :items="students"
                            :search="search"
                            >

                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <v-spacer></v-spacer>
                                    <v-dialog v-model="dialog" max-width="800px">

                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn class="mb-2" color=#8c1515 small dark v-bind="attrs" v-on="on" >New</v-btn>
                                        </template>

                                        <v-card>
                                            <v-card-title>Add Student Information</v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12" sm="6">
                                                            <v-text-field  
                                                            label="First name" 
                                                            ref="Fname" 
                                                            v-model="Fname" 
                                                            :rules="[() => !!Fname || 'This field is required']" 
                                                            outlined 
                                                            dense 
                                                            required>
                                                            </v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-text-field  
                                                            label="Last name" 
                                                            ref="Fname" 
                                                            v-model="Fname" 
                                                            :rules="[() => !!Fname || 'This field is required']" 
                                                            outlined 
                                                            dense 
                                                            required>
                                                            </v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-text-field  
                                                            label="Student ID" 
                                                            ref="SID" 
                                                            v-model="SID" 
                                                            :rules="[() => !!SID || 'This field is required']" 
                                                            outlined 
                                                            dense 
                                                            required>
                                                            </v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-text-field  
                                                            label="Mobile Phone" 
                                                            ref="Phone" 
                                                            v-model="Phone" 
                                                            :rules="[() => !!Phone || 'This field is required']" 
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
                                                            v-model="selectedSchool" 
                                                            @input="schoolSelect"
                                                            :rules="[() => !!School || 'This field is required']" 
                                                            dense 
                                                            outlined 
                                                            required>
                                                            </v-select>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-select 
                                                            :items="Major" 
                                                            label="Major" 
                                                            v-model="selectedMajor"
                                                            :rules="[() => !!Major || 'This field is required']" 
                                                            dense 
                                                            outlined 
                                                            required>
                                                            </v-select>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-text-field 
                                                            label="Organization Name" 
                                                            ref="Oname" 
                                                            v-model="Oname" 
                                                            :rules="[() => !!Oname || 'This field is required']" 
                                                            outlined 
                                                            dense 
                                                            required>
                                                            </v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-text-field  
                                                            label="Organization contact" 
                                                            ref="Contact" 
                                                            v-model="Contact" 
                                                            :rules="[() => !!Contact || 'This field is required']" 
                                                            outlined 
                                                            dense 
                                                            required>
                                                            </v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-select 
                                                            :items="Province" 
                                                            label="Province"
                                                            v-model="Province" 
                                                            :rules="[() => !!Province || 'This field is required']" 
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
                                                            v-model="Address" 
                                                            :rules="[() => !!Address || 'This field is required']" 
                                                            outlined 
                                                            dense 
                                                            rows="3" 
                                                            row-height="25" 
                                                            required>
                                                            </v-textarea>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
        const { data } = await axios.get(`http://localhost:5010/getAllStudents`)
        console.log(data)
        return { students: data }
    },
    data () {
      return {
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
        student: [],
        sID:null
      }
    },
    editItem (item) {
    this.student = this.student
    this.dialog = true
    },
  methods: {
    deleteItem (item) {
        const index = this.student.indexOf(item)
        this.sID = this.student[index].S_ID
        console.log(this.student[index].S_ID)
        confirm('Are you sure you want to delete this item?') && axios({
                method: 'delete', 
                url: `http://localhost:5010/deleteStudent`,
                data: {
                    sID:this.sID ,
                }
            });
            location.reload();
      },
    },
  }
</script>