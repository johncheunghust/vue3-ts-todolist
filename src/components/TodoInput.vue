<template>
  <div>
    <input
      class="input is-primary"
      type="text"
      v-model="todoValue"
      @keyup="setTodoValue"
      placeholder="输入您的todo"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useTodo } from '../hooks';

export default defineComponent({
  name: 'TodoInput',
  setup(props) {
    const todoValue = ref<string>('');

    const { setTodo } = useTodo();

    const setInputText = (text: string) => {
      todoValue.value = text;
    };

    const setTodoValue = (e: KeyboardEvent): void => {
      if (e.key === 'Enter' && todoValue.value.trim().length) {
        setTodo(todoValue.value);
        todoValue.value = '';
      }
    };

    return {
      todoValue,
      setTodoValue,
    };
  },
});
</script>
<style></style>
