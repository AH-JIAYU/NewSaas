<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import useProjectManagementListStore from "@/store/modules/projectManagement_list"; // 项目
import useStagedDataStore from "@/store/modules/stagedData"; // 暂存
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import api from "@/api/modules/projectManagement";

defineOptions({
  name: "ProjeckEdit",
});
const projectManagementListStore = useProjectManagementListStore(); //项目
const stagedDataStore = useStagedDataStore(); // 暂存
const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const customerStore = useUserCustomerStore(); // 客户
const emits = defineEmits(["fetch-data"]);
const data = ref<any>({
  dialogTableVisible: false,
  title: '',
  type: '',
  loading: '',
  formData: {},//表单
  customerList: [],//客户
});
// const dialogTableVisible = ref<boolean>(false);
// const title = ref<string>('')
// const type = ref<string>("");
// const loading = ref<boolean>(false)
const TypeList: any = {
  PCNL: '参数',
  customer: '客户',
  name: '名称/标识',
  doMoneyPrice: '原价',
  ir: "IR",
  remark: '备注',
};

// 显隐
async function showEdit(row: any, FormType: any) {
  data.value.title = TypeList[FormType]
  data.value.type = FormType
  try {
    data.value.loading = true;
    // 编辑返回的字段也一样，周二让刘改字段 	项目配额字段updateProjectQuotaInfoList getProjectQuotaInfoList
    const res = await api.detail({ projectId: row.projectId });
    // initializeLeftTabsData(res.data);
    data.value.formData = res.data
    data.value.dialogTableVisible = true;
    data.value.loading = false;
    // 存储变更前的数据
    projectManagementListStore.dataBeforeEditing = cloneDeep(data.value.formData)
  } catch (error) {

  } finally {
    data.value.loading = false;
  }
  const resa = await customerStore.getCustomerList();
  console.log('resa', resa)
  data.value.customerList = resa
};
// 输入框限制 只能输入数字
const handleInput = (value: any) => {
  // 允许数字键、删除键、退格键、方向键等
  if (value.key === ".") {
    value.preventDefault(); // 阻止非数字键输入
  }
};
// // 编辑时 处理数据
// function initializeLeftTabsData(data: any) {

//   // 编辑的时候回显默认值，不然会报错
//   data.data = {
//     configurationInformation: {
//       // 问题初始数据
//       initialProblem: {
//         countryId: null, //问卷对应国家id
//         projectProblemCategoryId: null, //问题类别id
//         projectQuotaQuestionType: null, //问题类型:1:总控问题 2:租户自己问题
//         projectProblemId: null, //	前置问卷问题id
//         keyValue: "", //	前置问卷问题
//         questionType: null, // 问题类型    type: 1 输入框 2单选 3复选 4下拉
//         answerValueList: [], //前置问卷答案,
//         projectAnswerIdList: [], //	前置问卷答案id,
//       },

//       configurationCountryList: null, // 配置信息-国家
//       projectCategoryList: null, //题库目录
//       ProjectProblemInfoList: [], // 问题列表 - 显示
//     },
//   };
//   leftTabsData.value = [];
//   // 新增主数据作为第一个 Tab
//   const { projectInfoList, ...newData } = cloneDeep(data);
//   if (newData.descriptionUrl) {
//     newData.descriptionUrl = newData.descriptionUrl.split(",");
//   } else {
//     newData.descriptionUrl = [];
//   }

//   leftTabsData.value.push(newData);
//   // // // 如果存在 children，为每个 child 创建一个 Tab
//   if (projectInfoList && projectInfoList.length) {
//     projectInfoList.forEach((child: any) => {
//       // 编辑的时候回显默认值，不然会报错
//       child.data = {
//         configurationInformation: {
//           // 问题初始数据
//           initialProblem: {
//             countryId: null, //问卷对应国家id
//             projectProblemCategoryId: null, //问题类别id
//             projectQuotaQuestionType: null, //问题类型:1:总控问题 2:租户自己问题
//             projectProblemId: null, //	前置问卷问题id
//             keyValue: "", //	前置问卷问题
//             questionType: null, // 问题类型    type: 1 输入框 2单选 3复选 4下拉
//             answerValueList: [], //前置问卷答案,
//             projectAnswerIdList: [], //	前置问卷答案id,
//           },

//           configurationCountryList: null, // 配置信息-国家
//           projectCategoryList: null, //题库目录
//           ProjectProblemInfoList: [], // 问题列表 - 显示
//         },
//       };
//       child.descriptionUrl = child.descriptionUrl.split(",");
//       leftTabsData.value.push({
//         ...child,
//       });
//     });
//   }
//   // 存储编辑前的数据
//   projectManagementListStore.dataBeforeEditing = cloneDeep(leftTabsData.value)
// }

// 判重
// 判断供应商名称是否重复
function hasDuplicateCustomer(projectList: any) {
  const seen = new Set();
  for (const customer of projectList) {
    if (seen.has(customer.name)) {
      return true; // 如果已经存在，则表示有重复
    }
    seen.add(customer.name);
  }
  return false; // 如果没有重复，则返回false
};
// // 提交 处理数据
// const processingData = async () => {
//   const newLeftTabsData = cloneDeep(data.value.formData);
//   await projectManagementListStore.compareProjectData(projectManagementListStore.dataBeforeEditing, newLeftTabsData)
//   // 将的单选的答案和id从''转换成[]
//   await newLeftTabsData.forEach((element: any) => {
//     element.descriptionUrl = element.descriptionUrl.join(",");
//     if (
//       !element.data.configurationInformation.ProjectProblemInfoList ||
//       !element.data.configurationInformation.ProjectProblemInfoList.length
//     ) {
//       element.isProfile = 2;
//     }
//     //data为配置信息中所需的数据
//     if (element.data) {
//       delete element.data;
//     }
//     element.projectQuotaInfoList = element.projectQuotaInfoList.map(
//       (item: any) => {
//         if (!Array.isArray(item.answerValueList)) {
//           item.answerValueList = [];
//         }
//         if (!Array.isArray(item.projectAnswerIdList)) {
//           item.projectAnswerIdList = [];
//         }
//         return item;
//       }
//     );
//   });
//   let masterData = newLeftTabsData[0];
//   masterData.projectInfoList = newLeftTabsData.slice(1);
//   return masterData;
// };
// 提交数据
async function onSubmit() {
  console.log('提交')
  // loading.value = true;
  // // 校验通过
  // if (validateAll.value.every((item: any) => item === "fulfilled")) {
  //   if (!hasDuplicateCustomer(leftTabsData.value)) {
  //     const params = await processingData();
  //     setTimeout(async () => {
  //       if (title.value === "新增") {
  //         const { status } = await api.create(params);
  //         status === 1 &&
  //           ElMessage.success({
  //             message: "新增成功",
  //             center: true,
  //           });
  //       } else {
  //         const { status } = await api.edit(params);
  //         status === 1 &&
  //           ElMessage.success({
  //             message: "编辑成功",
  //             center: true,
  //           });
  //       }
  //       emits("fetch-data");
  //       closeHandler();

  //     }, 1000)

  //   } else {
  //     ElMessage({ message: "项目名称重复", center: true });
  //   }
  // }
  // loading.value = false;
};
// 弹框关闭事件
function closeHandler() {
  data.value.dialogTableVisible = false;
  data.value.formData = {}
};

// // 获取 客户 国家
const getList = async () => {
  await customerStore.getCustomerList();
  await basicDictionaryStore.getCountry();
};

onMounted(async () => {
  await getList();
});

// 暴露方法
defineExpose({
  showEdit,
});

</script>

<template>
  <div>
    <el-dialog v-model="data.dialogTableVisible" v-if="data.dialogTableVisible" :title="data.title + '编辑'" draggable>
      <el-form :model="data.formData" label-width="100" label-position="right">
        <template v-if="data.type === 'PCNL'">
          <el-form-item label="配额" prop="num">
            <el-input-number style="width: 100%;" v-model="data.formData.num" :step="1" step-strictly :min="1"
              :max="100" controls-position="right" @keydown="handleInput" />
          </el-form-item>
          <el-form-item>
            <template #label>
              <div>小时准入量</div>
            </template>
            <el-input-number style="width: 100%;" v-model="data.formData.preNum" :min="1" :step="1" step-strictly
              controls-position="right" @keydown="handleInput" />
          </el-form-item>
        </template>
        <template v-if="data.type === 'customer'">

          <el-form-item label="所属客户" prop="clientId">
            {{  data}}
            <el-select placeholder="Select" v-model="data.formData.clientId" clearable >
                  <el-option v-for=" (item) in data.customerList" :key="item.tenantCustomerId"
              :value="item.tenantCustomerId" :label="item.customerAccord" :disabled="item.isReveal === 1">
              <span style="float: left">{{ item.customerAccord }}</span>
              <span style="float: right; color: red; font-size: 13px" v-show="item.isReveal === 1">
                <span v-show="item.turnover < item.practiceTurover">
                  营业额超限
                </span>
                <span v-show="item.rateAudit > item.practiceRateAudit">
                  审核率不合格
                </span>
              </span>
              </el-option>
            </el-select>
          </el-form-item>
        </template>

      </el-form>
      <template #footer>
        <el-button @click="closeHandler" :disabled="data.loading"> 取消 </el-button>
        <el-button type="primary" @click="onSubmit" :disabled="data.loading"> 确定 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep {

  .el-drawer,
  .el-drawer__body,
  .el-tabs.el-tabs--left {
    overflow: visible !important;
  }
}
</style>
