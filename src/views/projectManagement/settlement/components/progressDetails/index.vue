<template>
  <div>
    <el-dialog v-model="dialogTableVisible" title="进度详情" width="500">
      <!-- 只显示一个进度条 -->
      <el-progress :percentage="progress.percentage" :text-inside="true"
        :status="progress.percentage === 100 ? 'success' : 'warning'"></el-progress>
      <p>任务进度: {{ progress.current }}/{{ progress.count }}</p>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import api from "@/api/modules/project_settlement";
import { ref } from 'vue';

const dialogTableVisible = ref(false);

// 只用一个任务的进度对象
const progress = ref<any>({
  current: 0,        // 当前已完成的数量
  count: 10,      // 总数量
  percentage: 0,  // 进度百分比
});
let intervalId: any
// 获取数据并启动进度跟踪
async function showEdit(row: any) {
  if (row) {
    dialogTableVisible.value = true;
    intervalId = setInterval(async () => {
      try {
        // 请求接口获取进度数据
        const { data } = await api.getSettlementWebSocket(row);
        console.log('data111', data);

        if (data && data.current !== undefined && data.count !== undefined) {
          console.log('data222', data);
          // 更新进度条
          progress.value.current = data.current;
          progress.value.count = data.count;
          progress.value.percentage = (data.current / data.count) * 100;
          // 当进度完成时，停止定时器并将进度条设置为100%
          if (progress.value.current === progress.value.count) {
            clearInterval(intervalId);
            progress.value.percentage = 100;
            setTimeout(() =>{
              dialogTableVisible.value = false;
            },1000)
          }
        }
      } catch (error) {
        console.error('接口请求失败:', error);
        clearInterval(intervalId); // 如果请求失败，停止定时器
      }
    }, 500); // 每500ms请求一次接口
  }
}
const channelObj = new BroadcastChannel("televiseChannel");
// 监听消息事件 -如果子组件提交-1000后自动刷新页面
channelObj.onmessage = function () {
  setTimeout(async () => {
    console.log(11111111111111);

    clearInterval(intervalId);
    dialogTableVisible.value = false;
  }, 1000);
};

// 暴露
defineExpose({ showEdit });
</script>

<style lang="scss" scoped>
/* 可以添加自定义样式 */
:deep {
  .el-progress-bar__outer {
    height: 1rem !important;
  }
}
</style>
