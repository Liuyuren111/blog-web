<template>
  <el-form
      :ref="formDomRef"
      :v-loading="isLoading"
      :label-width="formOptions.labelWidth || '100px'"
      :label-position="formOptions.labelPosition"
      :model="formOptions"
      :disabled="formOptions.disabled"
      :hide-required-asterisk="formOptions.hideRequired ? formOptions.hideRequired : false"
      @submit.prevent="onSubmit"
  >
    <el-row :gutter="formOptions.gutter">
      <template v-for="(item,index) in formOptions.fields">
        <el-col v-if="item.show" :key="index" :span="item.span" :xs="24">
          <el-form-item
              :label="item.label"
              :label-width="item.labelWidth"
              :rules="item.rules"
              :size="item.size"
              :prop="
              item.type === 'textmask'
                ? 'fields.' + index + '.maskValue'
                : 'fields.' + index + '.value'
            "
          >
            <!-- 文本框 -->
            <template v-if="['text', 'number'].includes(item.type)">
              <inputComponent
                  :attr="item"
                  @input="inputOnInput"
                  @change="inputChange"
                  @focus="inputFocus"
                  @blur="inputBlur"
              />
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
    <!-- button area -->
    <div :key="index" v-if="formOptions.button !== false">
      <el-button
          v-if="formOptions.submitButton !== false"
          type="primary"
          :loading="formOptions.isSubmit"
          :disabled="formOptions.submitDisable"
          @click="onSubmit"
      >
        {{ formOptions.confirmBtnText }}
      </el-button>
      <slot name="submitBtn" />
      <el-button @click="onCancel">{{ formOptions.cancelText }}</el-button>
    </div>
  </el-form>
</template>

<script setup>
import { onMounted, ref, toRefs, watchEffect} from "vue";
import inputComponent from './inputComponent.vue'
const input = ref('')
const props = defineProps({
  // 表单
  formOptions: {
    type: Object,
    default: () => {
    }
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  // 是否禁用表单内的所有组件
  isDisabled: {
    type: Boolean,
    default: false
  },
  // 表单DOM节点
  formDomRef: {
    type: String,
    default: null
  }
})
const {formOptions} = toRefs(props)
const emits = defineEmits([
  'submit',
  'errorSubmit',
  'inputOnInput',
    'inputChange',
    'inputFocus',
    'inputBlur',
    'cancel'
])
const newFormDomRef = ref(null)
// 获取表单的ref
const formDomRef = el => {
  if (el) {
    newFormDomRef.value = el
  }
}
/**
 * 扩展完善表单数据，补充表单字段验证规则
 */
const betterForm = (arr) => {
  let _arr = [...arr];
  _arr = _arr.map((item) => {
    let obj = item;
    obj.rules = obj.rules || [];
    obj.show = obj.show !== false;
    // 不可编辑且为空的表单域不需要填充placeholder
    if (!obj.placeholder && !obj.disabled) {
      if (['select', 'date'].includes(obj.type)) {
        obj.placeholder = `请选择${obj.label}`;
      } else {
        obj.placeholder = `请输入${obj.label}`;
      }
    }

    //输入框默认自动填充
    if (['numberBox', 'text', 'password'].includes(item.type)) {
      if (item.autocomplete === void 0) {
        item.autocomplete = 'on';
      }
    }
    if (['upload'].includes(item.type)) {
      if (item.showType === undefined) {
        item.showType = false;
      }
    }
    for (let i = 0; i < obj.rules.length; i++) {
      if (obj.rules[i].required) {
        obj.rules[i] = { message: obj.label || obj.placeholder + '不能为空', ...obj.rules[i] };
      }
      if (obj.rules[i].type === 'email') {
        obj.rules[i] = { message: '请填写正确的邮件格式', ...obj.rules[i] };
      }
      if (obj.rules[i].CustomRule) {
        //自定义规则
        obj.rules[i] = {
          message: obj.rules[i].CustomRule.message,
          validator: obj.rules[i].CustomRule.validator,
          ...obj.rules[i]
        };
      }
      if (obj.rules[i].customType === 'tel') {
        obj.rules[i] = {
          message: '请输入正确的手机格式',
          trigger: 'blur',
          validator: function (rule, value, callback) {
            if (value) {
              if (/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
                callback();
              } else {
                callback(new Error('请输入正确的手机格式'));
              }
            } else {
              callback();
            }
          },
          ...obj.rules[i]
        };
      }
      if (obj.rules[i].customType === 'idCard') {
        //身份证
        obj.rules[i] = {
          message: '请正确的身份证格式',
          validator: function (rule, value, callback) {
            if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
              callback();
            } else {
              callback(new Error('请输入正确的身份证格式'));
            }
          },
          ...obj.rules[i]
        };
      }
      if (obj.rules[i].customType === 'nums') {
        //纯数字
        obj.rules[i] = {
          message: '请输入正确的数字',
          validator: function (rule, value, callback) {
            if (/^\d+$/.test(value)) {
              callback();
            } else {
              callback(new Error('请输入正确的数字'));
            }
          },
          ...obj.rules[i]
        };
      }
      if (obj.rules[i].customType === 'section') {
        let limit = obj.rules[i].limit;
        let height = obj.rules[i].height;
        obj.rules[i] = {
          message: `请输入正确的数字，数字范围${obj.rules[i].limit}~${obj.rules[i].height}`,
          validator: function (rule, value, callback) {
            if (/^\d+$/.test(value) && value <= height && value >= limit) {
              callback();
            } else {
              callback(
                  new Error(
                      `请输入正确的数字，数字范围${obj.rules[i].limit}~${obj.rules[i].height}`
                  )
              );
            }
          }
        };
      }
      if (obj.rules[i].customType === 'money') {
        //金额，保留小数点后两位
        obj.rules[i] = {
          message: '请输入正确的金额',
          validator: function (rule, value, callback) {
            var moneyReg =
                /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;

            !value || moneyReg.test(value)
                ? callback()
                : callback(new Error('请输入正确的金额(非负数且最多保留两位小数)'));
          },
          ...obj.rules[i]
        };
      }
    }
    if (obj.type === 'upload') {
      item.isLoading = false
      // item.isLoading = false;
    }
    return obj;
  });
  return _arr;
}
/**
 * 自动添加labelwidth，当没有label时，labelwidth为0
 */
const fixLabelWidth = (arr) => {
  let _arr = [...arr];
  _arr = _arr.map((item) => {
    let obj = item;
    if (!obj.label) {
      obj.labelWidth = '0px';
    }
    return obj;
  });
  return _arr;
}
/**
 * 补充时间选择的组件需要用的字段
 */
const fixDatePick = (arr) => {
  let _arr = [...arr],
      index = 0;
  _arr = _arr.forEach((item) => {
    let obj = item;
    if (obj.type === 'dateTimePick') {
      obj.inputRef = `dateInput-${index}`;
      obj.datePickerRef = `datePicker-${index}`;
      index++;
    }
    return obj;
  });
  return _arr;
}
const assembleForm = () => {
  let option = formOptions.value;
  if (typeof option.labelPosition === 'undefined') {
    option.labelPosition = 'top';
  }
  if (typeof option.gutter === 'undefined') {
    option.gutter = 30;
  }
  if (typeof option.isSubmit === 'undefined') {
    option.isSubmit = false;
  }
  if (typeof option.submitDisable === 'undefined') {
    option.submitDisable = false;
  }
  if (typeof option.cancelText === 'undefined') {
    option.cancelText = '取消';
  }
  if (typeof option.confirmBtnText === 'undefined') {
    option.confirmBtnText = '确认';
  }
  if (typeof option.button === 'undefined') {
    option.button = true;
  }
  if (typeof option.ref === 'undefined') {
    option.ref = 'form';
  }
  betterForm(formOptions.value.fields);
  fixLabelWidth(formOptions.value.fields);
  fixDatePick(formOptions.value.fields);
}
/**
 * 取消事件
 */
function onCancel() {
  emits('cancel', formOptions.value);
}
/** 提交事件 */
const onSubmit = () => {
  newFormDomRef.value.validate(async (valid) => {
    console.log(valid, 'valid');
    if (valid) {
      emits('submit', formOptions.value);
    } else {
      emits('errorSubmit');
    }
  });
}

/**
 * @param {Object} field 表单数据
 */
function inputOnInput({ item }) {
  emits('inputOnInput', { item, form: formOptions.value });
}
function inputChange({ item }) {
  emits('inputChange', { item, form: formOptions.value });
}
function inputFocus({ item }) {
  emits('inputFocus', { input: item, form: formOptions.value });
}
function inputBlur({ item }) {
  emits('inputBlur', { input: item, form: formOptions.value });
}
watchEffect(() => {
  if (formOptions.fields) {
    console.log('11')
    assembleForm()
  }
})

onMounted(() => {
  formDomRef()
  assembleForm()
})
</script>

<style>
/* 去掉input number类型 右边上下标 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
/*  级联元素的宽度 为防止文字过长导致超出屏幕 */
.el-cascader-menu {
  max-width: 500px !important;
}
/*  提示盒子的宽度 */
.el-tooltip__popper.is-light {
  width: 600px !important;
}
</style>
<style lang="scss" scoped>
label {
  font-weight: normal;
}
.el-range-separator {
  display: none;
}
.datepicker-area {
  position: relative;
  .datePicker-area-input {
    // position: absolute;
    z-index: 2;
  }
  .form-generate-datepicker {
    position: absolute;
    top: 0px;
    left: 0px;
  }
}

.date-picker {
  &.el-input {
    width: 100%;
  }
}

.line-break {
  float: left;
  width: 100%;
}
.upload-img-content {
  display: flex;
  flex-wrap: wrap;
  margin-left: -20px;
}
.upload-content {
  display: flex;
  flex-wrap: wrap;
  margin-left: -20px;
}
.el-upload--picture-card {
  margin: 0 0 20px 20px;
}

/* 图片上传 */
.el-uploaded-img {
  position: relative;
  display: inline-block;
  width: 148px;
  height: 148px;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  margin: 0 8px 8px 8px;

  img {
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
.el-uploaded-img2 {
  position: relative;
  display: inline-block;
  width: 650px;
  height: 430px;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  margin: 0 8px 8px 8px;

  img {
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}

.upload-pdf {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  svg {
    width: 80px;
    height: 120px;
  }
  p {
    position: absolute;
    width: 100%;
    bottom: 22px;
    margin: 0;
    box-sizing: border-box;
    padding: 0 10px;
    // @include textOverflow();
  }

  .form-item-tip {
    color: #ccc;
  }
}

.mask-btn {
  position: absolute;
  top: 0;
  right: 0;
}

.el-icon-question {
  color: #999;
  font-size: 14px;
}

.form-generate-datepicker {
  .el-date-editor.el-input {
    width: 100%;
  }
}
.itemFill {
  width: 55%;
  margin-bottom: 10px;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #000 !important;
}
.el-autocomplete {
  width: 100%;
}
</style>
