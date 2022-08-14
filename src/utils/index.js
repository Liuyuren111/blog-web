/**
 * 获取表单字段值
 * @param {Array} formField 表单域
 * @param {string} fieldName 表单域name值
 * @param {string|Number} defaultValue 默认值
 *
 */
export function getFormFieldValue(formField = [], fieldName, defaultValue = '') {
  const fieldNameObj = formField.find((item) => item.name === fieldName);
  return fieldNameObj ? fieldNameObj.value : defaultValue;
}

/**
 * 过滤无效的参数字段
 * @param {*} obj
 */
export function filerParamsEmptyPro(obj) {
  for (const key in obj) {
    //Array(0) === [] false
    if (
      obj[key] === '' ||
      (Array.isArray(obj[key]) && JSON.stringify(obj[key]) === '[]') ||
      obj[key] == null
    ) {
      delete obj[key];
    }
  }
  return obj;
}
/**
 * @description: fields提取成对象
 * @param {*} fields
 * @return {*}
 */
export function formFieldsCollect({ fields }) {
  let obj = {};
  if (!isArray(fields) || !fields.length) return obj;
  for (let i = 0; i < fields.length; i++) {
    if (['dateTimePick', 'daterange'].includes(fields[i].type) && fields[i].show) {
      if (isArray(fields[i].value) && fields[i].value.length > 1) {
        //时间选择范围
        //特殊处理时间段选择器，字段名从name取
        let nameArr = fields[i].name.split('|');
        for (let j = 0; j < nameArr.length; j++) {
          const item = nameArr[j];
          if (fields[i].isSecond) {
            // 时间戳精确单位为秒
            obj[item] = safeNewDate(fields[i]['value'][j]).getTime() / 1000;
          } else {
            obj[item] = safeNewDate(fields[i]['value'][j]).getTime();
          }
        }
      } else if (fields[i].name.indexOf('|') < 0) {
        //非时间选择时，name 没有分割符
        if (fields[i].value) {
          obj[fields[i].name] = safeNewDate(fields[i]['value']).getTime();
        }
      }
      continue;
    }
    if (fields[i].type === 'datetimerange') {
      obj = Object.assign(obj, handleDateTimeRange(fields[i]));
      continue;
    }
    if (fields[i].type === 'datetime') {
      if (fields[i].value && !isNumber(fields[i].value)) {
        obj[fields[i].name] = fields[i]['value'].getTime();
      } else {
        obj[fields[i].name] = fields[i]['value'];
      }
      continue;
    }
    if (fields[i].type === 'cascader') {
      let value = fields[i]['value'];
      if (cheakTypeObject(value, 'Array')) {
        if (fields[i].props && fields[i].props.multiple) {
          // 多选
          obj[fields[i].name] = value.map((item) => item[item.length - 1]);
        } else {
          if (value && value.length > 0) {
            obj[fields[i].name] = value[value.length - 1];
          }
        }
      }
      if (cheakTypeObject(value, 'String')) {
        obj[fields[i].name] = value;
      }
      continue;
    }
    if (fields[i].type === 'title') {
      continue;
    }
    if (fields[i].type === 'upload' && isArray(fields[i].value) && fields[i].value.length > 0) {
      obj[fields[i].name] = fields[i].value
        .map((item) => {
          return item.value;
        })
        .join(',');
      continue;
    }
    obj[fields[i].name] = fields[i]['value'];
  }
  return obj;
}
/**
 * 搜索参数统一处理
 * @param {Array} fields element表单数据
 */
export function searchParamHandleFn({ fields, searchParams = {} }) {
  const fieldsObj = formFieldsCollect({ fields });
  const obj = Object.assign(searchParams, fieldsObj);
  return filerParamsEmptyPro(obj);
}

/**
 * 给定val值和字典 返回字典中的label
 * @param val String
 * @param dict Array
 */
export function getLabelFromDict(val, dict) {
  if (Array.isArray(dict)) {
    let target = dict.find((item) => '' + item.value === '' + val);
    if (target) {
      return typeof target.name !== 'undefined' ? target.name : target.label;
    }
  }
}
