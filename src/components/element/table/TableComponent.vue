<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%"
        border
        stripe
    >
      <template v-for="column in options.columns">
        <el-table-column
            v-if="!column.scope"
            :key="column.label"
            :align="column.center?column.center:'center'"
            :prop="column.props"
            :label="column.label"
            :width="column.width"
        />
        <el-table-column
            v-else
            :key="column.label"
            :label="column.label"
            :width="column.width"
            :align="column.align ? column.align : 'center'"
        >
          <template #default="scope">
            <template v-if="column.scope === 'status'">
              <el-tag v-if="scope.row.status == 1">启用</el-tag>
              <el-tag v-else type="danger">禁用</el-tag>
            </template>
            <template v-if="column.scope === 'actions'">
              <el-button
                  v-if="options.actionBtn.includes('show')"
                  link
                  type="primary"
                  size="small"
              >查看</el-button>
              <el-button
                  v-if="options.actionBtn.includes('edit')"
                  link
                  type="primary"
                  size="small">编辑</el-button>
              <el-button
                  v-if="options.actionBtn.includes('delete')"
                  link
                  type="primary"
                  size="small"
              >删除</el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
        style="margin-top: 20px"
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
    />
  </div>
</template>

<script setup>
import {reactive, ref, toRefs, watchEffect} from "vue";

defineProps({
  options: {
    type: Object,
    default: () => {
    }
  }
})

const paging = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  tableData: []
})

const {currentPage, pageSize, total, tableData} = toRefs(paging)
const handleSizeChange = () => {
}
const handleCurrentChange = () => {
}
watchEffect(() => {
  for (let i = 0; i < 10; i++) {
    paging.tableData.push({
      id: i + 1,
      username: 'tom' + i,
      status: 1,
      code: '12345678',
      createdAt: '2022-08-12 14:00',
      updatedAt: '2022-08-12 14:00'
    })
  }
  paging.total = paging.tableData.length
  console.log(paging.currentPage)
  console.log(paging.pageSize)
})

</script>

<style scoped>

</style>
