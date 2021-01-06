<template>
  <div>
    <todo-item
      v-for="t of todoList"
      :key="t.id"
      :item="t"
      @removeTodo="removeTodo"
      @setStatus="setStatus"
      @setDoing="setDoing"
    >
    </todo-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue';
import { useTodo } from '../../hooks';
import { ITodo } from '../../typings';
import TodoItem from './Item.vue';
export default defineComponent({
  name: 'TodoList',
  props: {
    todoList: Array as PropType<Array<ITodo>> | null,
  },
  components: {
    TodoItem,
  },
  setup(props) {
    const { removeTodo, setStatus, setDoing } = useTodo();
    return {
      removeTodo,
      setStatus,
      setDoing,
    };
  },
});
</script>
<style></style>
