<script setup lang="ts">
import { ElMessage } from "element-plus";
import api from "@/api/modules/query_ip";

defineOptions({
  name: "queryIP",
});
// loading
const loading = ref(false);
// 定义表单
const formIp = ref<any>([]);
// 查询出ip回显
const showIp = ref<any>("");
// 开始
async function ParsingEncryption() {
  try {
    if (formIp.value && formIp.value.length === 0) {
      return ElMessage.warning({
        message: "请至少输入一个IP",
        center: true,
      });
    }
    const arr = formIp.value.split("\n");
    const res = await api.list({ ip: arr });
    const data: any = [];
    res.data.forEach((item: any) => {
      data.push(
        `${item.continent?.names.zhCN}${item.country ? '-' + item.country?.names.zhCN : ''}${item.city ? '-' + item.city?.names.zhCN : ""}, IP注册地:${item.registeredCountry?.names.zhCN}${item.subdivisions ? '-' + item.subdivisions[0]?.names.zhCN : ''}`
      );
    });
    showIp.value = data.join("\n");
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div v-loading="loading">
    <PageMain>
      <el-row style="margin: 0;" :gutter="24">
        <el-col style="padding: 0;" :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
          <el-input v-model="formIp" placeholder="请粘贴IP,参考格式： (110.34.56.112)，每行一个,多个请回车换行" type="textarea"
            :rows="30" />
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
          <div class="flex-c">
            <el-button type="primary" size="default" @click="ParsingEncryption" v-auth="'queryIP-get-getIpInfo'">
              <div class="i-material-symbols-light:not-started-outline-rounded h-1.5em w-1.5em" />
              开始
            </el-button>
          </div>
        </el-col>

        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
          <el-input v-model="showIp" type="textarea" :rows="30" />
        </el-col>
      </el-row>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
.flex-c {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .el-button {
    margin-left: 0;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

:deep(.bytemd-fullscreen) {
  z-index: 2000;
}
</style>
