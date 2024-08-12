<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
import api from "@/api/modules/group_team";
import useDepartmentStore from "@/store/modules/department";

defineOptions({
  name: "Edit",
});
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
// tree ref
const treeRef = ref<any>();
// 部门
const departmentStore = useDepartmentStore();
// 部门数据
const departmentList = ref<any>();
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
const dataList = ref<any>([]);
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
  // 用户id
  userId: null,
  // 提成比例
  commission: "",
});
const defaultProps: any = {
  children: "children",
  label: "name",
};
const data: any = [
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 4,
        label: "Level two 1-1",
        children: [
          {
            id: 9,
            label: "Level three 1-1-1",
          },
          {
            id: 10,
            label: "Level three 1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1",
      },
      {
        id: 6,
        label: "Level two 2-2",
      },
    ],
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1",
      },
      {
        id: 8,
        label: "Level two 3-2",
      },
    ],
  },
];
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
// 获取数据
async function showEdit(row: any) {
  title.value = row?.id ? "编辑" : "新增";
  const listData = JSON.parse(row);
  form.value = listData;
  console.log("form.value", form.value);
  const params = {
    page: 1,
    limit: 10,
    groupId: form.value.id,
  };
  const res = await api.list(params);
  console.log("res", res);

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
  // departmentList.value = await departmentStore.getDepartment();
  departmentList.value = [
    {
      id: "574449384760348672",
      name: "技术部",
      director: "574448371148066816",
      memberCount: null,
      commissionStatus: 1,
      commission: 100,
      commissionTyp: 2,
      remark: "技术部",
      children: [
        {
          id: "574451094157332480",
          phone: null,
          email: "131631@qq.com",
          name: "小小",
          country: "DE",
          role: "admin",
          active: true,
        },
        {
          id: "574449041162964992",
          phone: null,
          email: "131616@qq.com",
          name: "王二",
          country: "CA",
          role: "admin",
          active: true,
        },
      ],
    },
  ];
  defaultTime.value = new Date();
});
const checkeChange = (val: any) => {
  dataList.value.map((ite: any) => {
    if (ite.id === val.id) {
      return console.log(11111);
    }
  });
  if (val.children && val.children.length) {
    val.children.forEach((item: any) => {
      dataList.value.push(item);
    });
  } else {
    dataList.value.push(val);
  }
};
// 提交数据
function onSubmit() {
  return new Promise<void>((resolve) => {
    //  获取选中的所有子节点
    const tree = treeRef.value.getCheckedKeys();
    // 获取所有半选的主节点
    const halltree = treeRef.value.getHalfCheckedKeys();
    // 组合一下
    const menupath = tree.concat(halltree);
    console.log('menupath',menupath);

    // if (!form.value.id) {
    //   formRef.value &&
    //     formRef.value.validate((valid: any) => {
    //       if (valid) {
    //         delete form.value.id;
    //         api.create(form.value).then(() => {
    //           ElMessage.success({
    //             message: "新增成功",
    //             center: true,
    //           });
    //           emits("success");
    //           dialogTableVisible.value = false;
    //           resolve();
    //         });
    //       }
    //     });
    // } else {
    //   formRef.value &&
    //     formRef.value.validate((valid: any) => {
    //       if (valid) {
    //         const data = toRaw(form.value);
    //         api.edit(data).then(() => {
    //           ElMessage.success({
    //             message: "编辑成功",
    //             center: true,
    //           });
    //           emits("success");
    //           dialogTableVisible.value = false;
    //           resolve();
    //         });
    //       }
    //     });
    // }
  });
}
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
        <el-table :data="dataList" border>
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
            {{ dataList }}
            <el-input
              v-model="form.invoiceAmount"
              placeholder="可输入关键字查找"
              clearable
            />
            <el-tree
              style="max-width: 600px; margin-top: 20px; height: 90%"
              :data="departmentList"
              ref="treeRef"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps"
              @check="checkeChange"
            />
          </el-col>
          <el-col :span="16">
            <el-table :data="dataList" border>
              <el-table-column align="center" type="selection" />
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="id"
                label="员工ID"
              />
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="name"
                label="用户名"
              />
              <el-table-column
                align="center"
                show-overflow-tooltip
                prop="name"
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
                    v-model.number="form.commission"
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
