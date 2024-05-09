<script setup>
const dialogFormVisible = ref(false)
const title = ref('')
const form = ref()
function showEdit(row) {
  title.value = `${row.name}渠道的详情`
  form.value = JSON.parse(JSON.stringify(row))
  dialogFormVisible.value = true
}
function close() {
  form.value = { }
  dialogFormVisible.value = false
}
const tableData = [
  { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
  { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
  { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
  { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
  { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
  { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
  { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
]
defineExpose({
  showEdit,
})
</script>

<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="title"
    width="1000px"
    @close="close"
  >
    <el-table :data="tableData" border style="width: 100%;">
      <el-table-column align="center" prop="name" label="国家" width="180" />
      <el-table-column align="center" prop="cname" label="参与数" width="180" />
      <el-table-column align="center" prop="fz" label="完成数" />
      <el-table-column align="center" prop="num1" label="完成金额" />
      <el-table-column align="center" prop="num2" label="营业额" />
    </el-table>
  </el-dialog>
</template>
