<template>
  <div class="page">
    <h3>发表文章</h3>

    <el-form
        ref="form"
        :model="formData"
        label-position="top"
        label-width="auto">
      <el-form-item label="标题">
        <el-input placeholder="请输入标题" v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="作者">
        <el-input disabled v-model="formData.auth"/>
      </el-form-item>
      <el-form-item label="选择封面">
        <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="formData.url" :src="formData.url" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容">
        <Tinymce style="width: 100%" v-model="formData.content"/>
      </el-form-item>
    </el-form>
    <div style="text-align: center;margin-top: 20px">
      <el-button @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {Plus} from '@element-plus/icons-vue'
import Tinymce from '../../components/TinymceEdit/TinymceEdit.vue'

const formData = reactive({
  name: '',
  auth: 'username',
  url: '',
  content: 'New Content☑'
})
const content = ref('New Content')

const beforeAvatarUpload = (rawFile) => {
// 校验图片类型和图片大小
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    // error('头像图片必须是JPG或png格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    // error('头像图片大小不能超过2MB!')
    return false
  }
  return true
}
const handleAvatarSuccess = (response, uploadFile) => {
  if (response.code === 200) {
    formData.url = response.data
  }
}
const submit = () => {
  console.log(content.value)
}
</script>

<style lang="scss" scoped>
.page {

}
</style>
