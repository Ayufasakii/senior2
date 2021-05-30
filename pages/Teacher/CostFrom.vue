<template>
<v-app id="inspire">
    <v-content>
        <v-container class="fill-height" fluid>
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
                                    <v-text-field label="From" :disabled="!costform.checkBox.C112" v-model="form.cost1.forigingfrom" outlined dense required>
                                    </v-text-field>
                                    <v-text-field label="To" :disabled="!costform.checkBox.C112" v-model="form.cost1.foriginto" outlined dense required>
                                    </v-text-field>
                                    <span class="black--text">Departure Time</span>
                                    <b-form-timepicker id="FTime" :disabled="!costform.checkBox.C112" locale="th" dense v-model="form.cost1.forigindetime"></b-form-timepicker>
                                    <span class="black--text">Arrival Time</span>
                                    <b-form-timepicker id="CTime" :disabled="!costform.checkBox.C112" locale="th" dense v-model="form.cost1.foriginartime"></b-form-timepicker>
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
                                    <v-text-field label="To" :disabled="!costform.checkBox.C113" v-model="form.cost1.fordesto" outlined dense required>
                                    </v-text-field>
                                    <span class="black--text">Departure Time</span>
                                    <b-form-timepicker id="FTime" :disabled="!costform.checkBox.C113" locale="th" dense v-model="form.cost1.fdesdetime"></b-form-timepicker>
                                    <span class="black--text">Arrival Time</span>
                                    <b-form-timepicker id="FTime" :disabled="!costform.checkBox.C113" locale="th" dense v-model="form.cost1.fdesartime"></b-form-timepicker>
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
        cal: false,
        form: {
            teacherName: null,
            acyear: null,
            semester: null,
            status: null,
            comment: null,
            totalcost: null,
            cost1: {
                forigindate: null,
                fdesdate: null,
                forigingfrom: null,
                fdesfrom: null,
                foriginto: null,
                fordesto: null,
                forigindetime: null,
                foriginartime: null,
                fdesdetime: null,
                fdesartime: null,
                forigincost: 0,
                fdescost: 0,
                borigindate: null,
                bdesdate: null,
                boriginfrom: null,
                bdesfrom: null,
                boriginto: null,
                bdesto: null,
                borigindetime: null,
                boriginartime: null,
                bdesdetime: null,
                bdesartime: null,
                borigincost: 0,
                bdescost: 0,
                pricardistance: 0,
                pricarcost: 0,
                taxicost: 0,
            },
            cost2: {
                taxicost: 0,
                rcarday: 0,
                rcarcost: 0,
                rvandate: 0,
                rvancost: 0,
                fuelday: 0,
                fuelcost: 0,
                ferrydate: null,
                ferrycost: 0,
                expressdate: null,
                expresscost: 0,
                carparkdate: null,
                carparkcost: 0
            },
            cost3: {
                hdatestart: null,
                hdateend: null,
                hduration: 0,
                hcost: 0,
                haddress: null,
                hodatestart: null,
                hodateend: null,
                hoduration: 0,
                hocost: 0
            },
            cost4: {
                datestart: null,
                dateend: null,
                duration: 0
            }
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
        calculate() {
            this.cal = true
            let a1 = parseInt(this.form.cost1.forigincost)
            let b1 = parseInt(this.form.cost1.fdescost)
            let c1 = parseInt(this.form.cost1.borigincost)
            let d1 = parseInt(this.form.cost1.bdescost)
            let e1 = parseInt(this.form.cost1.pricardistance)
            this.form.cost1.taxicost = 0
            if (this.costform.checkBox.C142 == true) {
                this.form.cost1.taxicost = this.form.cost1.taxicost + 700
            }
            if (this.costform.checkBox.C143 == true) {
                this.form.cost1.taxicost = this.form.cost1.taxicost + 350
            }
            if (this.costform.checkBox.C144 == true) {
                this.form.cost1.taxicost = this.form.cost1.taxicost + 350
            }
            e1 = e1 * 3.5
            let totalcost1 = a1 + b1 + c1 + d1 + e1 + this.form.cost1.taxicost
            console.log(totalcost1)
            let a2 = parseInt(this.form.cost2.taxicost)
            let b2 = parseInt(this.form.cost2.rcarday)
            let c2 = parseInt(this.form.cost2.rcarcost)
            let d2 = parseInt(this.form.cost2.rvandate)
            let e2 = parseInt(this.form.cost2.rvancost)
            let f2 = parseInt(this.form.cost2.fuelday)
            let g2 = parseInt(this.form.cost2.fuelcost)
            let h2 = parseInt(this.form.cost2.ferrycost)
            let i2 = parseInt(this.form.cost2.expresscost)
            let j2 = parseInt(this.form.cost2.carparkcost)
            c2 = b2*c2
            e2 = d2*e2
            g2 = f2*g2
            let totalcost2 = a2 + c2 + e2 + g2 + h2 + i2 + j2
            console.log(totalcost2)
            let a3 = parseInt(this.form.cost3.hduration)
            let b3 = parseInt(this.form.cost3.hcost)
            let c3 = parseInt(this.form.cost3.hoduration)
            let d3 = parseInt(this.form.cost3.hocost)
            b3 = a3*b3
            d3 = c3*d3
            let totalcost3 = b3+d3 
            console.log(totalcost3)
            let a4 = parseInt(this.form.cost4.duration)
            a4 = a4*350
            console.log(a4)
            let totalcost = totalcost1+totalcost2+totalcost3+a4
            console.log('totalcost: '+totalcost)
            this.form.totalcost = totalcost
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
