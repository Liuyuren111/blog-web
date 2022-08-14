import {defineStore} from "pinia";
import {ref, reactive, computed} from "vue";

let id = 1;
const addID = () => id++;

export const useCounterStore = defineStore('counter', () => {
  const keyword = ref('');
  const items = reactive([])
  const itemCount = computed(() => items.length)

  const addItem = () =>{
    items.push({
      id: addID(),
      context: keyword.value
    })
  }

  const removeItem = (item) => {
    const index = items.indexOf(item)
    console.log(index, 'index');
    items.splice(index, 1)
  }
  return {
    keyword,
    items,
    itemCount,
    addItem,
    removeItem
  }
})
