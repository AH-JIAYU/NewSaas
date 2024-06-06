<script setup lang="ts">
import api from "@/api/modules/survey_vipGroup";
import { ElMessage } from "element-plus";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import useSurveyVipGroupStore from "@/store/modules/survey_vipGroup"; //会员组
import useSurveyVipStore from "@/store/modules/survey_vip"; // 会员
const surveyVipGroupStore = useSurveyVipGroupStore(); //会员组
const surveyVipStore = useSurveyVipStore(); // 会员
const emits = defineEmits(["fetch-data"]);
const drawerisible = ref(false);
const NickNameList = ref<any>([]); // 会员集合
const title = ref("新增会员组");
const form = ref<any>({
  memberGroupName: "", //	会员组名称
  groupStatus: 2, //组状态:1:关闭 2:开启
  groupMemberIdList: [], //	组成员id
  groupLeaderMemberId: "", //组长id(会员id)
}); //表单
const formRef = ref<any>({}); //表单Ref
const rules = reactive<any>({
  memberGroupName: [
    { required: true, message: "请输入会员组名称", trigger: "blur" },
  ],
  groupStatus: [{ required: true, message: "请选择组状态", trigger: "change" }],
  groupMemberIdList: [
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
    const { data } = await obtainLoading(
      api.detail({ memberGroupId: row.memberGroupId })
    );
    form.value = data;
  }
  // 获取会员 - 组成员
  NickNameList.value = await obtainLoading(surveyVipStore.getNickNameList());
  drawerisible.value = true;
}
// 删除标签
const handleClose = (tag: any) => {
  const index = form.value.groupMemberIdList.findIndex(
    (item: any) => item === tag.memberId
  );
  form.value.groupMemberIdList.splice(index, 1);
};
// tag列表 和 组长 的循环数据
const tagList = computed(() => {
  // 是否存在
  const ispresence = form.value.groupMemberIdList.includes(
    form.value.groupLeaderMemberId
  );
  // 当改变组成员时候，组长也要变
  form.value.groupLeaderMemberId = ispresence
    ? form.value.groupLeaderMemberId
    : "";
  return NickNameList.value.filter((item: any) =>
    form.value.groupMemberIdList.includes(item.memberId)
  );
});
// 关闭
function close() {
  drawerisible.value = false;
  formRef.value.resetFields(); // 重置校验
}
// 确定
const save = () => {
  formRef.value &&
    formRef.value.validate(async (valid: any) => {
      if (valid) {
        if (!form.value.memberGroupId) {
          const { status } = await submitLoading(api.create(form.value));
          status === 1 &&
            ElMessage.success({
              message: "新增成功",
              center: true,
            });
        } else {
          const { status } = await submitLoading(api.edit(form.value));
          status === 1 &&
            ElMessage.success({
              message: "编辑成功",
              center: true,
            });
        }
        // 数据改变 在会员中需要重新请求
        surveyVipGroupStore.GroupNameList = null;
        // 会员组数据改变,重新查询组成员
        surveyVipStore.NickNameList = null;
        close();
        emits("fetch-data");
      }
    });
};
defineExpose({
  showEdit,
});
</script>

<template lang="">
  <el-drawer
    v-model="drawerisible"
    :close-on-click-modal="false"
    size="50%"
    :title="title"
    @close="close"
  >
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
              :active-value="2"
              :inactive-value="1"
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
          <el-form-item label="组成员" prop="groupMemberIdList">
            <el-select
              multiple
              collapse-tags
              collapse-tags-tooltip
              v-model="form.groupMemberIdList"
              placeholder="模糊搜索"
              clearable
            >
              <el-option
                v-for="item in NickNameList"
                :value="item.memberId"
                :label="item.memberNickname"
                :disabled="item.memberType === 1"
              >
                <span style="float: left">{{ item.memberNickname }}</span>
                <span
                  v-if="item.memberType === 1"
                  style="
                    float: right;
                    color: var(--el-text-color-secondary);
                    font-size: 13px;
                  "
                >
                  已在其他组中
                </span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item>
            <div class="radius p-2 flex gap-2">
              <el-tag
                v-for="tag in tagList"
                :key="tag"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag.memberNickname }}
              </el-tag>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="组长">
            <el-select
              v-model="form.groupLeaderMemberId"
              placeholder="模糊搜索"
            >
              <el-option
                v-for="item in tagList"
                :value="item.memberId"
                :label="item.memberNickname"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- </el-card> -->
    </ElForm>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close"> 取消 </el-button>
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
