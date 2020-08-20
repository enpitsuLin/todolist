<template>
  <div class="todo-item">
    <input type="checkbox" @change="change_item(item,true)" />
    <p>{{item.title}}</p>
    <button @click="delete_item(item,true)" class="destroy"></button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  data() {
    return {
      title: "",
      remark: "",
      completed: false,
      deadline: "",
    };
  },
};
</script>

<style scoped>
</style>