<script setup>
import { Back } from "@element-plus/icons-vue";
import { h, ref, shallowRef } from "vue";

const emits = defineEmits(["getList", "update:type", "update:time"]);
const props = defineProps(["type", "time"]);

const type = ref(props.type);
const time = ref(props.time);

function back() {
  type.value = "day";
}
const getList = (val) => {
  if (val !== "select") {
    nextTick(() => {
      emits("getList");
    });
  }
  if (typeof val === "string") {
    emits("update:type", val);
  }
};
const changeTime = (val) => {
  emits("update:time", val);
};
</script>

<template>
  <div :style="{ width: time ? '200px' : '140px', height: '33px' }">
    <el-radio-group v-show="type !== 'select'" v-model="type" @change="getList">
      <el-radio-button label="日" value="day" />
      <el-radio-button label="月" value="month" />
      <el-radio-button label="年" value="year" />
      <el-radio-button v-if="time" label="搜索" value="select" />
    </el-radio-group>
    <div v-show="type === 'select'" class="fx-b">
      <el-button
        size="default"
        style="width: 32px !important"
        :icon="Back"
        @click="back"
      />
      <el-date-picker
        v-model="time"
        type="datetimerange"
        range-separator="-"
        start-placeholder="创建开始日期"
        end-placeholder="创建结束日期"
        value-format="YYYY-MM-DD HH:mm:ss"
        size=""
        style="width: 192px"
        clear-icon="true"
        @change="changeTime"
      />
      <!-- {{ time }}
      <el-date-picker
        @change="changeTime()"
        v-model="props.time"
        value-format="YYYY-MM-DD hh:mm:ss"
        type="datetimerange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :empty-values="[]"
        clearable
      /> -->
      <el-button
        type="primary"
        style="width: 59px"
        size="default"
        @click="getList"
      >
        搜索
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fx-b {
  display: flex;
  align-items: center;
  justify-content: space-between;

  :deep {
    .el-date-editor {
      border-radius: 0 !important;
    }

    .el-button:nth-of-type(1) {
      border-radius: 4px 0 0 4px !important;
      border-right: 0px;
    }

    .el-button:nth-of-type(2) {
      border-radius: 0 4px 4px 0 !important;
    }
    .el-icon.el-input__icon.el-range__icon {
      display: none !important;
    }
  }
}
</style>
