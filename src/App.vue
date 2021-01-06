<template>
  <div
    class="columns is-centeredis-fullhd is-flex-direction-column is-align-items-center"
  >
    <p class="level-item has-text-centered column is-4 is-centered is-size-1">
      Todo List Demo
    </p>
    <todo-input class="column is-4"></todo-input>
    <todo-list :todoList="todoList" class="column is-4"></todo-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList/index.vue';
import { useTodo } from './hooks';
import { IState } from './typings';

export default defineComponent({
  name: 'App',
  components: {
    TodoInput,
    TodoList,
  },
  setup() {
    const { setTodoList } = useTodo();

    const store = useStore<IState>();

    onMounted(() => {
      setTodoList();
    });

    return {
      todoList: computed(() => store.state.todoList),
    };
  },
});
</script>

<style></style>
