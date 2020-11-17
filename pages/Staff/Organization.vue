<template>
    <v-app id="inspire">
        <v-main>
            <v-container fluid class="fill-height">
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="6">
                        <v-card class="elevation-12">
                            <v-toolbar color=#8c1515 dark flat dense>
                                <v-toolbar-title>Organization information</v-toolbar-title>
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
                            :items="Organization"
                            :search="search"
                            >

                            <template v-slot:top>
                                <v-toolbar flat color="white">
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
                                                            label="Organization Name" 
                                                            ref="Oname" 
                                                            v-model="editedItem.Oname"
                                                            outlined 
                                                            dense 
                                                            required
                                                            :readonly="!isEditing">
                                                            </v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-text-field  
                                                            label="Phone" 
                                                            ref="Contact" 
                                                            v-model="editedItem.Contact" 
                                                            outlined 
                                                            dense 
                                                            required
                                                            :readonly="!isEditing">
                                                            </v-text-field>
                                                        </v-col>

                                                        <v-col cols="12" sm="6">
                                                            <v-select 
                                                            :items="Province" 
                                                            label="Province"
                                                            v-model="editedItem.Province" 
                                                            dense 
                                                            outlined 
                                                            required
                                                            :readonly="!isEditing">
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
                                                            required
                                                            :readonly="!isEditing">
                                                            </v-textarea>
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
        const { data } = await axios.get(`http://localhost:5010/getAllOrganization`)
        console.log(data)
        return { Organization: data }
    },
    data () {
      return {
        isEditing:false,
        dialog: false,
        search: '',
        headers: [
          {
            text: 'Organization Name',
            align: 'start',
            value: 'W_name',
          },
          { text: 'Province', value: 'W_province' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        Organization: [],
        WID:null,
        editedIndex: -1,
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
            Oname: null,
            Contact: null,
            Province: null,
            Address: null,
         },
        defaultItem: {
            Oname: null,
            Contact: null,
            Province: null,
            Address: null,
      },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Organization' : 'Edit Organization'
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
            this.editedIndex = this.Organization.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
      },
        deleteItem (item) {
            const index = this.Organization.indexOf(item)
            this.WID = this.Organization[index].W_ID
            console.log(this.Organization[index].W_ID)
            confirm('Are you sure you want to delete this item?') && axios({
                method: 'delete', 
                url: `http://localhost:5010/deleteOrganization`,
                data: {
                    WID:this.WID ,
                }
            });
            location.reload();
      },
        save () {
            let self = this
            if (self.editedItem.Oname == null || self.editedItem.Contact == null || self.editedItem.Province == null ||
                self.editedItem.Address == null) {
                alert('Please check information that not empty!!')
            }else {
                let r = confirm('Are you sure you want to create?')
                if(r == true){
                    if (this.editedIndex > -1) {
                        Object.assign(this.Organization[this.editedIndex], this.editedItem)
                    } else {
                        axios({
                            method: 'post', 
                            url: `http://localhost:5010/createWorkplace`,
                            data: {
                                W_name:this.editedItem.Oname,
                                W_address:this.editedItem.Address,
                                W_contract:this.editedItem.Contact,
                                W_province:this.editedItem.Province
                            }
                        });
                        location.reload()
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
    },
  }
</script>