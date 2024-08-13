<script setup lang="ts">
import api from "@/api/modules/projectManagement_outsource";
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";
import useProjectManagementOutsourceStore from "@/store/modules/projectManagement_outsource";

defineOptions({
  name: "Edit",
});
const projectManagementOutsourceStore = useProjectManagementOutsourceStore();
// 弹框开关变量
const dialogTableVisible = ref(false);
const data = ref<any>({
  currentTenantId: "", //当前租户id
  tenantMeasurementInfoList: [], //测查列表
});

// 显隐
async function showEdit(row: any) {
  const params = {
    linkId: row.linkId,
    projectId: row.projectId,
  };
  const res = await api.getTenantMeasurementList(params);
  // 过滤数据（删除与当前租户id相同的数据之前的所有数据，包括当前的数据）
  const findDataIndex = res.data.tenantMeasurementInfoList.findIndex(
    (item: any) => item.allocationTenantId === res.data.currentTenantId
  );
  res.data.tenantMeasurementInfoList.splice(0, findDataIndex);
  data.value.currentTenantId = res.data.currentTenantId;
  data.value.tenantMeasurementInfoList = res.data.tenantMeasurementInfoList;
  dialogTableVisible.value = true;
}

// 取消
function closeHandler() {
  dialogTableVisible.value = false;
}
// 确认
function onSubmit() {
  closeHandler();
}
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-drawer
      v-model="dialogTableVisible"
      title="项目测查"
      size="60%"
      :before-close="closeHandler"
    >
      <div class="milestone">
        <div
          class="item"
          v-for="(item, index) in data.tenantMeasurementInfoList"
          :key="item.allocationTenantId"
        >
          <div class="left">
            <div
              :class="{
                'left-top': true,
                'flex-b': true,
                currentTenant: item.allocationTenantId === data.currentTenantId,
              }"
            >
              <div class="left-top-left p-4">
                <div class="project">
                  <div class="projectName flex-b">
                    <b>{{ item.projectName }}</b>
                    <span>
                      {{
                        projectManagementOutsourceStore.projectStatusList[
                          item.projectStatus - 1
                        ]
                      }}
                    </span>
                  </div>
                  <div class="projectId">{{ item.projectId }}</div>
                </div>
                <div class="price flex-b">
                  <p>
                    原价：
                    <!-- <CurrencyType /> -->
                    {{ item.doMoneyPrice }}
                  </p>
                  <p>
                    参数：
                    <el-text size="large"
                      >{{ item.participationNumber || 0 }}
                    </el-text>
                    <el-text size="large"> / </el-text>
                    <el-text type="success" size="large">
                      {{ item.doneNumber || 0 }}
                    </el-text>
                    <el-text size="large"> / </el-text>
                    <el-text type="warning" size="large">
                      {{ item.num || 0 }}</el-text
                    ><el-text size="large"> / </el-text>
                    <el-text size="large">{{
                      item.limitedQuantity || 0
                    }}</el-text>
                  </p>
                </div>
              </div>
              <div
                class="left-top-right p-4"
                v-if="item.allocationTenantId !== data.currentTenantId"
              >
                <p class="type">
                  {{ projectManagementOutsourceStore.typeList[item.type - 1] }}
                </p>
                <div class="tenant">
                  <p>{{ item.tenantName }}</p>
                  <p>{{ item.allocationTenantId }}</p>
                </div>
              </div>
            </div>
            <div
              class="left-bottom"
              v-if="data.tenantMeasurementInfoList.length !== index + 1"
            >
              <div class="line"></div>
              <div class="allocation">
                {{ item.tenantName }}-分配-{{
                  projectManagementOutsourceStore.typeList[
                    data.tenantMeasurementInfoList[index + 1].type - 1
                  ]
                }}
              </div>
              <div class="arrow"></div>
            </div>
          </div>
          <div
            class="right"
            v-if="item.allocationTenantId !== data.currentTenantId"
          >
            》
          </div>
        </div>
      </div>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="closeHandler"> 取消 </el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<style lang="scss" scoped>
.flex-b {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.milestone {
  width: 50%;
  margin: auto;
}
.item {
  height: 15.625rem;
  display: flex;
  justify-content: space-around;
  align-items: start;
  .left {
    height: 100%;
    flex: 1;
    > div {
      height: 50%;
    }
    .currentTenant {
      border: 1px dashed var(--el-color-primary) !important;
      width: 70%;
      margin: auto;
    }

    .left-top {
      border: 1px dashed #ccc;
      border-radius: 1rem;
      background-color: #fff;

      .left-top-left {
        width: 70%;
      }
      .left-top-right {
        width: 30%;
        border-left: 1px dashed #ccc;
      }
      > div {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: start;
        > div {
          width: 100%;
        }
      }
    }
    .left-bottom {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .line,
      .arrow {
        flex: 1;
        width: 0.0625rem;
        background-color: var(--el-color-primary);
        position: relative;
      }
      .arrow::after {
        content: "";
        display: block;
        position: absolute;
        right: 50%; /* 箭头位置 */
        bottom: 0; /* 箭头位置 */
        transform: translateX(50%);
        border-top: 0.625rem solid var(--el-color-primary); /* 箭头高低 */
        border-right: 0.625rem solid transparent; /* 箭头高低 */
        border-left: 0.625rem solid transparent; /* 箭头长度*/
      }
    }
  }
  .right {
    height: 50%;
    line-height: calc(15.625rem / 2);
    width: 2rem;
    text-align: center;
    color: var(--el-color-primary);
  }
}
</style>
