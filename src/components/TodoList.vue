<template>
  <v-container fluid class="fill-height">
    <v-row no-gutters>
      <v-col>
        <v-card>
          <v-card-actions>
            <v-col cols="2" class="checkbox">
              <v-checkbox hide-details></v-checkbox>
            </v-col>Top western road trips
            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="8" offset="2" offset-xs="0" align="center">
        <v-pagination v-model="page" :length="5"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      show: false,
    };
  },
};
</script>

<style >
.checkbox .v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}
</style>