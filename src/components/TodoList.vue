<template>
  <v-container fluid class="fill-height">
    <v-row no-gutters>
      <v-col>
        <v-card v-for="(item,i) in itemList" :key="i">
          <v-card-actions @mouseenter="handleEnter(item)" @mouseleave="handleLeave(item)">
            <v-col cols="1" class="checkbox">
              <v-checkbox hide-details v-model="item.completed"></v-checkbox>
            </v-col>

            <v-col
              cols="10"
              :class="{'text-decoration-line-through completed':item.completed}"
            >{{item.title}}</v-col>
            <v-spacer></v-spacer>
            <v-btn icon @click="item.show = !item.show">
              <v-icon>{{ item.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="item.show">
              <v-divider></v-divider>
              <v-col cols="10" offset="1" offset-sm="0">
                <v-card-text>{{item.remark}}</v-card-text>
              </v-col>

              <v-row>
                <v-col cols="1" align-self="end">
                  <v-btn @click="item.editing=true">
                    <v-icon>mdi-pencil</v-icon>修改
                  </v-btn>
                </v-col>
                <v-col cols="1">
                  <v-btn dark color="red">
                    <v-icon>mdi-delete</v-icon>删除
                  </v-btn>
                </v-col>
              </v-row>
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
      itemList: [
        {
          title: "代办标题1",
          hover: false,
          show: false,
          remark:
            "这里是一段待办事项内容1，作为记录，其余的都是废话，想看就看不想看就算了。",
          showdelete: false,
          completed: false,
        },
        {
          title: "代办标题2",
          hover: false,
          show: false,
          remark:
            "这里是一段待办事项内容2，作为记录，其余的都是废话，想看就看不想看就算了。",
          showdelete: false,
          completed: true,
        },
        {
          title: "代办标题3长长长长长长长长长长长长长长",
          hover: false,
          show: false,
          remark:
            "这里是一段待办事项内容3，作为记录，其余的都是废话，想看就看不想看就算了。",
          showdelete: false,
          completed: true,
        },
        {
          title: "代办标题4",
          hover: false,
          show: false,
          remark:
            "这里是一段待办事项内容2，作为记录，其余的都是废话，想看就看不想看就算了。",
          showdelete: false,
          completed: true,
        },
        {
          title: "代办标题5",
          hover: false,
          show: false,
          remark:
            "这里是一段待办事项内容2，作为记录，其余的都是废话，想看就看不想看就算了。",
          showdelete: false,
          completed: true,
        },
      ],
      page: 1,
    };
  },
  methods: {
    handleEnter(item) {
      var index = this.itemList.indexOf(item);
      this.itemList[index].hover = true;
    },
    handleLeave(item) {
      var index = this.itemList.indexOf(item);
      this.itemList[index].hover = false;
    },
  },
};
</script>

<style >
.checkbox .v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}
.text-decoration-line-through.completed {
  color: rgba(0, 0, 0, 0.4);
}
</style>