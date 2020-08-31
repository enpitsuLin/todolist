<template>
  <v-expansion-panel>
    <v-expansion-panel-header v-slot="{ open }">
      <v-row no-gutters>
        <v-col cols="6" sm="5" md="4">{{ project.title }}</v-col>
        <v-col cols="6" sm="7" md="8" class="text--secondary">
          <v-fade-transition leave-absolute>
            <v-row v-if="open" no-gutters style="width: 100%">
              <v-col cols="3">
                <span>进度:</span>
              </v-col>
              <v-col cols="8" class="mr-1">
                <v-progress-linear
                  :color="process>=100?'green':'light-blue'"
                  height="10"
                  :value="process"
                  striped
                ></v-progress-linear>
              </v-col>
            </v-row>
            <v-row v-else no-gutters style="width: 100%">
              <v-col cols="12">截止于 {{ project.due }}</v-col>
            </v-row>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-divider></v-divider>
      <v-timeline dense>
        <v-timeline-item small v-for="(item,i) in project.items" :key="i">
          <v-card class="elevation-2">
            <v-row no-gutters>
              <v-col>
                <v-checkbox
                  class="my-2 pt-0 pl-4"
                  hide-details
                  dense
                  v-model="item.done"
                  @click="item.done?step++:step--"
                  :color="item.done && 'grey' || 'primary'"
                >
                  <template v-slot:label>
                    <div :class="item.done && 'grey--text' || 'primary--text'" v-text="item.title"></div>
                  </template>
                </v-checkbox>
              </v-col>
            </v-row>
          </v-card>
        </v-timeline-item>
        <v-timeline-item small v-if="project.items.length==0">
          <v-card class="elevation-2">
            <v-row no-gutters>
              <v-col>
                <div class="primary--text my-2 pt-0 pl-4">没有可用步骤,按下面的按钮来添加一个</div>
              </v-col>
            </v-row>
          </v-card>
        </v-timeline-item>
      </v-timeline>
      <v-divider></v-divider>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn text @click="edit_project()">
          <v-icon>mdi-pencil</v-icon>
          <span>编辑</span>
        </v-btn>
        <ProjectItemEdit :id="project.id" />
        <v-btn text color="red" @click="remove_project()">
          <v-icon>mdi-delete</v-icon>
          <span>删除</span>
        </v-btn>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import ProjectItemEdit from "./ProjectItemEditor.vue";

export default {
  props: {
    project: {
      type: Object,
      default: function () {
        return { id: null, title: "", due: "", items: [] };
      },
    },
  },
  data() {
    return { step: 0 };
  },
  components: { ProjectItemEdit },
  computed: {
    process() {
      return (this.step / this.project.items.length) * 100;
    },
  },
  methods: {
    remove_project() {
      this.$emit("ProjectRemoved", this.project);
    },
    edit_project() {
      this.$emit("ProjectEdit", this.project);
    },
  },
};
</script>

<style>
</style>