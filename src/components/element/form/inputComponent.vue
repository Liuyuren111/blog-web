<template>
  <el-input
      v-model="attr.value"
      :type="attr.type"
      :name="attr.name"
      :label="attr.label"
      :disabled="attr.disabled"
      :readonly="attr.readonly"
      :placeholder="attr.placeholder"
      :maxlength="attr.maxlength"
      :minlength="attr.minlength"
      :show-word-limit="attr.showWordLimit"
      :show-password="attr.showPassword"
      :autocomplete="attr.autocomplete"
      :clearable="attr.clearable"
      :size="attr.size"
      :rows="attr.rows"
      :autosize="attr.autosize"
      :min="attr.min"
      :max="attr.max"
      :step="attr.step"
      :resize="attr.resize"
      :autofocus="attr.autofocus"
      :form="attr.form"
      :tabindex="attr.tabindex"
      :validate-event="attr.validateEvent"
      :prefix-icon="attr.prefixIcon"
      :suffix-icon="attr.suffixIcon"
      @change="changeFn(attr)"
      @focus="focusFn(attr)"
      @input="inputFn(attr)"
      @blur="blurFn(attr)"
      @clear="clearFn(attr)"
  >
    <template v-if="attr.prefix">
      <slot name="prefix">{{ attr.prefix }}</slot>
    </template>
    <template v-if="attr.suffix">
      <slot name="suffix">{{ attr.suffix }}</slot>
    </template>
    <template v-if="attr.prepend">
      <slot name="prepend">{{ attr.prepend }}</slot>
    </template>
    <template v-if="attr.append">
      <slot name="append">{{ attr.append }}</slot>
    </template>
  </el-input>
</template>

<script setup>
  import {toRefs} from "vue";

  const props = defineProps({
    attr: {
      type: Object,
      default: () => {}
    }
  })
  const emits = defineEmits(['change','focus','input','blur','clear'])

  const {attr} = toRefs(props)

  function changeFn(attr) {
    emits('change', { item: attr });
  }
  function focusFn(attr) {
    emits('focus', { item: attr });
  }
  function inputFn(attr) {
    emits('input', { item: attr });
  }
  function blurFn(attr) {
    typeof attr.value === 'string' && (attr.value = attr.value.trim());
    emits('blur', { item: attr });
  }
  function clearFn(attr) {
    emits('clear', { item: attr });
  }
</script>

<style scoped>

</style>
