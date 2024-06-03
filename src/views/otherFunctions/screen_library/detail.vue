<script setup lang="ts">
import DetailForm from "./components/DetailForm/index.vue";
import eventBus from "@/utils/eventBus";
import useSettingsStore from "@/store/modules/settings";

defineOptions({
  name: "OtherFunctionsScreenLibraryDetail",
});

const route = useRoute();
const router = useRouter();
const tabbar = useTabbar();

const settingsStore = useSettingsStore();

const formRef = ref();

function onSubmit() {
  formRef.value.submit().then(() => {
    eventBus.emit("get-data-list");
    goBack();
  });
}

function onCancel() {
  goBack();
}

// 返回列表页
function goBack() {
  if (
    settingsStore.settings.tabbar.enable &&
    settingsStore.settings.tabbar.mergeTabsBy !== "activeMenu"
  ) {
    tabbar.close({ name: "screenLibrary" });
  } else {
    router.push({ name: "screenLibrary" });
  }
}
</script>

<template>
  <div class="absolute-container">
    <PageMain>
      <DetailForm
        :id="route.params.id as string"
        ref="formRef"
        @onSubmit="onSubmit"
      />
    </PageMain>
    <FixedActionBar>
      <ElButton type="primary" size="large" @click="onSubmit"> 提交 </ElButton>
      <ElButton size="large" @click="onCancel"> 取消 </ElButton>
    </FixedActionBar>
  </div>
</template>

<style lang="scss" scoped>
.absolute-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .page-header {
    margin-bottom: 0;
  }

  .page-main {
    flex: 1;
    overflow: auto;

    :deep(.main-container) {
      flex: 1;
      overflow: auto;
      display: flex;
      flex-direction: column;
    }
  }
}
.page-main {
  .search-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    margin-bottom: -18px;

    :deep(.el-form-item) {
      grid-column: auto / span 1;

      &:last-child {
        grid-column-end: -1;

        .el-form-item__content {
          justify-content: flex-end;
        }
      }
    }
  }

  .el-divider {
    margin-inline: -20px;
    width: calc(100% + 40px);
  }
}
</style>
