<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import api from "@/api/modules/project_settlement";

defineOptions({
  name: "StatusDetail",
});
// 更新数据
const emits = defineEmits(["success"]);
// loading
const loading = ref(false);
// form
const form = ref<any>({});

// 弹框开关变量
const dialogTableVisible = ref(false);
// 获取数据
async function showEdit(row: any) {
  form.value = JSON.parse(row);

  dialogTableVisible.value = true;
}


defineExpose({ showEdit });
</script>

<template>
  <div v-loading="loading">
    <el-dialog
      v-model="dialogTableVisible"
      title="详情"
      width="700"
    >
    <div>



              <div v-if="form.pendReviewTime">
                <el-button
                class="button-p"
                  type="warning"
                  >待审核</el-button
                >
                <div class="font-num">{{ form.pendReviewTime }}</div>
              </div>
              <div v-if="form.invoicedOutTime" style="margin-top:20px;">
                <el-button
                  type="success"
                      class="button-p"
                  >已开票</el-button
                >
                <div class="font-num">{{ form.invoicedOutTime }}</div>
              </div>
              <div v-if="form.settledTime" style="margin-top:20px;">
                <el-button
    class="button-p"
                  type="info"
                  >已结算</el-button
                >
                <div class="font-num">{{ form.settledTime }}</div>
              </div>
              <div v-if="form.reviewTime" style="margin-top:20px;">
                <el-button
                    class="button-p"
                  type="primary"
                  >已审核</el-button
                >
                <div class="font-num">{{ form.reviewTime }}</div>
              </div>
              <div v-if="form.frozenTim" style="margin-top:20px;">
                <el-button
                  type="danger"
                      class="button-p"
                  >已冻结</el-button
                >
                <div class="font-num">{{ form.frozenTime }}</div>
              </div>
            </div>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="dialogTableVisible = false" type="primary"> 关闭 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss">
.font-num {
  font-size: .75rem;
  margin-top:15px;
}
.button-p {
  width: 2.75rem;
  height: 1.3125rem;
  font-size: .75rem;
}
</style>
