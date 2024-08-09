<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
import api from "@/api/modules/department";

defineOptions({
  name: "Edit",
});
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
// 更新数据
const emits = defineEmits(["success"]);
// title
const title = ref("");
// 获取当前时间
const defaultTime = ref();
// loading
const loading = ref(false);
// 客户列表
const customerList = ref<any>([]);
// formRef
const formRef = ref();
// 弹框开关变量
const dialogTableVisible = ref(false);
// 发票状态
const invoiceStatusList = [
  { lable: "未收款", value: 1 },
  { lable: "部分收款", value: 2 },
  { lable: "已完结", value: 3 },
  { lable: "坏账", value: 4 },
];
const dictionaryItem = ref<any>({
  loading: false,
  tableAutoHeight: false, // 表格是否自适应高度
  border: true, // 表格控件-是否展示边框
  stripe: false, // 表格控件-是否展示斑马条
  lineHeight: "default", // 表格控件-控制表格大小
  checkList: [],
  // 搜索
  search: {
    chineseName: "",
  },
  // 列表数据
  dataList: [],
  selectionDataList: [],
  row: "",
  dialog: {
    visible: false,
    id: "" as string | number,
    parentId: "",
    level: 1,
  },
});
const dictionary = ref({
  search: {
    chineseName: "",
  },
  tree: [],
  currentNode: undefined,
  currentData: undefined,
  dialog: {
    visible: false,
    parentId: "",
    id: "",
  },
  row: "",
  loading: false,
});
// 定义表单
const form = ref<any>({
  id: null,
  // 客户id
  tenantCustomerId: "",
  // 发票编号
  invoiceCode: "",
  // 发票金额
  invoiceAmount: null,
  // 税
  invoiceTax: null,
  // 实际收款
  actualReceipts: null,
  // 发票状态 （未收款、部分收款、已完结、坏账）
  invoiceStatus: null,
  // 开票日期
  invoiceDate: "",
  // 收款日期
  paymentDate: "",
  // 备注
  remark: "",
});
const defaultProps:any = {
  children: 'children',
  label: 'label',
}
const data:any = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
// 个人信息校验
const formRules = ref<FormRules>({
  invoiceCode: [{ required: true, trigger: "blur", message: "请输入姓名" }],
  tenantCustomerId: [
    { required: true, trigger: "change", message: "请选择客户" },
  ],
});
// 提成比例
async function handleEditProportion(row: any) {
  console.log("row", row);
  // const { data } = await api.detail({
  //   tenantSupplierId: row.tenantSupplierId,
  // });
  // if (data.remark !== row.remark) {
  //   data.countryType = data.subordinateCountryId === "343" ? 1 : 2;
  //   data.remark = row.remark;
  //   const { status } = await api.edit(data);
  //   status === 1 &&
  //     ElMessage.success({
  //       message: "更新备注",
  //       center: true,
  //     });
  //   queryData();
  // }
}
// 提交数据
function onSubmit() {
  return new Promise<void>((resolve) => {
    if (!form.value.id) {
      formRef.value &&
        formRef.value.validate((valid: any) => {
          if (valid) {
            delete form.value.id;
            api.create(form.value).then(() => {
              ElMessage.success({
                message: "新增成功",
                center: true,
              });
              emits("success");
              dialogTableVisible.value = false;
              resolve();
            });
          }
        });
    } else {
      formRef.value &&
        formRef.value.validate((valid: any) => {
          if (valid) {
            const data = toRaw(form.value);
            api.edit(data).then(() => {
              ElMessage.success({
                message: "编辑成功",
                center: true,
              });
              emits("success");
              dialogTableVisible.value = false;
              resolve();
            });
          }
        });
    }
  });
}
// 获取数据
async function showEdit(row: any) {
  title.value = row?.id ? "编辑" : "新增";
  form.value = row;
  dialogTableVisible.value = true;
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => showEdit(1));
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => showEdit(1));
}

// 字段排序
function sortChange({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order).then(() => showEdit(1));
}
onMounted(async () => {
  defaultTime.value = new Date();
});
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div v-loading="loading">
    <el-drawer v-model="dialogTableVisible" :title="title" size="60%">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>组长</span>
          </div>
        </template>
        <el-table :data="invoiceStatusList" border>
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="80"
          />
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="lable"
            label="员工ID"
          />
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="lable"
            label="用户名"
          />
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="lable"
            label="姓名"
          />
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="lable"
            label="部门"
          />
          <el-table-column
            align="center"
            width="200"
            fixed="right"
            show-overflow-tooltip
            label="组内提成比例"
          >
            <template #default="{ row }">
              <el-input
                v-model.number="form.invoiceAmount"
                placeholder="请输入提成比例"
                clearable
                @blur="handleEditProportion(row)"
              >
                <template #append>%</template></el-input
              >
            </template>
          </el-table-column>
          <template #empty>
            <el-empty description="暂无数据" />
          </template>
        </el-table>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>组员</span>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col class="leftData" :span="8">
            <el-input
              v-model="form.invoiceAmount"
              placeholder="可输入关键字查找"
              clearable
            />
            <el-tree
              style="max-width: 600px;margin-top: 20px;height: 90%;"
              :data="data"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps"
            />
          </el-col>
          <el-col :span="16">
            <el-table :data="invoiceStatusList" border>
              <el-table-column
                align="center"
                type="index"
                label="序号"
                width="80"
              />
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="lable"
                label="员工ID"
              />
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="lable"
                label="用户名"
              />
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="lable"
                label="姓名"
              />
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="lable"
                label="部门"
              />
              <el-table-column
                align="center"
                width="190"
                fixed="right"
                show-overflow-tooltip
                label="提成比例"
              >
                <template #default="{ row }">
                  <el-input
                    v-model.number="form.invoiceAmount"
                    placeholder="提成比例"
                    clearable
                    @blur="handleEditProportion(row)"
                  >
                    <template #append>%</template></el-input
                  >
                </template>
              </el-table-column>
              <template #empty>
                <el-empty description="暂无数据" />
              </template>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
      <template #footer>
        <div style="flex: auto">
          <el-button type="" @click="dialogTableVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
:deep(.leftData) {
  width: 100%;
  height: 100%;
}
</style>
