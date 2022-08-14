<template>
  <div>
    <el-button @click="handleSearch(formOptions)">搜索</el-button>
    <FormAssemble
        class="common-form"
        :formOptions="formOptions"
        formDomRef="formDomRef"
        @errorSubmit="errorSubmit"
        @submit="submit"
    />
    <TableComponent :options="tableOptions"/>

  </div>
</template>

<script setup>
import {reactive, ref, watchEffect} from 'vue'
import FormAssemble from '../../components/element/form/FormAssemble.vue'
import TableComponent from '../../components/element/table/TableComponent.vue'
import { message } from '../../utils/message'
import {getFormFieldValue, searchParamHandleFn} from '../../utils'

const formOptions = reactive({
  labelPosition: 'top',
  gutter: 20,
  isSubmit: false,
  button: false,
  confirmBtnText: '保存',
  cancelText: '返回上一页',
  fields: [
    {
      show: true,
      name: 'title',
      span: 6,
      type: 'text',
      label: '',
      placeholder: '标题',
      rules: [{ required: true }],
      value: '',
      disabled: false,
    },
    {
      show: true,
      name: 'password',
      span: 6,
      type: 'number',
      label: '',
      placeholder: '密码',
      rules: [{ required: true }],
      value: '',
      disabled: false,
    },
  ]
})
const tableOptions = {
  columns: [
    {props: "id", label: 'ID'},
    {props: "username", label: '账号'},
    {props: "status", label: '状态', scope: 'status'},
    {props: "code", label: '邀请码'},
    {props: "createdAt", label: '创建时间'},
    {props: "updatedAt", label: '更新时间'},
    {props: "actions", label: '操作', scope: 'actions'},
  ],
  actionBtn: ["show", "delete", "update"]
}

const keyword = ref('')
const fullFill = ref(false) // 表单是否全部填写

// 全部填写
const submit = () => {
  fullFill.value = true;
}
// 没有全部填写
const errorSubmit = () => {
  fullFill.value = false;
  message({
    message: '您尚未填写完全',
    type: 'warning'
  });
}

//用户搜索
function handleSearch({ fields }) {
  console.log(fields);
  const searchParams = searchParamHandleFn({fields});
  console.log(searchParams);
  // this.pageIndex = 1;
  // this.getSwarmList({
  //   ...this.searchParams
  // });
}

watchEffect(() => {
  const result = getFormFieldValue(formOptions.fields, 'password');
  console.log(result);
  if (formOptions.fields) {
    console.log(formOptions.fields);
  }
})
</script>

<style scoped>

</style>
