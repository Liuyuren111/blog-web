<template>
  <el-menu
      class="el-menu-vertical-demo"
      router
  >
    <template v-for="route in routes">
      <!--  存在子路由  -->
      <el-sub-menu v-if="route.children" :key="route.path" :index="route.path">
        <template #title>
          <el-icon>
            <Location/>
          </el-icon>
          <span>{{ route.meta.title }}</span>
        </template>
        <el-menu-item v-for="subRoute in route.children" :key="subRoute.path" :index="subRoute.path">
          <el-icon>
            <Location/>
          </el-icon>
          <span>{{ subRoute.meta.title }}</span>
        </el-menu-item>
      </el-sub-menu>
      <!--  不存在子路由  -->
      <el-menu-item v-if="!route.children" :key="route.path" :index="route.path">
        <el-icon>
          <Location/>
        </el-icon>
        <span>{{ route.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import {router} from "../../router";
import {Location} from '@element-plus/icons-vue'
import {computed} from "vue";

const routes = computed(() => {
  return router.options.routes[0].children
})
</script>

<style scoped>

</style>
