<template>
  <div class="layout-page">
    {{ count }}
    <div>数组长度 {{ itemCount }}</div>
    <input type="text" v-model="keyword">
    <button @click="counterStore.addItem">添加</button>
    <ul v-for="item in items" :key="item.id">
      <li>
        {{ item.context }}
        <button @click="counterStore.removeItem(item)">remove</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {useCounterStore} from "../../store/counter";
import {storeToRefs } from 'pinia'
const counterStore = useCounterStore()
// 仅限于变量
const { count, itemCount, keyword, items } = storeToRefs(counterStore)
</script>

<style scoped>

</style>
