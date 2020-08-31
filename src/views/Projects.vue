<template>
  <div class="projects">
    <!-- 提示 -->
    <Snackbar ref="snackbar" @handleUndo="recovery_item()" />
    <h1 class="text-subtitle-1 grey--text">Projects</h1>
    <v-container class="my-2 pa-1 my-md-8 pa-md-6">
      <v-expansion-panels>
        <ProjectItem
          v-for="project in projects"
          :key="project.id"
          :project="project"
          @ProjectRemoved="hanlder_delete(project)"
          @ProjectEdit="edit_project(project)"
        />
      </v-expansion-panels>
    </v-container>
    <!-- 项目对话框 -->
    <ProjectEditor
      @itemAdded="show_success('add')"
      @itemModifyed="show_success('modify')"
      ref="editor"
    />
  </div>
</template>

<script>
import * as Utils from "../utils/utils";
import { mapGetters } from "vuex";
import ProjectItem from "../components/ProjectItem.vue";
import Snackbar from "../components/Snackbar.vue";
import ProjectEditor from "../components/ProjectEditor.vue";

export default {
  data() {
    return {
      projects: [],
      recoveryProject: {},
    };
  },
  components: { ProjectItem, Snackbar, ProjectEditor },

  methods: {
    init_projects() {
      var projects = Utils.getItem("projects");
      if (projects) {
        this.projects = projects;
      }
    },
    edit_project(project) {
      this.$refs.editor.setEdit(JSON.parse(JSON.stringify(project)));
    },
    add_project_item(id, item) {
      this.$store.dispatch("addProjectItem", id, item);
    },
    hanlder_delete(project) {
      this.$store.dispatch("removeProject", project.id);
      this.recoveryProject = project;
      this.show_delete(project);
    },
    recovery_item() {
      this.$store.dispatch("addProject", this.recoveryProject);
    },
    show_success(type) {
      let msg =
        type === "add" ? "漂亮！你成功添加了一个新项目" : "OK!修改成功!";
      this.$refs.snackbar.show(msg);
    },
    show_delete(project) {
      let msg = `你删除了项目:${project.title}`;
      this.$refs.snackbar.showError(msg);
    },
  },
  computed: {
    ...mapGetters(["getProjects"]),
  },
  watch: {
    getProjects: {
      handler: function (li) {
        let vm = this;
        this.projects = li;
      },
      deep: true,
    },
  },
  mounted() {
    this.init_projects();
  },
};
</script>

<style>
</style>