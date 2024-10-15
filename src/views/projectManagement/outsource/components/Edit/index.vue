<script setup lang="ts">
import api from "@/api/modules/projectManagement_outsource";
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";
import useProjectManagementOutsourceStore from "@/store/modules/projectManagement_outsource";
import { throttle } from "lodash-es";
import { Right } from "@element-plus/icons-vue";
import empty from '@/assets/images/empty.png'
defineOptions({
  name: "Edit",
});

const projectManagementOutsourceStore = useProjectManagementOutsourceStore();
// 弹框开关变量
const dialogTableVisible = ref(false);
const popoverRef = ref<any>(); //弹出框Ref
const data = ref<any>({
  select: "",
  currentTenantId: "", //当前租户id
  tenantMeasurementInfoList: [], //测查列表
  clickIdList: [], //点击id列表
});

// 显隐
async function showEdit(row: any, source: number = 0) {
  const params = {
    linkId: row.linkId,
    projectId: row.projectId,
    source,
  };
  const res = await api.getTenantMeasurementList(params);

  const resList = res.data.tenantMeasurementInfoList;
  if (res.data.tenantMeasurementInfo) {
    resList.unshift(res.data.tenantMeasurementInfo);
  }
  // 过滤数据（删除与当前租户id相同的数据之前的所有数据，包括当前的数据）
  const findDataIndex = resList.findIndex(
    (item: any) => item.allocationTenantId === res.data.currentTenantId
  );
  resList.splice(0, findDataIndex); //删除上级
  const type1List = resList.filter((item: any) => item.type === 1);
  const type2List = resList.filter((item: any) => item.type === 2);
  const type3List = resList.filter((item: any) => item.type === 3);
  const tenantMeasurementInfoList = [...type1List];
  if (type2List.length) {
    const memberGroupOrSupperIdList = type2List.map(
      (item: any) => item.memberGroupOrSupperId
    );
    type2List[0].length = type2List.length;
    type2List[0].memberGroupOrSupperIdList = memberGroupOrSupperIdList;
    tenantMeasurementInfoList.push(type2List[0]);
  } else if (type3List.length) {
    const memberGroupOrSupperIdList = type3List.map(
      (item: any) => item.memberGroupOrSupperId
    );
    type3List[0].length = type3List.length;
    type3List[0].memberGroupOrSupperIdList = memberGroupOrSupperIdList;
    tenantMeasurementInfoList.push(type3List[0]);
  }
  tenantMeasurementInfoList.forEach((item: any) => (item.visible = false));
  data.value.currentTenantId = res.data.currentTenantId;
  data.value.tenantMeasurementInfoList = tenantMeasurementInfoList;
  dialogTableVisible.value = true;
}
// 动画显示之前先将其他显示的关闭
const getClickListBefore = (index: any) => {
  data.value.clickIdList = [];
  // 分配项目 popoverRef和显示的链路list的length一直
  if (data.value.tenantMeasurementInfoList.length === popoverRef.value.length) {
    popoverRef.value.forEach((item: any, ind: any) => {
      if (ind !== index) {
        item.hide();
      }
    });
  } else {
    // 接受项目 popoverRef会比显示的链路list少一个，因为当前租户没有popoverRef
    popoverRef.value.forEach((item: any, ind: any) => {
      if (ind !== index - 1) {
        item.hide();
      }
    });
  }
};
// 获取点击id
const getClickList = async (row: any, index: any) => {
  data.value.select = data.value.select === index ? "" : index;
  data.value.clickIdList = [];
  const params = {
    type: row.type,
    projectId: row.projectId,
    tenantId: row.allocationTenantId,
    supplierIdList: row.type === 2 ? row.memberGroupOrSupperIdList : [],
    memberGroupIdList: row.type === 3 ? row.memberGroupOrSupperIdList : [],
  };
  const res = await api.getQuestionnaireClickList(params);
  data.value.clickIdList = processData(res.data.questionnaireClickInfoList);
  // 后期换成后端过滤
  if (row.type === 2) {
    data.value.clickIdList = data.value.clickIdList.filter(
      (item: any) => item.peopleType === 2
    );
  } else if (row.type === 3) {
    data.value.clickIdList = data.value.clickIdList.filter(
      (item: any) => item.peopleType === 1
    );
  }
};

// 处理数据
function processData(data: any) {
  return data.reduce((acc: any, item: any) => {
    const {
      supplierId,
      supplierName,
      projectQuestionnaireClickId,
      surveyStatus,
      price,
      peopleType,
    } = item;

    // 查找是否已经有该供应商的对象
    let supplier = acc.find((s: any) => s.supplierId === supplierId);

    if (supplier) {
      // 如果供应商已经存在，直接将数据添加到其 list 中
      supplier.list.push({ projectQuestionnaireClickId, surveyStatus, price });
    } else {
      // 如果供应商不存在，创建新的供应商对象并添加到结果中
      acc.push({
        supplierId,
        peopleType,
        supplierName,
        list: [{ projectQuestionnaireClickId, surveyStatus, price }],
      });
    }

    return acc;
  }, []);
}

// 取消 重置数据
function closeHandler() {
  dialogTableVisible.value = false;
  data.value = {
    select: "",
    currentTenantId: "", //当前租户id
    tenantMeasurementInfoList: [], //测查列表
    clickIdList: [], //点击id列表
  };
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
      title="详情"
      size="60%"
      :before-close="closeHandler"
    >
      <div class="details">
        <div class="details-left">
          <!-- 项目 -->
          <div class="project box">
            <div>
              <el-text tag="b">{{
                data.tenantMeasurementInfoList[0]?.projectName
              }}</el-text>
            </div>
            <div>
              <el-text type="info"
                >ID：{{ data.tenantMeasurementInfoList[0]?.projectId }}</el-text
              >
            </div>
          </div>
          <div
            class="link"
            v-for="(item, index) in data.tenantMeasurementInfoList"
            :key="item.allocationTenantId"
          >
            <!-- 步骤 -->
            <div class="step">
              <!-- 点 -->
              <div class="spot"></div>
              <!-- 线 -->
              <div class="line"></div>
            </div>
            <div
              :class="{
                'item box': true,
                select: index === data.select,
              }"
              @click="getClickList(item, index)"
            >
              <div class="item-left">
                <div class="tenant">
                  <template v-if="item?.length > 1">
                    <p class="tenantName">
                      已分配数：
                      <span class="tenantLength">{{ item?.length }}</span>
                      <span :class="'type' + item.type">
                        {{
                          projectManagementOutsourceStore.typeList[
                            item.type - 1
                          ]
                        }}
                      </span>
                    </p>
                  </template>
                  <template v-else>
                    <p>
                      <span class="tenantName">{{ item.tenantName }}</span>
                      <span :class="'type' + item.type">
                        {{
                          projectManagementOutsourceStore.typeList[
                            item.type - 1
                          ]
                        }}
                      </span>
                    </p>
                    <el-text type="info"
                      >ID：{{ item.allocationTenantId }}</el-text
                    >
                  </template>
                </div>
                <div class="price flex-b">
                  <p>
                    项目价:
                    <CurrencyType />{{ item.doMoneyPrice }}
                  </p>
                  <p>
                    参数:
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
              <div class="viewAll">
                <el-button type="primary" circle size="small" :icon="Right">
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="details-right" v-if="data.select !== ''">
          <div class="clickId" v-if="data.clickIdList.length">
            <div class="clickIdItem" v-for="ite in data.clickIdList">
              <div class="clickIdItem-title">
                <div>
                  <span class="supplierName">{{ ite.supplierName }}</span>
                  <span :class="'peopleType' + ite.peopleType">
                    {{
                      projectManagementOutsourceStore.peopleTypeList[
                        ite.peopleType - 1
                      ]
                    }}
                  </span>
                </div>
                <div>
                  <el-text type="info">ID： {{ ite.supplierId }}</el-text>
                </div>
              </div>
              <div class="clickIdItem-content">
                <ul>
                  <li v-for="it in ite.list">
                    <span> {{ it.projectQuestionnaireClickId }}</span>
                    <span :class="'surveyStatus' + it.surveyStatus">{{
                      projectManagementOutsourceStore.surveyStatusList[
                        it.surveyStatus - 1
                      ]
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="nodata" v-else>
            <el-empty :image="empty" :image-size="300" />
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
.select {
  background-color: var(--el-color-primary-light-9) !important;
  border: 1px solid #93c8ff !important;
}

.box {
  padding: 1rem;
  background: #ffffff;
  box-shadow: 0px 4px 16px 0px #ededed;
  border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
  border: 1px solid rgba(170, 170, 170, 0.5);
  margin: 1rem 0;
}

.details {
  display: flex;
  justify-content: space-between;
  align-items: start;

  > div {
    width: calc(50% - 0.5rem);
  }

  .details-left {
    .project {
      margin-left: 1.4375rem;
    }

    .link {
      display: flex;
      justify-content: start;
      align-items: start;

      .step {
        width: 1.4375rem;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;

        .spot {
          background: #409eff;
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
        }

        .line {
          background-color: rgba(170, 170, 170, 0.3);
          width: 1px;
          height: 8.375rem;
        }
      }

      .item.box {
        flex: 1;
        margin: 0;
        margin-bottom: 1rem;
        height: 8.125rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item-left {
          height: 6.125rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: start;

          .tenant {
            > p {
              margin-bottom: 0.5rem;
            }

            .tenantName {
              font-family: PingFang SC, PingFang SC;
              font-weight: 600;
              font-size: 1rem;
              color: #0f0f0f;
              margin-right: 0.5rem;
            }

            .tenantLength {
              color: #86b1e6;
              margin-right: 0.5rem;
            }
          }

          .price {
            > p {
              margin-right: 1.5rem;
            }
          }
        }
      }
    }

    .link:nth-last-child(1) {
      .line {
        display: none;
      }
    }
  }

  .details-right {
    background: #ffffff;
    box-shadow: 0px 4px 16px 0px #ededed;
    border-radius: 0.5rem;
    border: 1px solid rgba(170, 170, 170, 0.5);
    margin: 1rem 0;
    max-height: calc(100vh - 10rem);
    overflow-y: auto;

    .clickIdItem {
      padding: 1rem;
      border-bottom: 1px solid rgba(170, 170, 170, 0.5);

      .clickIdItem-title {
        background-color: var(--el-color-primary-light-9);
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;

        .supplierName {
          font-family: PingFang SC, PingFang SC;
          font-weight: 600;
          font-size: 1rem;
          color: #0f0f0f;
          margin-right: 0.5rem;
        }
      }

      .clickIdItem-content {
        ul {
          li {
            margin-top: 1rem;
            height: 2.75rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 0.5rem;
            border: 1px solid rgba(170, 170, 170, 0.3);
            padding: 0.5rem 1rem;

            span:nth-of-type(2) {
              display: inline-block;
              padding: 0.25rem 0.5rem;
              border-radius: 0.25rem;
            }
          }
        }
      }
    }

    .clickIdItem:nth-last-of-type(1) {
      border: none;
    }

    .nodata {
      min-height: 60vh;
      display: flex;
      justify-content: center;
      align-items:center;
    }
  }
}

//之前的
.type1 {
  background-color: var(--el-color-primary);
  color: #fff;
  padding: 0 0.5rem;
  border-radius: 0.25rem;
}

.type2 {
  background-color: var(--el-color-success);
  color: #fff;
  padding: 0 0.5rem;
  border-radius: 0.25rem;
}

.type3 {
  background-color: var(--el-color-warning);
  color: #fff;
  padding: 0 0.5rem;
  border-radius: 0.25rem;
}

.peopleType1 {
  background-color: var(--el-color-primary);
  color: #fff;
  padding: 0 0.5rem;
  border-radius: 0.25rem;
}

.peopleType2 {
  background-color: var(--el-color-success);
  color: #fff;
  padding: 0 0.5rem;
  border-radius: 0.25rem;
}
// 点击id状态
.surveyStatus1 {
  background-color: #b0ffc6;
  color: #17c047;
}
.surveyStatus2 {
  background-color: #b7daff;
  color: #5cacff;
}
.surveyStatus3 {
  background-color: #a4fff4;
  color: #36bdb4;
}
.surveyStatus4 {
  background-color: #fee4b4;
  color: #ffb938;
}

.surveyStatus5 {
  background-color: #ffdede;
  color: #ff6b6b;
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
</style>
