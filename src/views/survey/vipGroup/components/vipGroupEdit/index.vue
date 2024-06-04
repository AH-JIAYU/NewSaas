<script setup lang="ts">
import api from "@/api/modules/survey_vipGroup";
import useStagedDataStore from "@/store/modules/stagedData"; // 暂存
import apiLoading from "@/utils/apiLoading";

const stagedDataStore = useStagedDataStore(); // 暂存
const emit = defineEmits(["fetch-data"]);
const drawerisible = ref(false);
const NickNameList = ref<any>([]); // 会员集合
const title = ref("新增会员组");
const form = ref<any>({
  memberGroupName: "", //	会员组名称
  groupStatus: 1, //组状态:1:关闭 2:开启
  groupMemberId: [], //	组成员id
  groupLeaderMemberId: "", //组长id(会员id)
}); //表单
const formRef = ref<any>({}); //表单Ref
const rules = reactive<any>({
  memberGroupName: [
    { required: true, message: "请输入会员组名称", trigger: "blur" },
  ],
  groupStatus: [{ required: true, message: "请选择组状态", trigger: "change" }],
  groupMemberId: [
    {
      type: "array",
      required: true,
      message: "请选择至少一个组成员",
      trigger: "change",
    },
  ],
});
// 显隐
async function showEdit(row: any) {
  if (!row) {
    title.value = "新增会员组";
  } else {
    title.value = "编辑会员组";
    const { data } = await apiLoading(
      api.getNickNameList({ memberNickname: "" })
    );
    NickNameList.value = data.getMemberLikeNickNameInfoList;
  }

  drawerisible.value = true;
}
// 关闭
function close() {
  emit("fetch-data");
  drawerisible.value = false;
}
// 确定
const save = () => {
  console.log("save");
};
const list = [
  { a: 1, b: 2, c: 3, id: 1 },
  { a: 1, b: 2, c: 3, id: 1 },
];
defineExpose({
  showEdit,
});
</script>

<template lang="">
  <el-drawer v-model="drawerisible" size="50%" :title="title" @close="close">
    <ElForm ref="formRef" :rules="rules" :model="form" label-width="100px">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="会员组名称" prop="memberGroupName">
            <el-input v-model="form.memberGroupName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8" />
        <el-col :span="8" />
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="组状态" prop="groupStatus">
            <el-switch
              :active-value="1"
              :inactive-value="2"
              active-text="开启"
              inactive-text="关闭"
              inline-prompt
              v-model="form.groupStatus"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" />
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="组成员" prop="groupMemberId">
            <el-select
              multiple
              v-model="form.groupMemberId"
              placeholder="模糊搜索"
              clearable
            >
              <el-option
                v-for="item in NickNameList"
                :value="item.memberId"
                :label="item.memberNickname"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item>
            <div class="radius p-2">用户1</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="组长" prop="top">
            <el-select v-model="form.groupLeaderMemberId" placeholder="模糊搜索" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- </el-card> -->
    </ElForm>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close"> 取消 </el-button>
        <el-button> 暂存 </el-button>
        <el-button type="primary" @click="save"> 确定 </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
:deep {
  .el-divider {
    margin: 20px 0;
  }

  .el-card {
    margin-bottom: 10px;
  }

  .el-row,
  .el-table {
    width: 94% !important;
    margin: auto !important;
  }
}
.radius {
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  min-height: 6rem;
  width: 100%;
}
</style>
