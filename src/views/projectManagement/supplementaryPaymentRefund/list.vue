<script setup lang="ts">
defineOptions({
  name: 'ProjectManagementSupplementaryPaymentRefundIndex',
})
import {Position} from '@element-plus/icons-vue'
const activeName = ref("first");
// tabs切换事件
const handleClick = (tab :any, event:any) => {
};
// 提交数据
const onSubmit = () => {}
</script>

<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="项目退款" name="first">
          <el-tabs type="card" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="按失败ID">
              <el-form label-width="" :inline="false" >
                <el-form-item >
                  <el-input style="width: 30%;" placeholder="项目ID"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input style="width: 30%;" placeholder="请粘贴GUID,每行一个" type="textarea" :rows="20"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button  type="primary" :icon="Position" @click="onSubmit">开始</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="按成功ID">
              <el-form label-width="" :inline="false" >
                <el-form-item >
                  <el-input style="width: 30%;" placeholder="项目ID" ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input style="width: 30%;" placeholder="请粘贴GUID,每行一个" type="textarea" :rows="20"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button  type="primary" :icon="Position" @click="onSubmit">开始</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="按记录ID">
              <el-form label-width="" :inline="false" >
                <el-form-item>
                  <el-input style="width: 30%;" placeholder="请粘贴记录ID,每行一个" type="textarea" :rows="20"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button  type="primary" :icon="Position" @click="onSubmit">开始</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="按转化ID(CB)">
              <el-form label-width="" :inline="false" >
                <el-form-item>
                  <el-input style="width: 30%;" placeholder="请粘贴转化ID,每行一个" type="textarea" :rows="20"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button  type="primary" :icon="Position" @click="onSubmit">开始</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="全部退款">
              <el-form label-width="" :inline="false" >
                <el-form-item >
                  <el-input style="width: 30%;" placeholder="项目ID"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button placeholder="" :icon="Position" type="primary" @click="onSubmit">开始</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="子系统退款">
              <el-form label-width="" :inline="false" >
                <el-form-item >
                  <el-input style="width: 30%;" placeholder="项目ID"></el-input>
                </el-form-item>
                <el-form-item >
                  <el-input style="width: 30%;" placeholder="说明" ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input style="width: 30%;" placeholder="请粘贴GUID,每行一个" type="textarea" :rows="20"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button  type="primary" :icon="Position" @click="onSubmit">开始</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="项目补款" name="second">
          <el-form label-width="" :inline="false" >
                <el-form-item >
                  <el-input style="width: 30%;" placeholder="项目ID"></el-input>
                </el-form-item>
                <el-form-item >
                  <el-input style="width: 30%;" placeholder="说明" ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input style="width: 30%;" placeholder="请粘贴GUID,每行一个" type="textarea" :rows="20"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button  type="primary" :icon="Position" @click="onSubmit">开始</el-button>
                </el-form-item>
              </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
