<script setup lang="ts">
import api from "@/api/modules/projectManagement_outsource";
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";
import useProjectManagementOutsourceStore from "@/store/modules/projectManagement_outsource";
import { throttle } from "lodash-es";

defineOptions({
  name: "Edit",
});
const projectManagementOutsourceStore = useProjectManagementOutsourceStore();
// 弹框开关变量
const dialogTableVisible = ref(false);
const data = ref<any>({

  currentTenantId: "", //当前租户id
  tenantMeasurementInfoList: [], //测查列表
  clickIdList: [],//点击id列表
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
  const resList = res.data.tenantMeasurementInfoList
  resList.splice(0, findDataIndex);//删除上级
  const type1List = resList.filter((item: any) => item.type === 1)
  const type2List = resList.filter((item: any) => item.type === 2)
  const type3List = resList.filter((item: any) => item.type === 3)
  const tenantMeasurementInfoList = [
    ...type1List
  ]
  if (type2List.length) {
    const memberGroupOrSupperIdList = type2List.map((item: any) => item.memberGroupOrSupperId);
    type2List[0].length = type2List.length
    type2List[0].memberGroupOrSupperIdList = memberGroupOrSupperIdList
    tenantMeasurementInfoList.push(type2List[0])
  } else {
    const memberGroupOrSupperIdList = type3List.map((item: any) => item.memberGroupOrSupperId);
    type3List[0].length = type3List.length
    type3List[0].memberGroupOrSupperIdList = memberGroupOrSupperIdList
    tenantMeasurementInfoList.push(type3List[0])
  }
  data.value.currentTenantId = res.data.currentTenantId;
  data.value.tenantMeasurementInfoList = tenantMeasurementInfoList;
  dialogTableVisible.value = true;
}
// 获取点击id
const getClickList = async (row: any) => {
  console.log('row', row)
  if (!row.visible) {
    const params = {
      type: row.type,
      projectId: row.projectId,
      tenantId: row.allocationTenantId,
      supplierIdList: row.type === 2 ? row.memberGroupOrSupperIdList : [],
      memberGroupIdList: row.type === 3 ? row.memberGroupOrSupperIdList : [],
    };
    const res = await api.getQuestionnaireClickList(params);
    data.value.clickIdList = processData(res.data.questionnaireClickInfoList)
    row.visible = true
  }
}

// 处理数据
function processData(data: any) {
  return data.reduce((acc: any, item: any) => {
    const { supplierId, supplierName, projectQuestionnaireClickId, surveyStatus, price } = item;

    // 查找是否已经有该供应商的对象
    let supplier = acc.find((s: any) => s.supplierId === supplierId);

    if (supplier) {
      // 如果供应商已经存在，直接将数据添加到其 list 中
      supplier.list.push({ projectQuestionnaireClickId, surveyStatus, price });
    } else {
      // 如果供应商不存在，创建新的供应商对象并添加到结果中
      acc.push({
        supplierId,
        supplierName,
        list: [{ projectQuestionnaireClickId, surveyStatus, price }]
      });
    }

    return acc;
  }, []);
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
    <el-drawer v-model="dialogTableVisible" title="项目测查" size="60%" :before-close="closeHandler">
      <div class="milestone">
        <div class="item" v-for="(item, index) in data.tenantMeasurementInfoList" :key="item.allocationTenantId">
          <div class="left">
            <div :class="{
      'left-top': true,
      'flex-b': true,
      currentTenant:
        item.allocationTenantId === data.currentTenantId &&
        item.type === 1,
    }">
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
                    <CurrencyType />
                    {{ item.doMoneyPrice }}
                  </p>
                  <p>
                    参数：
                    <el-text size="large">{{ item.participationNumber || 0 }}
                    </el-text>
                    <el-text size="large"> / </el-text>
                    <el-text type="success" size="large">
                      {{ item.doneNumber || 0 }}
                    </el-text>
                    <el-text size="large"> / </el-text>
                    <el-text type="warning" size="large">
                      {{ item.num || 0 }}</el-text><el-text size="large"> / </el-text>
                    <el-text size="large">{{
      item.limitedQuantity || 0
    }}</el-text>
                  </p>
                </div>
              </div>
              <div class="left-top-right p-4 " v-if="item.allocationTenantId !== data.currentTenantId ||
      item.type !== 1
      ">
                <p :class="'type' + item.type">
                  {{ projectManagementOutsourceStore.typeList[item.type - 1] }}
                </p>
                <div class="tenant">
                  <template v-if="item.length > 1">
                    <el-button type="primary" link>
                      查看更多({{ item.length }})
                    </el-button>
                  </template>
                  <template v-else>
                    <p>{{ item.tenantName }}</p>
                    <p>{{ item.allocationTenantId }}</p>
                  </template>

                </div>
              </div>
            </div>
            <div class="left-bottom" v-if="data.tenantMeasurementInfoList.length !== index + 1">
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
          <div class="right" v-if="item.allocationTenantId !== data.currentTenantId || item.type != 1
      ">
            <el-popover v-model:visible="item.visible" placement="right" :width="350" trigger="click"
               >
              <template #reference>
                <el-button style="padding: 0.5rem" type="primary" link  @click="getClickList(item)">
                  》
                </el-button>
              </template>

              <div class="clickIdItem   m-2" v-for="ite in data.clickIdList">
                <div class="clickIdItem-left">
                  <span :class="'type' + item.type">
                    {{ projectManagementOutsourceStore.typeList[item.type - 1] }}
                  </span>
                </div>
                <div class="clickIdItem-right">
                  <div class="title">
                    {{ ite.supplierName }} &emsp; {{ ite.supplierId }}
                  </div>
                  <ul>
                    <li>点击ID:</li>
                    <li v-for="it in ite.list">
                      <span> {{ it.projectQuestionnaireClickId }}</span>
                      <span> &emsp;{{ projectManagementOutsourceStore.surveyStatusList[it.surveyStatus - 1] }}</span>
                      <span v-if="it.surveyStatus===1">
                        &emsp;
                        <CurrencyType />{{it.price}}
                      </span>

                    </li>
                  </ul>
                </div>


              </div>
            </el-popover>
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
.type1 {
  background-color: var(--el-color-primary);
}

.type2 {
  background-color: var(--el-color-success);
  ;
}

.type3 {
  background-color: var(--el-color-warning);
}

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

    >div {
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

      >div {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: start;

        >div {
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
        right: 50%;
        /* 箭头位置 */
        bottom: 0;
        /* 箭头位置 */
        transform: translateX(50%);
        border-top: 0.625rem solid var(--el-color-primary);
        /* 箭头高低 */
        border-right: 0.625rem solid transparent;
        /* 箭头高低 */
        border-left: 0.625rem solid transparent;
        /* 箭头长度*/
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

.clickIdItem {
  display: flex;
  justify-content: space-between;
  align-items: start;

  .clickIdItem-left {
    width: 3.125rem;
  }

  .clickIdItem-right {
    flex: 1;


    ul {
      li {
        margin: .3125rem 0;
      }
    }
  }

}
</style>
