<template>
<v-app id="inspire">
    <v-main>
        <v-container fluid class="fill-height">
            <v-row align="center" justify="center">
                <v-col cols="12" sm="10" md="10">
                    <v-card class="elevation-12">
                        <v-text-field v-model="name" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                        <v-btn class="mb-2" color=#8c1515 small dark v-bind="attrs" v-on="on" @click="generatePDF">New</v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
import jspdf from 'jspdf'
export default {
    methods:{
        generatePDF(){
            const doc = new jspdf()
            doc.text(this.name,15,15);
            doc.save("pdf.pdf")
        }
    },
}
</script>