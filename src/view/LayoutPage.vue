<template>
  <div class="layout-page">
    <el-container>
      <el-aside width="200px">
        <LayoutAside></LayoutAside>
      </el-aside>
      <el-container>
        <el-header>
          <LayoutHeader></LayoutHeader>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import LayoutAside from '../components/layouts/LayoutAside.vue'
import LayoutHeader from '../components/layouts/LayoutHeader.vue'


</script>

<style lang="scss">
.content{
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  overflow: hidden;
}
.el-header {
  height: 80px;
  //background-color: red;
}
.flex-grow {
  flex-grow: 1;
}
.el-avatar{
  margin: auto;
}
</style>
