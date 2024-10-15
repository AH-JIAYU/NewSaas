<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_customer";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典

defineOptions({
  name: "ProjeckEdit",
});
const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const data = ref<any>({
  dialogTableVisible: false,
  title: '',
  type: '',
  loading: '',
  tableData: [],//表格
  staffList:[],//用户
});
const countryList: any = ref([]); //所有区域一维

// 显隐
async function showEdit(row: any) {
  data.value.loading = true;
  data.value.dialogTableVisible = true;
  const res=await api.getCustomerProjectList({tenantCustomerId:row.tenantCustomerId})
  data.value.tableData=res.data.getTenantCustomerProjectInfoList
    data.value.loading = false;
};

// 具体的位置信息
const comCountryId = computed(() => (countryIdList: any) => {
  const list = countryList.value
    .filter((item: any) => countryIdList.includes(item.id))
    .map((item: any) => item.chineseName);
  return list;
});

// 弹框关闭事件
function closeHandler() {
  data.value.dialogTableVisible = false;
  data.value.tableData = []
};

 onMounted(async() => {
  countryList.value = await basicDictionaryStore.getCountry();
 })

// 暴露方法
defineExpose({
  showEdit,
});

</script>

<template>
  <div>
    <el-dialog v-model="data.dialogTableVisible" v-if="data.dialogTableVisible" title="查看" draggable>
      <el-table  v-loading="data.loading"   row-key="projectId" :data="data.tableData"  highlight-current-row height="100%">
        <el-table-column align="left" type="index" />
        <el-table-column  width="200" align="left" label="项目ID"><template
            #default="{ row }">
            <div class="copyId">
              <div class="id oneLine ">ID: {{ row.projectId }}</div>
              <copy class="copy" :content="row.projectId" />
            </div>
          </template>
        </el-table-column>
        <el-table-column   show-overflow-tooltip prop="projectName" width="100" align="left"
          label="项目名称"></el-table-column>
        <el-table-column   show-overflow-tooltip prop="projectIdentification" width="100" align="left"
          label="项目名称"></el-table-column>
        <el-table-column  show-overflow-tooltip prop="countryIdList"
          align="left" label="区域" width="100">
          <template #default="{ row }">
            <template v-if="row.countryIdList">
              <template v-if="row.countryIdList.length === basicDictionaryStore.country.length">
                <el-tag size="small" type="primary">全球</el-tag>
              </template>
              <template v-else-if="comCountryId(row.countryIdList).length > 1">
                <el-tooltip class="box-item" effect="dark" :content="comCountryId(row.countryIdList).join(',')"
                  placement="top">
                  <el-link type="primary"><el-tag size="small" type="primary">×{{
    comCountryId(row.countryIdList).length
  }}</el-tag></el-link>
                </el-tooltip>
              </template>
              <template v-else>
                <el-tag size="small" v-for="item in comCountryId(row.countryIdList)" :key="item" type="primary">
                  {{ item }}
                </el-tag>
              </template>
            </template>
          </template>
        </el-table-column>
        <el-table-column   show-overflow-tooltip align="left" label="原价">
          <template #default="{ row }">
            <CurrencyType />{{ row.doMoneyPrice || 0 }}
          </template>
        </el-table-column>
      </el-table>
      <template #footer  >
        <div style="text-align:center">
          <el-button type="primary"  @click="closeHandler" >关闭</el-button>
        </div>

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

.flex-c {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;

  >div:nth-of-type(1) {
    width: calc(100% - 25px);
    flex-shrink: 0;
  }

  .edit {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    flex-shrink: 0;
    display: none;
    cursor: pointer;
  }

  .current {
    display: block !important;
  }
}

</style>
