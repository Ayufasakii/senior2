<template>
<v-app id="inspire">
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="10" md="10">
                    <v-card class="elevation-12 mb-6">
                        <v-toolbar color=#8c1515 dark flat>
                            <v-toolbar-title>Cost Form Information</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-text>
                            <v-row>
                                <v-col class="ml-5 mr-5" cols="12" sm="3">
                                    <v-text-field label="Teacher Name" v-model="search.Tname" outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col class="ml-5 mr-5" cols="12" sm="3">
                                    <v-text-field label="Academic Year" v-model="search.acyear" outlined dense required>
                                    </v-text-field>
                                </v-col>
                                <v-col class="ml-5 mr-5" cols="12" sm="3">
                                    <v-text-field label="Semester" v-model="search.semester" outlined dense required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="ml-5 mr-5" cols="12" sm="3">
                                    <v-select :items="formstatus" v-model="search.status" outlined dense required label="Status"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="ml-5 mr-5" cols="12" sm="3">
                                    <v-btn color=#8c1515 @click="searchVisit" dark>Search</v-btn>
                                </v-col>

                                <v-spacer></v-spacer>
                                <v-col cols="12" sm="3">
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
                            <v-row align="center" justify="center">
                                <v-col cols="12" sm="10" md="10">
                                    <v-col class="ml-5 mr-5" cols="12" sm="3">
                                        <v-text-field label="Academic Year" v-model="form.acyear" outlined dense required>
                                        </v-text-field>
                                    </v-col>

                                    <v-col class="ml-5 mr-5" cols="12" sm="3">
                                        <v-select :items="Ssemester" v-model="form.semester" outlined dense required label="Semester"></v-select>
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
                                                    <v-menu v-model="menu2" :disabled="!costform.checkBox.C112" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="form.cost1.forigindate" label="Flight Origin date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="form.cost1.forigindate" @input="menu2 = false"></v-date-picker>
                                                    </v-menu>
                                                    <v-text-field label="From" :disabled="!costform.checkBox.C112" v-model="form.cost1.foriginfrom" outlined dense required>
                                                    </v-text-field>
                                                    <v-text-field label="To" :disabled="!costform.checkBox.C112" v-model="form.cost1.foriginto" outlined dense required>
                                                    </v-text-field>
                                                    <span class="black--text">Departure Time</span>
                                                    <b-form-timepicker id="ATime" :disabled="!costform.checkBox.C112" locale="th" dense v-model="form.cost1.forigindetime"></b-form-timepicker>
                                                    <span class="black--text">Arrival Time</span>
                                                    <b-form-timepicker id="BTime" :disabled="!costform.checkBox.C112" locale="th" dense v-model="form.cost1.foriginartime"></b-form-timepicker>
                                                    <v-text-field class="mt-6" label="Cost" type="number" :disabled="!costform.checkBox.C112" v-model="form.cost1.forigincost" outlined dense required>
                                                    </v-text-field>
                                                </v-col>

                                                <v-col v-if="costform.checkBox.C111" class="ml-5 mr-5 mt-5" cols="12" sm="3">
                                                    <v-checkbox v-model="costform.checkBox.C113" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                                    <v-menu v-model="menu2" :disabled="!costform.checkBox.C113" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="form.cost1.fdesdate" label="Flight Destination date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="form.cost1.fdesdate" @input="menu2 = false"></v-date-picker>
                                                    </v-menu>
                                                    <v-text-field label="From" :disabled="!costform.checkBox.C113" v-model="form.cost1.fdesfrom" outlined dense required>
                                                    </v-text-field>
                                                    <v-text-field label="To" :disabled="!costform.checkBox.C113" v-model="form.cost1.fdesto" outlined dense required>
                                                    </v-text-field>
                                                    <span class="black--text">Departure Time</span>
                                                    <b-form-timepicker id="CTime" :disabled="!costform.checkBox.C113" locale="th" dense v-model="form.cost1.fdesdetime"></b-form-timepicker>
                                                    <span class="black--text">Arrival Time</span>
                                                    <b-form-timepicker id="DTime" :disabled="!costform.checkBox.C113" locale="th" dense v-model="form.cost1.fdesartime"></b-form-timepicker>
                                                    <v-text-field class="mt-6" label="Cost" type="number" :disabled="!costform.checkBox.C113" v-model="form.cost1.fdescost" outlined dense required>
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
                                                    <v-menu v-model="menu2" :disabled="!costform.checkBox.C122" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="form.cost1.borigindate" label="Origin date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="form.cost1.borigindate" @input="menu2 = false"></v-date-picker>
                                                    </v-menu>
                                                    <v-text-field label="From" :disabled="!costform.checkBox.C122" v-model="form.cost1.boriginfrom" outlined dense required>
                                                    </v-text-field>
                                                    <v-text-field label="To" :disabled="!costform.checkBox.C122" v-model="form.cost1.boriginto" outlined dense required>
                                                    </v-text-field>
                                                    <span class="black--text">Departure Time</span>
                                                    <b-form-timepicker id="FTime" :disabled="!costform.checkBox.C122" locale="th" dense v-model="form.cost1.borigindetime"></b-form-timepicker>
                                                    <span class="black--text">Arrival Time</span>
                                                    <b-form-timepicker id="FTime" :disabled="!costform.checkBox.C122" locale="th" dense v-model="form.cost1.boriginartime"></b-form-timepicker>
                                                    <v-text-field class="mt-6" label="Cost" type="number" :disabled="!costform.checkBox.C122" v-model="form.cost1.borigincost" outlined dense required>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col v-if="costform.checkBox.C121" class="ml-5 mr-5 " cols="12" sm="3">
                                                    <v-checkbox v-model="costform.checkBox.C123" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                                    <v-menu v-model="menu2" :disabled="!costform.checkBox.C123" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="form.cost1.bdesdate" label="Destination date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="form.cost1.bdesdate" @input="menu2 = false"></v-date-picker>
                                                    </v-menu>
                                                    <v-text-field label="From" :disabled="!costform.checkBox.C123" v-model="form.cost1.bdesfrom" outlined dense required>
                                                    </v-text-field>
                                                    <v-text-field label="To" :disabled="!costform.checkBox.C123" v-model="form.cost1.bdesto" outlined dense required>
                                                    </v-text-field>
                                                    <span class="black--text">Departure Time</span>
                                                    <b-form-timepicker id="FTime" :disabled="!costform.checkBox.C123" locale="th" dense v-model="form.cost1.bdesdetime"></b-form-timepicker>
                                                    <span class="black--text">Arrival Time</span>
                                                    <b-form-timepicker id="FTime" :disabled="!costform.checkBox.C123" locale="th" dense v-model="form.cost1.bdesartime"></b-form-timepicker>
                                                    <v-text-field class="mt-6" label="Cost" type="number" :disabled="!costform.checkBox.C123" v-model="form.cost1.bdescost" outlined dense required>
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
                                                    <v-text-field type="number" v-model="form.cost1.pricardistance" label="Distance (Kilometre x 3.50 Bath)" :disabled="!costform.checkBox.C131" outlined dense required>
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
                                                    <v-text-field type="number" label="Taxi Expenditure (Plaese fill information in document 6)" :disabled="!costform.checkBox.C211" v-model="form.cost2.taxicost" outlined dense required>
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
                                                        <v-text-field class="" type="number" label="Day" v-model="form.cost2.rcarday" outlined dense required>
                                                        </v-text-field>
                                                        <v-text-field class="" type="number" label="Cost (Bath)" v-model="form.cost2.rcarcost" outlined dense required>
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-checkbox v-model="costform.checkBox.C223" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                                    <v-text-field class="" label="Rental van" disabled outlined dense required>
                                                    </v-text-field>
                                                    <v-col v-if="costform.checkBox.C223" class="ml-5 " cols="12" sm="5">
                                                        <v-text-field class="" type="number" label="Day" v-model="form.cost2.rvandate" outlined dense required>
                                                        </v-text-field>
                                                        <v-text-field class="" type="number" label="Cost (Bath)" v-model="form.cost2.rvancost" outlined dense required>
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
                                                        <v-text-field class="" type="number" label="Day" v-model="form.cost2.fuelday" outlined dense required>
                                                        </v-text-field>
                                                        <v-text-field class="" type="number" label="Cost (Bath)" v-model="form.cost2.fuelcost" outlined dense required>
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
                                                                <v-text-field v-model="form.cost2.ferrydate" label="Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                            </template>
                                                            <v-date-picker v-model="form.cost2.ferrydate" @input="menu2 = false"></v-date-picker>
                                                        </v-menu>
                                                        <v-text-field class="" type="number" label="Cost (Bath)" v-model="form.cost2.ferrycost" :disabled="!costform.checkBox.C241" outlined dense required>
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
                                                                <v-text-field v-model="form.cost2.expressdate" label="Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                            </template>
                                                            <v-date-picker v-model="form.cost2.expressdate" @input="menu2 = false"></v-date-picker>
                                                        </v-menu>
                                                        <v-text-field class="" type="number" v-model="form.cost2.expresscost" label="Cost (Bath)" :disabled="!costform.checkBox.C251" outlined dense required>
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
                                                                <v-text-field v-model="form.cost2.carparkdate" label="Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                            </template>
                                                            <v-date-picker v-model="form.cost2.carparkdate" @input="menu2 = false"></v-date-picker>
                                                        </v-menu>
                                                        <v-text-field class="" type="number" v-model="form.cost2.carparkcost" label="Cost (Bath)" :disabled="!costform.checkBox.C261" outlined dense required>
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
                                                                <v-text-field v-model="form.cost3.hdatestart" label="Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                            </template>
                                                            <v-date-picker v-model="form.cost3.hdatestart" @input="menu2 = false"></v-date-picker>
                                                        </v-menu>
                                                        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field v-model="form.cost3.hdateend" label="To date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                            </template>
                                                            <v-date-picker v-model="form.cost3.hdateend" @input="menu2 = false"></v-date-picker>
                                                        </v-menu>
                                                        <v-text-field class="" v-model="form.cost3.hduration" type="number" label="Duration Night(s)" :disabled="!costform.checkBox.C311" outlined dense required>
                                                        </v-text-field>
                                                        <v-text-field class="" v-model="form.cost3.hcost" type="number" label="x Bath" :disabled="!costform.checkBox.C311" outlined dense required>
                                                        </v-text-field>
                                                        <v-textarea class="" v-model="form.cost3.haddress" label="Address" :disabled="!costform.checkBox.C311" outlined dense required>
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
                                                                <v-text-field v-model="form.cost3.hodatestart" label="Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                            </template>
                                                            <v-date-picker v-model="form.cost3.hodatestart" @input="menu2 = false"></v-date-picker>
                                                        </v-menu>
                                                        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field v-model="form.cost3.hodateend" label="To date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                            </template>
                                                            <v-date-picker v-model="form.cost3.hodateend" @input="menu2 = false"></v-date-picker>
                                                        </v-menu>
                                                        <v-text-field class="" v-model="form.cost3.hoduration" type="number" label="Duration Night(s)" :disabled="!costform.checkBox.C321" outlined dense required>
                                                        </v-text-field>
                                                        <v-text-field class="" v-model="form.cost3.hocost" type="number" label="x Bath" :disabled="!costform.checkBox.C321" outlined dense required>
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
                                                        <v-text-field v-model="form.cost4.datestart" label="Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="form.cost4.datestart" @input="menu2 = false"></v-date-picker>
                                                </v-menu>
                                                <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="form.cost4.dateend" label="To date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="form.cost4.dateend" @input="menu2 = false"></v-date-picker>
                                                </v-menu>
                                                <v-text-field v-model="form.cost4.duration" class="" type="number" label="Duration Day(s) x 350 Bath" outlined dense required>
                                                </v-text-field>

                                            </v-col>
                                        </v-card-text>

                                    </v-card>
                                    <v-btn color=#8c1515 class="mb-6" @click="calculate" dark>Calculate cost</v-btn>
                                    <v-text-field label="Total Cost" v-model="form.totalcost" disabled outlined dense required>

                                    </v-text-field>
                                    <v-textarea class="" v-model="form.file" label="Link google drive (File)"  outlined dense required>
                                    </v-textarea>
                                    <v-col cols="12">
                                        <v-textarea label="Comment from staff" ref="Comment from staff" v-model="form.comment" rows="4" outlined dense required>
                                        </v-textarea>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-card-actions>
                                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="reject" :disabled="!isEditing">Reject</v-btn>
                                        <v-btn color="blue darken-1" text @click="approve" :disabled="!isEditing">Approve</v-btn>
                                    </v-card-actions>

                                </v-col>
                            </v-row>
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
        return 'SLayout'
    },
    created() {},
    data: () => ({
        menu: false,
        dialog: false,
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
        checkroundtrip: true,
        checkvisit: true,
        checkAccom: true,
        checkAllowance: true,
        checkroundtrip: true,
        costform: {
            checkBox: {
                C111: true,
                C112: true,
                C113: true,
                C121: true,
                C122: true,
                C123: true,
                C131: true,
                C141: true,
                C142: true,
                C143: true,
                C144: true,
                C211: true,
                C221: true,
                C222: true,
                C223: true,
                C231: true,
                C241: true,
                C251: true,
                C261: true,
                C311: true,
                C321: true,
                C411: true,
            }
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
        Ssemester: ['1', '2', '3'],
        formstatus: ['Send to staff', 'Teacher Edit', 'Approved'],
        form: {
            teacherName: null,
            id: null,
            acyear: null,
            semester: null,
            status: null,
            comment: null,
            totalcost: null,
            file: null,
            cost1: {
                forigingform: null,
                fdesfrom: null,
                forigininto: null,
                fordesto: null,
                forigindedate: null,
                foriginardate: null,
                fdesdedate: null,
                fdesardate: null,
                forigincost: null,
                fdescost: null,
                boriginfrom: null,
                bdesfrom: null,
                boriginto: null,
                bdesto: null,
                borigindedate: null,
                boriginardate: null,
                bdesdedate: null,
                bdesardate: null,
                borigincost: null,
                bdescost: null,
                pricardistance: null,
                taxicost: null
            },
            cost2: {
                taxicost: null,
                rcarday: null,
                rcarcost: null,
                rvandate: null,
                rvancost: null,
                fuelday: null,
                fuelcost: null,
                ferrydate: null,
                ferrycost: null,
                expressdate: null,
                expresscost: null,
                carparkdate: null,
                carparkcost: null
            },
            cost3: {
                hdatestart: null,
                hdateend: null,
                hduration: null,
                hcost: null,
                haddress: null,
                hodatestart: null,
                hodateend: null,
                hoduration: null,
                hocost: null
            },
            cost4: {
                datestart: null,
                dateend: null,
                duration: null
            }
        },
        student: {
            name: null,
            ID: null,
            school: null,
            major: null,
            acyear: null,
            semester: null
        },
        dup: null,
        visitforms: [],
        headers: [{
                text: 'Teacher Name',
                align: 'start',
                value: 'tname',
            },
            { text: 'Semester', value: 'semester' },
            { text: 'Academic Year', value: 'acyear' },
            { text: 'Status', value: 'status' },
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
        close() {
            this.dialog = false
        },
        async edit(item) {
            console.log('SSSSSSSSSSSSSSSSSSSSSS')
            this.show = true
            this.isEditing = true
            this.dialog = true
            console.log(item.id)
            this.form.id = item.id,
                this.form.teacherName = item.tname,
                this.form.acyear = item.acyear,
                this.form.semester = item.semester,
                this.form.status = item.status,
                this.form.comment = item.comment,
                this.form.totalcost = item.totalcost,
                this.form.cost1.forigindate = item.forigindate,
                this.form.cost1.fdesdate = item.fdesdate,
                this.form.cost1.foriginfrom = item.foriginfrom,
                this.form.cost1.fdesfrom = item.fdesfrom,
                this.form.cost1.foriginto = item.foriginto,
                this.form.cost1.fdesto = item.fdesto,
                this.form.cost1.forigindetime = item.forigindetime,
                this.form.cost1.foriginartime = item.foriginartime,
                this.form.cost1.fdesdetime = item.fdesdetime,
                this.form.cost1.fdesartime = item.fdesartime,
                this.form.cost1.forigincost = item.forigincost,
                this.form.cost1.fdescost = item.fdescost,
                this.form.cost1.borigindate = item.borigindate,
                this.form.cost1.bdesdate = item.bdesdate,
                this.form.cost1.boriginfrom = item.boriginfrom,
                this.form.cost1.bdesfrom = item.bdesfrom,
                this.form.cost1.boriginto = item.boriginto,
                this.form.cost1.bdesto = item.bdesto,
                this.form.cost1.borigindetime = item.borigindetime,
                this.form.cost1.boriginartime = item.boriginartime,
                this.form.cost1.bdesdetime = item.bdesdetime,
                this.form.cost1.bdesartime = item.bdesartime,
                this.form.cost1.borigincost = item.borigincost,
                this.form.cost1.bdescost = item.bdescost,
                this.form.cost1.pricardistance = item.pricardistance,
                this.form.cost1.pricarcost = item.pricarcost,
                this.form.file = item.file
            this.form.cost1.taxicost = item.taxicost1,
                this.form.cost2.taxicost = item.taxicost2,
                this.form.cost2.rcarday = item.rcarday,
                this.form.cost2.rcarcost = item.rcarcost,
                this.form.cost2.rvandate = item.rvandate,
                this.form.cost2.rvancost = item.rvancost,
                this.form.cost2.fuelday = item.fuelday,
                this.form.cost2.fuelcost = item.fuelcost,
                this.form.cost2.ferrydate = item.ferrydate,
                this.form.cost2.ferrycost = item.ferrycost,
                this.form.cost2.expressdate = item.expressdate,
                this.form.cost2.expresscost = item.expresscost,
                this.form.cost2.carparkdate = item.carparkdate,
                this.form.cost2.carparkcost = item.carparkcost,

                this.form.cost3.hdatestart = item.hdatestart,
                this.form.cost3.hdateend = item.hdateend,
                this.form.cost3.hduration = item.hduration,
                this.form.cost3.hcost = item.hcost,
                this.form.cost3.haddress = item.haddress,
                this.form.cost3.hodatestart = item.hodatestart,
                this.form.cost3.hodateend = item.hodateend,
                this.form.cost3.hoduration = item.hoduration,
                this.form.cost3.hocost = item.hocost,
                this.form.cost4.datestart = item.datestart,
                this.form.cost4.dateend = item.dateend,
                this.form.cost4.duration = item.duration

        },
        approve() {
            console.log(this.form.id)
            axios.post('http://localhost:5010/aproveCostForm', {
                    VID: this.form.id
                })
                .then((response) => {}, (error) => {
                             location.reload();
                    console.log(error);
                });
            this.close()

        },
        reject() {
            if (this.form.comment == undefined) {
                alert('กรุณาใส่คำเสนอแนะเพื่อให้อาจารย์กลับไปแก้ไข')
            } else {
                axios.post('http://localhost:5010/rejectCostForm', {
                        VID: this.form.id,
                        comment: this.form.comment
                    })
                    .then((response) => {
                                 location.reload();
                        console.log(response.data)
                    }, (error) => {
                        console.log(error);
                    });
                this.close()
            }
        },
        searchVisit() {
            axios.post('http://localhost:5010/getSearchCostForm', {
                    tname: this.search.tname,
                    semester: this.search.semester,
                    acyear: this.search.acyear,
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
        Clear() {
            this.search.Sname = null,
                this.search.Tname = null,
                this.search.Date2Go = null,
                this.search.Date2Arrive = null,
                this.search.Date2Visit = null,
                this.search.semester = null,
                this.search.acyear = null,
                this.search.workplace = null,
                this.search.status = null
        },
    }
}
</script>
