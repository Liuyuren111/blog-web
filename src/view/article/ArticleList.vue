<template>
  <div>
    <div style="display: flex;margin-bottom: 16px">
      <el-input style="width: 30%;" v-model="keyword" placeholder="Please input" clearable />
      <el-button>搜索</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" scrollbar-always-on>
      <el-table-column align="center" prop="id" fixed label="ID" width="80" />
      <el-table-column align="center" prop="name" label="标题" width="150" />
      <el-table-column align="center" prop="date" label="创建时间" width="120" />
      <el-table-column align="center" prop="state" label="State" width="120" />
      <el-table-column align="center" prop="city" label="City" width="120" />
      <el-table-column align="center" prop="address" label="Address" width="600" />
      <el-table-column align="center" prop="zip" label="Zip" width="120" />
      <el-table-column align="center" fixed="right" label="操作" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick"
          >编辑</el-button
          >
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        style="margin-top: 20px"
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import {ref, watchEffect} from 'vue'

const keyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const tableData = ref([])
const total = ref(null)


watchEffect(() =>{
  for (let i = 0; i < 10; i++) {
    tableData.value.push({
      id: i + 1,
      date: '2016-05-03',
      name: 'Tom' + i + 1,
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
      tag: 'Home',
    })
  }
  total.value = tableData.value.length
})
const handleClick = () => {
  console.log('click')
}
const handleSizeChange = () => {
  console.log('click')
}
const handleCurrentChange = () => {
  console.log('click')
}
</script>

<style scoped>

</style>
