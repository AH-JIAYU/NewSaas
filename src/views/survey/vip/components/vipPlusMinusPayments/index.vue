<script lang="ts" setup>
import { provide, reactive, ref } from "vue";

const emit = defineEmits(["fetch-data"]);
const loadingDisible = ref<boolean>(false);
const title = ref<string>("");
const form = ref<any>({});

let leftTabsData = reactive<any>([]); // 明确指定类型为 LeftTab[]

async function showEdit(row: any) {
  loadingDisible.value = true;
  if (!row) {
    title.value = "添加";
    leftTabsData = reactive([
      {
        name: "主项目",
        // currency: surveyconfig.currency,
        platform: {},
        screen: {},
        security: {},
      },
    ]);
  } else {
    title.value = "编辑";
  }
}

function close() {
  // leftTabsData = reactive<any>([]);
  // emit("fetch-data");
  loadingDisible.value = false;
}

async function save() {
  close();
}

// ... 这里可能还有其他逻辑 ...
defineExpose({
  showEdit,
});
</script>

<template>
  <div>
    <el-dialog
      v-model="loadingDisible"
      append-to-body
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      width="50%"
      @close="close"
    >
      <el-form :model="form" label-width="80px" :inline="false">
        <el-form-item label="供应商"> 1315（供应商名称） </el-form-item>
        <el-form-item label="加减款">
          <el-radio-group v-model="form.radio">
            <el-radio :value="3">加款</el-radio>
            <el-radio :value="6">减款</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <el-radio :value="3">可用余额</el-radio>
            <el-radio :value="6">待审余额</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="form.d"></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="form.e"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="close"> 取消 </el-button>
        <el-button type="primary" @click="save"> 确定 </el-button>
      </template>
    </el-dialog>
  </div>
</template>
