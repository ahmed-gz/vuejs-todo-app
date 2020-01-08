import axios from "axios";

export default {
  fetchTodoCollection() {
    let url = `https://jsonplaceholder.typicode.com/todos/`;

    return axios.get(url).then(response => {
      return response.data;
    });
  },

  fetchSingleTodo(id) {
    let url = `https://jsonplaceholder.typicode.com/todos/${id}`;

    return axios.get(url).then(response => {
      return response.data;
    });
  }
};
