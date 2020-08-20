# TodoList 待办事项

## 安装

```shell
git clone git@gitee.com:enpitsulin/vue-todo.git
# 安装依赖
npm install
# 运行开发服务器
npm run start
# 构建
npm run build
```


## 数据格式

某些对象在数据库中的格式

### todo item

类型使用JavaScript的类型标注

|字段名|描述|not null|类型|
|--|--|--|--|
|title|方便记忆的标题|√|string|
|remark|额外的备注|×|string|
|deadline|截止日期|×|datetime|
|completed|事件的完成状态 true：完成 false：未完成|√|boolean|
