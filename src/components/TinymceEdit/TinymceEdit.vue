<template>
  <div>
    <textarea id="textareaRef" ref="textareaRef"></textarea>
  </div>
</template>

<script setup>

import {onBeforeUnmount, onMounted} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  }
})

const emits = defineEmits(['update:modelValue'])

function init() {
  tinymce.init({
    selector: '#textareaRef',
    language: 'zh_CN',
    branding: false, // 隐藏右下角
    // 工具栏
    toolbar: [
      'undo redo | styleselect | bold italic | link image',
      'alignleft aligncenter alignright'
    ],
    menu: {
      file: {title: 'File', items: 'newdocument'},
      edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall'},
      // insert: {title: 'Insert', items: 'link media | template hr'},
      view: {title: 'View', items: 'visualaid'},
      format: {
        title: 'Format',
        items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'
      },
      // table: {title: 'Table', items: 'inserttable tableprops deletetable | cell row column'},
      // tools: {title: 'Tools', items: 'spellchecker code'}
    },
    // // preview 预览插件
    // plugins: 'preview',
    // // 监听 tinymce 初始化完成事件
    setup: (editor) => {
      editor.on('input change undo redo execCommand KeyUp', () => {
        emits('update:modelValue', editor.getContent())
      })
    },
    // 监听 input 和 change 事件,实时更新value
    init_instance_callback: (editor) => {
      editor.setContent(`<p>${props.modelValue}</p>`)
    }
  })
}


onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  window.tinymce.remove('#textareaRef')
})
</script>

<style lang="scss" scoped>
#tinymce-editor {
  width: 100%;
  height: calc(100vh - 100px);
}
</style>
