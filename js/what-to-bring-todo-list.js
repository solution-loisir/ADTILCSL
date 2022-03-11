import { createApp } from "petite-vue";

const generateUid = () => `what-to-bring-todo-list-${Math.floor(Math.random() * 10001)}`;

const defaultItems = [
  {
    uid: generateUid(),
    name: "Sac de couchage",
    isChecked: false
  },
  {
    uid: generateUid(),
    name: "Doublure de sac de couchage",
    isChecked: false
  },
  {
    uid: generateUid(),
    name: "Oreiller (facultatif)",
    isChecked: false
  }
];

const STORAGE_KEY = "todos-sejour";

const todoStorage = {
  fetch() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(defaultItems));
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
  remove() {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function CreateTodoForm() {
  return {
    $template: "#create-todo-form"
  }
}

function TodoItem() {
  return {
    $template: "#todo-item"
  }
}

createApp({
  $delimiters: ['${', '}'],
  todos: todoStorage.fetch(),
  todoName: "",
  CreateTodoForm,
  TodoItem,

  createNewTodo() {
    if(!this.todoName.trim()) {
      this.todoName = "";
      return;
    };
    const newTodo = {
      uid: generateUid(),
      name: this.todoName,
      isChecked: false
    }
    this.todos.push(newTodo);
    this.todoName = "";
  },

  submitTodoWithEnterKey(event) {
    event.target.blur();
    this.createNewTodo();
  },

  filteredTodos(condition) {
    return this.todos.filter(condition);
  },

  removeTodo(todo) {
    this.todos.splice(this.todos.indexOf(todo), 1)
  },

  save() {
    todoStorage.save(this.todos)
  },

  removeTodoStorage() {
    const result = window.confirm("Voulez-vous réinitialiser la liste par défault? Vous perdrez toutes les modifications que vous avez apportez.");

    if(result) {
      todoStorage.remove();
      this.todos = todoStorage.fetch();
    }
  }
  
}).mount("#what-to-bring-todo-list");