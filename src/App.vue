<template>
  <div>
    <header>
      <section>
        <label for="title">Todo List</label>
        <input type="text" placeholder="添加事件" />
      </section>
    </header>
    <section>
      <h2>正在进行</h2>
      <ol>
        <li draggable>
          <input type="checkbox" />
          <p>找1111</p>
          <a>-</a>
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
import "./assets/styles/style.css";

export default {
  name: "App",
  data() {
    return {
      todoData: ["todo1", "todo2", "todo3", "todo4"],
    };
  },
};
</script>

<style>
li:nth-of-type(odd) {
  color: blue;
}
</style>