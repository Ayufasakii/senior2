<template>
    <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="6"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color=#8c1515
                dark
                flat
              >
                <v-toolbar-title>Profile</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
             
              <v-card-text>
                <v-row>
                <v-col cols="12" sm="6">
                <v-text-field
                label="First name"
                value="John"
                outlined
                dense
                disabled
                >
                </v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                <v-text-field
                label="Last name"
                value="Doe"
                outlined
                dense
                disabled
                >
                </v-text-field>
                </v-col>

                <v-col cols="12" sm="6" >
                <v-text-field
                label="Email"
                outlined
                dense
                disabled
                >
                </v-text-field>
                </v-col>

                <v-col cols="12" sm="6" >
                <v-text-field
                label="Mobile Phone"
                outlined
                dense
                disabled
                >
                </v-text-field>
                </v-col>

                <v-col cols="12" sm="6" >
                <v-text-field
                label="Staff ID"
                outlined
                dense
                disabled
                >
                </v-text-field>
                </v-col>
                </v-row>

                <v-row>
                <v-col cols="12" sm="6" >
                <v-text-field
                label="School"
                outlined
                dense
                disabled
                >
                </v-text-field>
                </v-col>
                
                <v-col cols="12" sm="6" >
                <v-text-field
                label="Major"
                outlined
                dense
                disabled
                >
                </v-text-field>
                </v-col>

                </v-row>
              </v-card-text>
            </v-card>

          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  layout (context) {
    return 'TLayout'
  },
  data: () => ({
      School: ['IT', 'Bar', 'Fizz', 'Buzz'],
      Major: ['IT', 'CS', 'SE', 'Buzz'],
    }),
    
}
</script>