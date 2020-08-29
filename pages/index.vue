<template>
    <v-app id="inspire">
        <v-main>
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
                md="5"
                >
                    <v-card class="elevation-12">
                        <v-toolbar color=#8c1515 dark flat>
                            <v-toolbar-title>Login</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                label="Username"
                                name="username"
                                prepend-icon="mdi-account"
                                type="text"
                                ></v-text-field>

                                <v-text-field
                                id="password"
                                label="Password"
                                name="password"
                                prepend-icon="mdi-lock"
                                type="password"
                                ></v-text-field>
                                </v-form>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color=#8c1515 dark >Login</v-btn>
                            </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        </v-main>
    </v-app>
</template>

<style>
    html{
      overflow-y: auto;
    }
</style>