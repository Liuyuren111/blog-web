<template>
  <el-menu
      class="el-header"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <div style="line-height: 80px;">后台管理</div>
    <div class="flex-grow" />
    <el-avatar size="large" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
    <el-sub-menu index="1">
      <template #title>username</template>
      <el-menu-item index="2-1">个人信息</el-menu-item>
      <el-menu-item index="2-2">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>

function handleSelect() {
  console.log('1')
}
</script>

<style scoped>

</style>
