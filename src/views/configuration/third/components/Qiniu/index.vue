<script setup lang="ts">
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
import qiniuForm from "./dialog/QiniuForm.vue";
import api from "@/api/modules/third";
defineOptions({
  name: "Qiniu",
});

const form1 = reactive({
  accessKeyId: "",
  accessKeySecret: "",
  open: false,
  sign: "",
});
const headerList = ref([
  { label: "七牛云储存", value: "1" },
  { label: "阿里云储存", value: "2" },
  { label: "腾讯云储存", value: "3" },
  { label: "华为云储存", value: "4" },
]);

const form2 = reactive({
  appId: "",
  accessKeyId: "",
  accessKeySecret: "",
  open: false,
  sign: "",
  area: "",
});
//七牛云
const columns1 = ref([
  {
    prop: "bucket",
    label: "储存空间名称",
    checked: true,
    sotrtable: true,
  },
  {
    prop: "区域",
    label: "region",
    checked: true,
    sotrtable: true,
  },
  {
    prop: "domain",
    label: "空间域名",
    checked: true,
    sotrtable: true,
  },
  {
    prop: "status",
    label: "使用状态",
    checked: true,
    sotrtable: true,
  },
  {
    prop: "createTime",
    label: "创建时间",
    checked: true,
    sotrtable: true,
  },
  {
    prop: "updateTime",
    label: "更新时间",
    checked: true,
    sotrtable: true,
  },
]);
const levelLists = ref([]);
const activeName = ref("1");
const total = ref(0);
const list = ref([]);
function changeTab() {
  // list.type = activeName;
  // list.page = 1;
  getlist();
}
const qiniuFormRef = ref();
// loading加载
const listLoading = ref<boolean>(false);
const addStorageBtn = () => {
  qiniuFormRef.value.showEdit(activeName);
};
function getlist() {
  // api.getConfigList().then((res: any) => {
  //   if (activeName.value == "1") {
  //     levelLists.value == res.data && res.data.qiniuOssConfig
  //       ? res.data.qiniuOssConfig
  //       : [];
  //   } else if (activeName.value == "2") {
  //     levelLists.value == res.data && res.data.aliCloudOssConfig
  //       ? res.data.aliCloudOssConfig
  //       : [];
  //   }
  //   if (activeName.value == "3") {
  //     levelLists.value == res.data && res.data.tencentCosConfig
  //       ? res.data.tencentCosConfig
  //       : [];
  //   }
  // });
}
onMounted(() => {
  getlist();
});
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => getlist());
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => getlist());
}
const config = (row: any) => {};
const edit = (row: any) => {};
const del = (row: any) => {};
const changeSwitch = (row: any) => {};
//是否启用
const changeState = (state: any) => {};
</script>

<template>
  <div style="margin-left: 40px">
    <ElFormItem label="是否启用:">
      <ElSwitch v-model="form1.open" @change="changeState($event)" />
    </ElFormItem>
    <el-alert>
      <p v-if="activeName === '1'">
        七牛云开通方法：<a
          href="https://doc.crmeb.com/single/v5/7792"
          target="_blank"
          >点击查看</a
        >
      </p>
      <p v-if="activeName === '2'">
        阿里云oss开通方法：<a
          href="https://doc.crmeb.com/single/v5/7790"
          target="_blank"
          >点击查看</a
        >
      </p>
      <p v-if="activeName === '3'">
        腾讯云cos开通方法：<a
          href="https://doc.crmeb.com/single/v5/7791"
          target="_blank"
          >点击查看</a
        >
      </p>
      <p v-if="activeName === '4'">
        华为云cos开通方法：<a
          href="https://doc.crmeb.com/single/v5/8523"
          target="_blank"
          >点击查看</a
        >
      </p>

      <p>第一步： 添加【存储空间】（空间名称不能重复）</p>
      <p>第二步： 开启【使用状态】</p>
      <template v-if="activeName == '2'">
        <p>第三步（必选）： 选择云存储空间列表上的修改【空间域名操作】</p>
        <p>
          第四步（必选）：
          选择云存储空间列表上的修改【CNAME配置】，打开后复制记录值到对应的平台解析
        </p>
      </template>
      <template v-else>
        <p>第三步（可选）： 选择云存储空间列表上的修改【空间域名操作】</p>
        <p>
          第四步（可选）：
          选择云存储空间列表上的修改【CNAME配置】，打开后复制记录值到对应的平台解析
        </p>
      </template>
    </el-alert>
  </div>
  <div style="margin-left: 30px">
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane
        :label="item.label"
        :name="item.value.toString()"
        v-for="(item, index) in headerList"
        :key="index"
      />
    </el-tabs>
  </div>
  <div style="margin-left: 30px">
    <el-card :bordered="false" shadow="never" class="ivu-mt">
      <el-button type="primary" @click="addStorageBtn">添加存储空间</el-button>

      <el-table
        :data="levelLists"
        ref="table"
        class="mt14"
        v-loading="listLoading"
        highlight-current-row
        no-userFrom-text="暂无数据"
        no-filtered-userFrom-text="暂无筛选结果"
      >
        <el-table-column label="储存空间名称" min-width="120">
          <template #default="{ row }">
            <span>{{ row.bucket }}</span>
          </template>
        </el-table-column>
        <el-table-column label="区域" min-width="90">
          <template #default="{ row }">
            <span>{{ row.region }}</span>
          </template>
        </el-table-column>
        <el-table-column label="空间域名" min-width="130">
          <template #default="{ row }">
            <span>{{ row.domain }}</span>
          </template>
        </el-table-column>
        <el-table-column label="使用状态" min-width="90">
          <template #default="{ row }">
            <el-switch
              class="defineSwitch"
              :active-value="1"
              :inactive-value="0"
              v-model="row.status"
              :value="row.status"
              @change="changeSwitch(row)"
              size="large"
              active-text="开启"
              inactive-text="关闭"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" min-width="130">
          <template #default="{ row }">
            <span>{{ row._add_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" min-width="130">
          <template #default="{ row }">
            <span>{{ row._update_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="220">
          <template #default="{ row }">
            <template v-if="row.domain && row.domain != row.cname">
              <span class="btn" v-db-click @click="config(row)">CNAME配置</span>
              <el-divider direction="vertical"></el-divider>
            </template>
            <span class="btn" v-db-click @click="edit(row)">修改空间域名</span>
            <el-divider direction="vertical"></el-divider>
            <span class="btn" v-db-click @click="del(row)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="acea-row row-right page">
        <ElPagination
          :current-page="pagination.page"
          :total="pagination.total"
          :page-size="pagination.size"
          :page-sizes="pagination.sizes"
          :layout="pagination.layout"
          :hide-on-single-page="false"
          class="pagination"
          background
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </div> -->
    </el-card>
  </div>
  <qiniuForm ref="qiniuFormRef" @fetch-data="getlist"></qiniuForm>
</template>

<style lang="scss" scoped>
// 样式
.message ::v-deep .ivu-table-header thead tr th {
  padding: 8px 16px;
}

.ivu-radio-wrapper {
  margin-right: 15px;
  font-size: 12px !important;
}

.message ::v-deep .ivu-tabs-tab {
  border-radius: 0 !important;
}
</style>
