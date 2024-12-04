<script setup lang="ts">
import sort from "./sort.vue";
import storage from "@/utils/storage";
import useFormSearchStore from "@/store/modules/formSearch"; // 筛选项配置
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典
import { cloneDeep } from "lodash-es";
defineOptions({
  name: "FormSearch",
});

// 表单筛选配置项  表单绑定值
const props = defineProps([
  "formSearchList",
  "model",
  "formSearchName",
  "formOption",
]);
const emits = defineEmits(["current-change", "on-reset"]);
const FormSearchStore = useFormSearchStore(); //筛选项配置
const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const sortRef = ref<any>(); //排序组件ref
const formSearchList = ref<any>([]);
const countryList = ref<any>([]); //区域

const searchTypes: any = {
  department: 0,
  group_manage: 1,
  TenantTenantHomepageSettingList: 2,
  position_manage: 3,
  role: 4,
  financial_pm_log: 5,
  announcement: 6,
  list: 7,
  materials: 8,
  scheduling: 9,
  settlement: 10,
  alter: 11,
  callback: 12,
  memberSurveyRecords: 13,
  preInvestigationRecords: 14,
  termination: 15,
  billManagement: 16,
  financialLogs: 17,
  myProjeck: 18,
  vip: 19,
  vipGroup: 20,
  supplier: 21,
};

// 筛选
const currentChange = () => {
  emits("current-change");
};
// 重置
const onReset = () => {
  emits("on-reset");
};
const chagneFormSearchList = (list: any) => {
  formSearchList.value = list;
};

// 排序
const onSort = () => {
  // 先看本地有没有，没有走默认值
  sortRef.value.showEdit(
    // @ts-ignore
    findCurrent() ?? formSearchList.value,
    getValue(),
  );
};
// 查询当前页面对应的键值
const getValue = () => {
  const type = props.formSearchName.split("formSearch-")[1]; // 键名
  const typeValue = searchTypes[type]; // 键值
  return typeValue;
};
// 查找当前页面的配置是否存在
const findCurrent = () => {
  const typeValue = getValue();
  //根据searchTypes里的键值找到接口里的当前项
  const findData = FormSearchStore.formSearchConfig.find(
    (item: any) => item.searchType === typeValue,
  );
  return findData?.getSearchUserInfoList;
};

// 统计 展示的筛选项个数
const showLength = computed(() => {
  const filterData = formSearchList.value.filter((item: any) => item.show);
  return filterData.length;
});
watch(
  () => props.formSearchList,
  (newVal, oleVal) => {
    // @ts-ignore
    const newFormSearchList = cloneDeep(findCurrent() ?? newVal);
    if (newFormSearchList) {
      newFormSearchList.forEach(async (item: any) => {

        if (item.option) {
          if (Array.isArray(item.option)) {
            item.options = item.options;
          } else {
            if (item.option === "global") {
              item.options = await basicDictionaryStore.getCountry();
            } else {
              item.options = await props.formOption[item.option]();
            }
          }
        }
      });
      formSearchList.value = newFormSearchList;
    }
  },
  {
    deep: true,
    immediate: true,
  },
);

onMounted(async () => {
  countryList.value = await basicDictionaryStore.getCountry();
});
</script>
<template>
  <div>
    <SearchBar :show-toggle="false">
      <template #default="{ fold, toggle }">
        <el-form
          :model="props.model"
          size="default"
          label-width="100px"
          inline-message
          inline
          class="search-form"
        >
          <template
            v-for="(item, index) in formSearchList"
            :key="item.modelName"
          >
            <el-form-item
              label=""
              v-if="item.show"
              v-show="index > 2 ? !fold : true"
            >
              <el-input
                v-if="item.type === 'input'"
                v-model="props.model[item.modelName]"
                clearable
                :placeholder="item.placeholder"
                @keydown.enter="currentChange()"
              />
              <el-select
                v-if="item.type === 'select'"
                v-model="props.model[item.modelName]"
                clearable
                :multiple="item.multiple? true :false"
                filterable
                :placeholder="item.placeholder"
                @change="currentChange()"
              >
                <!-- 转换成数组后再展示option -->
                <template v-if="Array.isArray(item.options)">
                  <ElOption
                    v-for="ite in item.options"
                    :label="ite[item.optionLabel]"
                    :value="ite[item.optionValue]"
                  >
                  </ElOption>
                </template>
              </el-select>
              <el-date-picker
                v-if="item.type === 'datetimerange'"
                @change="currentChange()"
                v-model="props.model[item.modelName]"
                type="datetimerange"
                range-separator="-"
                :start-placeholder="item.startPlaceHolder"
                :end-placeholder="item.endPlaceHolder"
                value-format="YYYY-MM-DD HH:mm:ss"
                size=""
                style="width: 192px"
                clear-icon="true"
              />
            </el-form-item>
          </template>
          <ElFormItem>
            <ElButton class="p-2" type="primary" @click="currentChange()">
              <template #icon>
                <SvgIcon name="i-ep:search" />
              </template>
              筛选
            </ElButton>
            <ElButton class="p-2" @click="onReset">
              <template #icon>
                <div class="i-grommet-icons:power-reset h-1em w-1em" />
              </template>
              重置
            </ElButton>
            <ElButton
              class="p-2"
              @click="onSort"
              v-if="formSearchList?.length >= 6"
            >
              <template #icon>
                <svg
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Frame" clip-path="url(#clip0_402_17380)">
                    <path
                      id="Vector"
                      d="M6.92847 11.8602L5.40508 10.9986C5.22026 10.8974 5.06641 10.7478 4.96 10.566C4.85358 10.3841 4.79858 10.1767 4.80088 9.96601V5.06103C4.79995 5.02511 4.79113 4.98983 4.77506 4.95769C4.75899 4.92555 4.73606 4.89734 4.70788 4.87503L1.18771 2.01006L1.14932 1.96385C0.990632 1.79906 0.884777 1.59063 0.845328 1.36529C0.805879 1.13994 0.834634 0.907951 0.927906 0.699056C1.01355 0.49034 1.15987 0.312137 1.34793 0.187516C1.53598 0.0628948 1.75712 -0.00240572 1.98271 6.7755e-05H11.4836C11.7102 0.0020544 11.9314 0.0695829 12.1204 0.1945C12.3094 0.319418 12.4582 0.496383 12.5489 0.704031C12.6396 0.911679 12.6682 1.14113 12.6313 1.36468C12.5944 1.58824 12.4936 1.79633 12.341 1.96385L12.2948 2.01065L8.72726 4.90503C8.70104 4.92854 8.68006 4.9573 8.66569 4.98945C8.65132 5.0216 8.64388 5.05642 8.64386 5.09163V10.8204C8.64736 10.972 8.62093 11.1228 8.56608 11.2642C8.51123 11.4055 8.42904 11.5347 8.32421 11.6443C8.21938 11.7538 8.09397 11.8416 7.95516 11.9027C7.81635 11.9637 7.66686 11.9968 7.51526 12H7.48766C7.29242 12.0006 7.10007 11.9528 6.92786 11.8608L6.92847 11.8602ZM1.7913 1.31164L5.29948 4.15262C5.43562 4.2633 5.54544 4.40288 5.62098 4.56124C5.69653 4.71959 5.73591 4.89277 5.73627 5.06823V9.97319C5.73401 10.0155 5.74352 10.0575 5.76376 10.0947C5.78399 10.1319 5.81415 10.1627 5.85088 10.1838L7.37366 11.0298C7.41067 11.0492 7.45186 11.0594 7.49366 11.0594C7.53547 11.0594 7.57665 11.0492 7.61366 11.0298C7.64901 11.0075 7.67809 10.9766 7.69815 10.94C7.71821 10.9033 7.72858 10.8622 7.72827 10.8204V5.10004C7.72708 4.92497 7.76504 4.75184 7.83937 4.59332C7.91369 4.4348 8.02251 4.2949 8.15786 4.18385L11.6708 1.31287C11.6972 1.27753 11.7134 1.23559 11.7175 1.19166C11.7217 1.14773 11.7136 1.10352 11.6942 1.06387C11.6757 1.02455 11.6465 0.991277 11.6098 0.967914C11.5732 0.94455 11.5307 0.932053 11.4872 0.931872H1.9833C1.93961 0.93055 1.89653 0.942441 1.85971 0.965992C1.82288 0.989542 1.79402 1.02366 1.77689 1.06387C1.75633 1.10276 1.74686 1.14656 1.7495 1.19047C1.75215 1.23439 1.76681 1.27673 1.79189 1.31287L1.7913 1.31164ZM9.71125 6.18602H12.2102C12.2697 6.18556 12.3284 6.17303 12.3828 6.14921C12.4373 6.12538 12.4864 6.09075 12.527 6.04741C12.5867 5.98146 12.6266 5.9001 12.6423 5.81258C12.658 5.72505 12.6488 5.63488 12.6158 5.55231C12.5828 5.46975 12.5273 5.39809 12.4556 5.3455C12.3839 5.29291 12.2989 5.2615 12.2102 5.25483H9.71063C9.5909 5.2589 9.47763 5.31012 9.39548 5.39732C9.31333 5.48452 9.26897 5.60065 9.27204 5.72041C9.26928 5.84009 9.31375 5.95605 9.39583 6.04319C9.47791 6.13033 9.59101 6.18164 9.71064 6.18602H9.71125ZM12.2102 7.97402H9.71063C9.59122 7.96797 9.47871 7.91627 9.39634 7.82962C9.31396 7.74297 9.26803 7.62798 9.26803 7.50842C9.26803 7.38887 9.31396 7.27388 9.39634 7.18723C9.47871 7.10057 9.59122 7.04888 9.71063 7.04282H12.2096C12.3295 7.0469 12.4429 7.09818 12.5252 7.1855C12.6075 7.27282 12.6519 7.3891 12.6488 7.50902C12.6515 7.56885 12.6422 7.6286 12.6216 7.68483C12.601 7.74107 12.5695 7.79265 12.5288 7.83662C12.4882 7.87993 12.4391 7.9145 12.3846 7.93823C12.3301 7.96195 12.2714 7.97433 12.212 7.97461L12.2102 7.97402ZM9.71125 9.7632H12.2102C12.2696 9.7623 12.3282 9.74945 12.3825 9.72544C12.4369 9.70142 12.4858 9.66672 12.5264 9.6234C12.6087 9.53499 12.6529 9.41774 12.6494 9.29701C12.6525 9.17714 12.6081 9.06093 12.5258 8.9737C12.4435 8.88648 12.3301 8.83533 12.2102 8.83141H9.71063C9.59206 8.83877 9.48076 8.89106 9.3994 8.97762C9.31804 9.06419 9.27275 9.17851 9.27275 9.29731C9.27275 9.4161 9.31804 9.53043 9.3994 9.61699C9.48076 9.70356 9.59206 9.75585 9.71063 9.7632H9.71125Z"
                      fill="#606266"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_402_17380">
                      <rect width="12" height="12" fill="#606266" />
                    </clipPath>
                  </defs>
                </svg>
              </template>
              排序
            </ElButton>
            <ElButton
              class="p-2"
              link
              @click="toggle"
              :disabled="showLength <= 3"
            >
              <template #icon>
                <SvgIcon
                  :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'"
                />
              </template>
              {{ fold ? "展开" : "收起" }}
            </ElButton>
          </ElFormItem>
        </el-form>
      </template>
    </SearchBar>
    <sort
      ref="sortRef"
      :formSearchName="formSearchName"
      @chagneFormSearchList="chagneFormSearchList"
    />
  </div>
</template>
<style lang="scss" scoped>
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
</style>
