<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'ProjectReview',
})
const list = ref<any>([])
const radio1 = ref(1)
const checked1 = ref(false)
list.value = [
  { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
  { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
  { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
  { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
  { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
  { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
]
// 弹框开关变量
const dialogTableVisible = ref(false)
// 提交数据
function onSubmit() { }
// 获取数据
async function showEdit(row: any) {
  dialogTableVisible.value = true
}
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  // formRef.value.resetFields()
  // delete formData.id
  // // 重置表单
  // Object.assign(formData, defaultState)
  dialogTableVisible.value = false
}
defineExpose({ showEdit })
</script>

<template>
  <div>
    <el-drawer v-model="dialogTableVisible" title="项目审核" size="50%" :before-close="closeHandler">
      <el-form ref="form" label-width="150px" :inline="false">
        <el-row style="margin: 0;" :gutter="20">
          <div class="border">
            <p class="pp">项目编码</p>
            <p class="neip">111</p>
          </div>
          <div class="border">
            <p class="pp">项目名称</p>
            <p class="neip">222</p>
          </div>
          <div class="border">
            <p class="pp">配额/限量</p>
            <p class="neip">333</p>
          </div>
        </el-row>
        <div class="shenhe">
          <el-form-item style="display: flex;align-items: center;" label="审核方式">
            <el-radio-group v-model="radio1">
              <el-radio :value="1" size="large">
                按成功ID
              </el-radio>
              <el-radio :value="2" size="large">
                按失败ID
              </el-radio>
              <el-radio :value="3" size="large">
                全部通过
              </el-radio>
              <el-radio :value="4" size="large">
                全部失败
              </el-radio>
              <el-radio :value="5" size="large">
                数据冻结
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div v-if="radio1 === 2" class="shenhe">
          <el-form-item label="失败ID">
            <el-input placeholder="" clearable @change="" />
          </el-form-item>
        </div>
        <div v-if="radio1 === 4" class="shenhe">
          <el-form-item label="第一责任人">
            <el-input placeholder="" clearable @change="" />
          </el-form-item>
        </div>
        <div v-if="radio1 === 4" class="shenhe">
          <el-form-item label="第二责任人">
            <el-input placeholder="" clearable @change="" />
          </el-form-item>
        </div>
        <div class="shenhe">
          <el-form-item label="备注">
            <el-input class="custom-input" placeholder="" clearable @change="" />
          </el-form-item>
        </div>
        <div class="po">
          <el-form-item v-if="checked1" label="结算PO号">
            <el-input class="custom-input" placeholder="" clearable @change="" />
          </el-form-item>
        </div>
        <el-row style="margin: 0;" :gutter="20">
          <el-col :span="20"><el-button type="primary" link size="default" @click="">反选</el-button>
          </el-col>
          <el-col :span="4"> <el-checkbox v-model="checked1" label="填写结算PO号" size="large" /></el-col>
        </el-row>
      </el-form>
      <el-table ref="tableSortRef" v-loading="false" style="margin-top: 10px" row-key="id" :data="list">
        <el-table-column v-if="radio1 <= 2" type="selection" />
        <el-table-column type="index" align="center" label="序号" width="55" />
        <el-table-column show-overflow-tooltip prop="a" align="center" label="会员ID" />
        <el-table-column show-overflow-tooltip prop="b" align="center" label="前置问卷">
          <div style="color: #52d845;" class="i-icon-park-solid:correct w-1em h-1em"></div>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="c" align="center" label="IR" />
        <el-table-column show-overflow-tooltip prop="d" align="center" label="最小时长" />
        <el-table-column show-overflow-tooltip prop="e" align="center" label="配额" />
        <el-table-column show-overflow-tooltip prop="f" align="center" label="IP" />
        <el-table-column show-overflow-tooltip prop="g" align="center" label="时差">
          <div style="color: #e20621;" class="i-icon-park-solid:error w-1em h-1em"></div>
        </el-table-column>
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </el-table>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="onSubmit">
            确定
          </el-button>
          <el-button @click="dialogTableVisible = false">
            取消
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.shenhe {
  width: 56.625rem;
  border: 1px solid #ebeef5;
  border-bottom: none;
}

.asterisk-left {
  margin: 0;
}

.el-input--suffix {
  width: 100%;
  height: 100%;
}

.el-radio-group {
  margin-left: .9375rem;
}

.border {
  display: flex;
  align-items: center;
  width: 18.875rem;
  height: 2.5625rem;
  margin: 0;
  border: 1px solid #ebeef5;
  border-bottom: none;
}

.pp {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 100%;
  font-size: 14px;
  color: #606266;
  background-color: #fafafa;
}

.neip {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 100%;
  color: #606266;
}

:deep {
  .el-form-item__label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 2.5625rem;
    background-color: #fafafa;
  }

  .el-form-item__content {
    width: 50px;
    border: none !important;
  }

  .el-input__inner {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;

  }
  .el-input__wrapper {
    border: none !important;
    box-shadow: none !important;
  }
  .po {
    border: 1px solid #ebeef5;
    width: 56.625rem;
  }
}
::v-deep .el-input__inner {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;

  }
::v-deep .el-input__wrapper {
    border: none !important;
  }
</style>
