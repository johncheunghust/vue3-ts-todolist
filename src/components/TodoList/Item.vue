<template>
  <div class="mt-1">
    <input
      type="checkbox"
      :checked="item.status === 'FINISHED'"
      @click="setStatus(item.id)"
      class="mr-1"
    />
    <label
      class="mr-3 is-size-6"
      :class="
        item.status === 'FINISHED' ? 'line-through is-italic has-text-grey-light' : ''
      "
    >
      {{ item.content }}
    </label>
    <button @click="removeTodo(item.id)" class="button is-light is-small mr-1 is-danger">
      删除
    </button>
    <button
      v-if="item.status !== 'FINISHED'"
      @click="setDoing(item.id)"
      class="button is-light is-small"
      :class="item.status === 'DOING' ? 'is-warning' : 'is-info'"
    >
      {{ item.status === 'DOING' ? '进行中' : '开始做' }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { ITodo } from '../../typings';

export default defineComponent({
  name: 'TodoItem',
  props: {
    item: {
      type: Object as PropType<ITodo>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const setStatus = (id: string): void => {
      emit('setStatus', id);
    };
    const removeTodo = (id: string): void => {
      emit('removeTodo', id);
    };
    const setDoing = (id: string): void => {
      emit('setDoing', id);
    };

    return {
      setStatus,
      removeTodo,
      setDoing,
    };
  },
});
</script>
<style>
.line-through {
  text-decoration: line-through;
}
</style>
