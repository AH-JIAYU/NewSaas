<script setup lang="ts">
import Payment from "./components/Payment/index.vue";
import setting from "./setting.vue";
import storage from "@/utils/storage";
import api from "@/api/modules/personal_setting";
import useAvatarStore from "@/store/modules/avatar";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";

const avatarStore = useAvatarStore();
//基础字典
const basicDictionaryStore = useBasicDictionaryStore();
// 国家list
const countryList = ref<any>([]);
const countryData = ref<any>();
// editRef
const editRef = ref();
// settingRef
const settingRef = ref();
// loading
const loading = ref(false);
// 定义数据
const form = ref<any>({});
// 新增
function payment() {
  editRef.value.showEdit();
}
function edit() {
  settingRef.value.showEdit(form.value);
}
// 获取数据
const getDataList = async () => {
  try {
    loading.value = true;
    storage.local.remove("avatar");
    const res = await api.list();
    storage.local.set("avatar", res.data.avatar);
    avatarStore.permissions = res.data.avatar;
    countryList.value =
      (await basicDictionaryStore.country) ||
      (await basicDictionaryStore.getCountry());
    form.value = res.data;
    loading.value = false;
    countryData.value = countryList.value.find(
      (item: any) => item.code === form.value.country
    );
  } catch (error) {

  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  getDataList();
});
</script>
<template>
  <div v-loading="loading">
    <PageMain style="background-color: #f2f2f2">
      <div class="personal b-r-5">
        <div class="avater">
          <el-avatar style="margin-right: 15px" :size="60" :src="form.avatar" />
          <div class="top">
            <p class="user"><span class="name">{{ form.name + '(某某某有限公司)' }}</span></p>
            <div class="versionDtail">
              <div class="id">
                ID:585645986545483776
              </div>
              <p class="icon">
                <span class="svg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="18" viewBox="0 0 27 18" fill="none">
                    <g id="Frame 3474899">
                      <rect y="0.5" width="27" height="17" rx="4" fill="#409EFF" />
                      <path id="VIP"
                        d="M4.06 4.932H5.476L7.912 12.036H7.948L10.372 4.932H11.788L8.716 13.5H7.132L4.06 4.932ZM12.7156 4.932H14.0116V13.5H12.7156V4.932ZM15.715 4.932H19.267C21.307 4.932 22.327 5.796 22.327 7.536C22.327 9.288 21.295 10.164 19.243 10.164H17.023V13.5H15.715V4.932ZM17.023 6.048V9.048H19.159C19.807 9.048 20.275 8.928 20.575 8.688C20.863 8.448 21.019 8.064 21.019 7.536C21.019 7.008 20.863 6.624 20.563 6.408C20.263 6.168 19.795 6.048 19.159 6.048H17.023Z"
                        fill="white" />
                    </g>
                  </svg>
                </span>
                <span class="versions">试用版</span>
              </p>
            </div>
          </div>
        </div>
        <ElButton class="button" style="text-align: left" type="primary" link @click="edit">编辑个人中心<span><svg
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g id="Right (å³)">
                <path id="Vector" d="M9.5 6L15.5 12L9.5 18" stroke="#777777" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </g>
            </svg></span>
        </ElButton>
        <!-- <el-text
          style="align-self: flex-end; flex: 1; text-align: right; color: #fff"
          class="m-4"
          >ID:13246578913</el-text
        > -->
      </div>
      <div class="center">
        <div class="version b-r-5" style="background-color: #F9FCFF;">
          <div class="versionTop">
            <div class="titleIcon">
              <div class="versionName">
                <div class="versionNames">
                  <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      fill="none">
                      <g id="Group 18166">
                        <circle id="Ellipse 79" cx="12" cy="12" r="12" fill="#D7EAFF" />
                        <g id="Group 18158">
                          <path id="Vector"
                            d="M18.9943 9.56277L17.3712 16.9427C17.2022 17.7204 16.5174 18.2699 15.7228 18.2699H8.2922C7.49757 18.2699 6.81284 17.7204 6.64377 16.9427L5.0207 9.56277C4.84318 8.73433 5.84914 8.18485 6.44089 8.78505L8.19921 10.5434L11.2763 5.41211C11.606 4.86263 12.4006 4.86263 12.7218 5.41211L15.7989 10.5434L17.5572 8.78505C18.1574 8.18485 19.1634 8.74278 18.9774 9.56277H18.9943Z"
                            fill="url(#paint0_radial_321_17340)" />
                          <path id="Vector_2"
                            d="M14.2987 12.608L12.4717 14.4366C12.0814 14.8274 11.4482 14.8276 11.0575 14.4373L9.22656 12.608"
                            stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                        </g>
                      </g>
                      <defs>
                        <radialGradient id="paint0_radial_321_17340" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(5.84535 9.22674) rotate(42.3974) scale(13.1641 13.8884)">
                          <stop stop-color="#92C7FE" />
                          <stop offset="0.5" stop-color="#7ABCFF" />
                          <stop offset="1" stop-color="#3498FF" />
                        </radialGradient>
                      </defs>
                    </svg></span>
                  <div class="title">试用版</div>
                </div>
                <div class="time fx-c">
                  <p class="fx-c">到期时间：<span>2029-09-09 10:10:10</span></p>
                </div>
              </div>
              <div class="iconBig">
                <div class="svg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="132" height="132" viewBox="0 0 132 132" fill="none">
                    <g id="Group 18166" opacity="0.1">
                      <g id="Group 18158">
                        <path id="Vector"
                          d="M120.955 52.3503L108.203 110.335C106.874 116.446 101.494 120.763 95.2507 120.763H36.8673C30.6238 120.763 25.2438 116.446 23.9154 110.335L11.1627 52.3503C9.76784 45.8411 17.6718 41.5238 22.3213 46.2397L36.1367 60.0551L60.3137 19.738C62.904 15.4207 69.1476 15.4207 71.6715 19.738L95.8485 60.0551L109.664 46.2397C114.38 41.5238 122.284 45.9076 120.823 52.3503H120.955Z"
                          fill="url(#paint0_radial_321_17386)" />
                        <path id="Vector_2"
                          d="M84.067 76.2789L67.693 92.6679C65.7413 94.6214 62.5755 94.6228 60.6219 92.6711L44.2148 76.2789"
                          stroke="white" stroke-width="10" stroke-miterlimit="10" stroke-linecap="round" />
                      </g>
                    </g>
                    <defs>
                      <radialGradient id="paint0_radial_321_17386" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(17.642 49.7101) rotate(42.3974) scale(103.432 109.123)">
                        <stop stop-color="#92C7FE" />
                        <stop offset="0.5" stop-color="#7ABCFF" />
                        <stop offset="1" stop-color="#3498FF" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div class="btn">
              <el-button class="btn" type="info" size="default" @click="payment">立即开通</el-button>
            </div>
          </div>
          <div class="equity">
            <ul class="ul">
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#1A94FF" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#1A94FF" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#1A94FF" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#1A94FF" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#1A94FF" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#1A94FF" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#1A94FF" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#1A94FF" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#1A94FF" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#1A94FF" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
            </ul>
          </div>
        </div>
        <div class="version b-r-5" style="background-color: #FFFAF3;">
          <div class="versionTop">
            <div class="titleIcon">
              <div class="versionName">
                <div class="versionNames">
                  <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      fill="none">
                      <g id="Group 18172">
                        <circle id="Ellipse 79" cx="12" cy="12" r="12" fill="#FFEED6" />
                        <g id="Group 476">
                          <g id="Group">
                            <g id="Group_2">
                              <path id="Union" fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.1133 17.8579C11.1133 17.7111 11.0434 17.5588 10.9088 17.5003C9.42861 16.8567 8.20528 14.9949 7.64517 13.306C7.5713 13.0833 7.27027 12.9911 7.03561 12.9911V12.9911C5.72335 12.9911 4.66406 11.9318 4.66406 10.6196V9.03856C4.66406 8.60378 5.0198 8.24805 5.45458 8.24805H5.57116C5.97082 8.24805 6.34498 8.36579 6.65909 8.56969C6.70365 8.59861 6.76439 8.56128 6.75566 8.50889V8.50889C6.59755 7.54446 7.34064 6.66699 8.31297 6.66699H15.6489C16.6292 6.66699 17.3723 7.54446 17.2062 8.50889V8.50889C17.1972 8.56348 17.2607 8.60231 17.307 8.57207C17.6218 8.36675 17.9973 8.24805 18.3986 8.24805H18.5395C18.9743 8.24805 19.33 8.60378 19.33 9.03856V10.6196C19.33 11.9318 18.2707 12.9911 16.9585 12.9911V12.9911C16.7138 12.9911 16.3906 13.0856 16.3132 13.3177C15.7283 15.0734 14.428 17.006 12.8748 17.5709C12.7598 17.6127 12.6943 17.7356 12.6943 17.8579V17.8579V18.6484C12.6943 18.7065 12.688 18.7631 12.6762 18.8176C12.6663 18.8629 12.6904 18.9101 12.7343 18.9249V18.9249L13.9679 19.3361C14.0564 19.3656 14.1483 19.385 14.2402 19.4043L14.2402 19.4043C14.3601 19.4296 14.4799 19.4548 14.5918 19.5025C14.6844 19.5419 14.7673 19.5983 14.837 19.668C14.9793 19.8103 15.0663 20.0079 15.0663 20.2293C15.0663 20.4506 14.9793 20.6483 14.837 20.7906C14.6948 20.9328 14.4971 21.0198 14.2758 21.0198H9.5327C9.31136 21.0198 9.11373 20.9328 8.97144 20.7906C8.82914 20.6483 8.74219 20.4506 8.74219 20.2293C8.74219 20.0079 8.82914 19.8103 8.97144 19.668C9.04114 19.5983 9.12413 19.5419 9.21668 19.5025C9.32863 19.4548 9.44841 19.4296 9.56827 19.4043C9.66016 19.385 9.7521 19.3656 9.8406 19.3361L11.0742 18.9249V18.9249C11.1176 18.9102 11.1415 18.8635 11.1317 18.8187C11.1196 18.7639 11.1133 18.7069 11.1133 18.6484V17.8579V17.8579Z"
                                fill="url(#paint0_radial_321_17395)" />
                            </g>
                            <path id="Star 1"
                              d="M11.5578 8.83817C11.7454 8.4826 12.2546 8.4826 12.4422 8.83817L12.8022 9.52049C12.8746 9.65761 13.0064 9.75342 13.1592 9.77985L13.9194 9.91138C14.3155 9.97992 14.4729 10.4642 14.1927 10.7525L13.655 11.3058C13.5469 11.4169 13.4966 11.572 13.5186 11.7254L13.6285 12.489C13.6857 12.887 13.2737 13.1863 12.9129 13.0089L12.2206 12.6685C12.0815 12.6001 11.9185 12.6001 11.7794 12.6685L11.0871 13.0089C10.7263 13.1863 10.3143 12.887 10.3715 12.489L10.4814 11.7254C10.5034 11.572 10.4531 11.4169 10.345 11.3058L9.80732 10.7525C9.52713 10.4642 9.68449 9.97992 10.0806 9.91138L10.8408 9.77985C10.9936 9.75342 11.1254 9.65761 11.1978 9.52049L11.5578 8.83817Z"
                              fill="white" />
                          </g>
                        </g>
                      </g>
                      <defs>
                        <radialGradient id="paint0_radial_321_17395" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(5.54962 11.2387) rotate(43.3109) scale(13.9958 14.8013)">
                          <stop stop-color="#FFCB84" />
                          <stop offset="0.5" stop-color="#FFB652" />
                          <stop offset="1" stop-color="#FB9201" />
                        </radialGradient>
                      </defs>
                    </svg></span>
                  <div class="title" style="color: #FCB149;">基础版</div>
                </div>
                <!-- <div class="time fx-c">
                  <p class="fx-c">到期时间：<span>2029-09-09 10:10:10</span></p>
                </div> -->
                <div class="money">
                  <span class="left">
                    ￥
                  </span>
                  <span class="center">
                    999
                  </span>
                  <span class="right">
                    /年
                  </span>
                </div>
              </div>
              <div class="iconBig">
                <div class="svg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="132" height="132" viewBox="0 0 132 132" fill="none">
                    <g id="Group 18172" opacity="0.1">
                      <g id="Group 476">
                        <g id="Group">
                          <g id="Group_2">
                            <path id="Union" fill-rule="evenodd" clip-rule="evenodd"
                              d="M59.793 96.0053C59.793 94.9779 59.304 93.9116 58.3619 93.5019C48.0003 88.9965 39.4369 75.9645 35.5162 64.142C34.9991 62.5828 32.8919 61.9379 31.2492 61.9379V61.9379C22.0635 61.9379 14.6484 54.5229 14.6484 45.3371V34.2699C14.6484 31.2264 17.1386 28.7363 20.1821 28.7363H20.9981C23.7957 28.7363 26.4149 29.5605 28.6137 30.9878C28.9255 31.1903 29.3507 30.929 29.2896 30.5622V30.5622C28.1829 23.8112 33.3845 17.6689 40.1908 17.6689H91.5425C98.4042 17.6689 103.606 23.8112 102.444 30.5622V30.5622C102.38 30.9443 102.825 31.2162 103.149 31.0045C105.353 29.5672 107.981 28.7363 110.791 28.7363H111.777C114.82 28.7363 117.31 31.2264 117.31 34.2699V45.3371C117.31 54.5229 109.895 61.9379 100.709 61.9379V61.9379C98.9967 61.9379 96.734 62.5993 96.1926 64.2242C92.0981 76.5136 82.9957 90.042 72.1234 93.9961C71.3187 94.2888 70.8602 95.149 70.8602 96.0053V96.0053V101.539C70.8602 101.945 70.8163 102.342 70.7331 102.723C70.664 103.04 70.8328 103.371 71.1399 103.475V103.475L79.7752 106.353C80.3947 106.559 81.0383 106.695 81.6815 106.83C82.5206 107.007 83.359 107.183 84.1426 107.517C84.7905 107.793 85.3714 108.188 85.8593 108.676C86.8554 109.672 87.4641 111.056 87.4641 112.605C87.4641 114.154 86.8554 115.538 85.8593 116.534C84.8633 117.53 83.4799 118.139 81.9305 118.139H48.7289C47.1795 118.139 45.7961 117.53 44.8001 116.534C43.804 115.538 43.1953 114.154 43.1953 112.605C43.1953 111.056 43.804 109.672 44.8001 108.676C45.288 108.188 45.8689 107.793 46.5168 107.517C47.3004 107.183 48.1388 107.007 48.9779 106.83C49.6211 106.695 50.2647 106.559 50.8842 106.353L59.5194 103.475V103.475C59.8235 103.372 59.9905 103.044 59.9217 102.731C59.8374 102.347 59.793 101.948 59.793 101.539V96.0053V96.0053Z"
                              fill="url(#paint0_radial_321_17445)" />
                          </g>
                          <path id="Star 1"
                            d="M62.9044 32.8672C64.2177 30.3782 67.7823 30.3782 69.0956 32.8672L71.6155 37.6434C72.122 38.6033 73.045 39.2739 74.1144 39.4589L79.4356 40.3796C82.2086 40.8594 83.3101 44.2497 81.3487 46.2678L77.585 50.1403C76.8286 50.9186 76.476 52.0037 76.6305 53.0779L77.3992 58.4232C77.7998 61.2087 74.9159 63.304 72.3905 62.0622L67.5444 59.6794C66.5705 59.2005 65.4295 59.2005 64.4556 59.6794L59.6095 62.0622C57.0841 63.304 54.2002 61.2087 54.6008 58.4232L55.3695 53.0779C55.524 52.0037 55.1714 50.9186 54.415 50.1403L50.6513 46.2678C48.6899 44.2497 49.7914 40.8594 52.5644 40.3796L57.8856 39.4589C58.955 39.2739 59.878 38.6033 60.3845 37.6434L62.9044 32.8672Z"
                            fill="white" />
                        </g>
                      </g>
                    </g>
                    <defs>
                      <radialGradient id="paint0_radial_321_17445" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(20.8474 49.6707) rotate(43.3109) scale(97.9708 103.609)">
                        <stop stop-color="#FFCB84" />
                        <stop offset="0.5" stop-color="#FFB652" />
                        <stop offset="1" stop-color="#FB9201" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div class="btn">
              <el-button class="btn" style="background-color: #FCB149;" type="info" size="default"
                @click="payment">立即开通</el-button>
            </div>
          </div>
          <div class="equity">
            <ul class="ul" style="color:#FCB149;">
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FCB149" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FCB149" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FCB149" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FCB149" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FCB149" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FCB149" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FCB149" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FCB149" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FCB149" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FCB149" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
            </ul>
          </div>
        </div>
        <div class="version b-r-5" style="background-color: #FFF8F9;">
          <div class="versionTop">
            <div class="titleIcon">
              <div class="versionName">
                <div class="versionNames">
                  <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      fill="none">
                      <g id="Group 18174">
                        <circle id="Ellipse 79" cx="12" cy="12" r="12" fill="#FFE3E6" />
                        <g id="Group 18173">
                          <path id="Vector"
                            d="M16.5788 6.00385C16.2221 5.38288 15.5607 5 14.8445 5H9.15545C8.43933 5 7.77787 5.38288 7.42118 6.00385L4.57182 10.9645C4.2177 11.581 4.2175 12.3391 4.57127 12.9558L7.42137 17.9241C7.77791 18.5456 8.43968 18.9289 9.15619 18.9289H14.8438C15.5603 18.9289 16.2221 18.5456 16.5786 17.9241L19.4287 12.9558C19.7825 12.3391 19.7823 11.581 19.4282 10.9645L16.5788 6.00385Z"
                            fill="url(#paint0_radial_321_17462)" />
                          <path id="Star 2"
                            d="M11.5578 8.83817C11.7454 8.4826 12.2546 8.4826 12.4422 8.83817L13.1079 10.0998C13.1802 10.2369 13.3121 10.3327 13.4648 10.3592L14.8704 10.6024C15.2666 10.6709 15.4239 11.1552 15.1437 11.4435L14.1495 12.4665C14.0415 12.5776 13.9911 12.7326 14.0132 12.8861L14.2162 14.298C14.2735 14.696 13.8615 14.9953 13.5007 14.8179L12.2206 14.1885C12.0815 14.1201 11.9185 14.1201 11.7794 14.1885L10.4993 14.8179C10.1385 14.9953 9.72653 14.696 9.78376 14.298L9.98681 12.8861C10.0089 12.7326 9.95851 12.5776 9.85045 12.4665L8.85627 11.4435C8.57607 11.1552 8.73343 10.6709 9.12958 10.6024L10.5352 10.3592C10.6879 10.3327 10.8198 10.2369 10.8921 10.0998L11.5578 8.83817Z"
                            fill="white" />
                        </g>
                      </g>
                      <defs>
                        <radialGradient id="paint0_radial_321_17462" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(4.96611 9.43666) rotate(39.9829) scale(14.4998 15.126)">
                          <stop stop-color="#FF98A0" />
                          <stop offset="0.5" stop-color="#FF717C" />
                          <stop offset="1" stop-color="#FB5765" />
                        </radialGradient>
                      </defs>
                    </svg></span>
                  <div class="title" style="color: #FE616E;">高级版</div>
                </div>
                <!-- <div class="time fx-c">
                  <p class="fx-c">到期时间：<span>2029-09-09 10:10:10</span></p>
                </div> -->
                <div style="color: #FE616E;" class="money">
                  <span class="left">
                    ￥
                  </span>
                  <span class="center">
                    999
                  </span>
                  <span class="right">
                    /年
                  </span>
                </div>
              </div>
              <div class="iconBig">
                <div class="svg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="132" height="132" viewBox="0 0 132 132" fill="none">
                    <g id="Group 18172" opacity="0.1">
                      <g id="Group 18173">
                        <path id="Vector"
                          d="M98.0517 20.2403C95.5549 15.8935 90.9247 13.2134 85.9118 13.2134H46.0881C41.0753 13.2134 36.4451 15.8935 33.9483 20.2403L14.0027 54.9648C11.5239 59.2803 11.5225 64.5873 13.9989 68.9042L33.9496 103.682C36.4453 108.033 41.0777 110.716 46.0933 110.716H85.9067C90.9223 110.716 95.5547 108.033 98.0504 103.682L118.001 68.9042C120.478 64.5873 120.476 59.2803 117.997 54.9648L98.0517 20.2403Z"
                          fill="url(#paint0_radial_321_17504)" />
                        <path id="Star 2"
                          d="M62.9044 40.0806C64.2177 37.5916 67.7823 37.5916 69.0956 40.0806L73.7551 48.912C74.2615 49.8718 75.1845 50.5425 76.2539 50.7275L86.093 52.4299C88.866 52.9097 89.9675 56.2999 88.0061 58.318L81.0468 65.4785C80.2904 66.2568 79.9379 67.3419 80.0924 68.4161L81.5137 78.2997C81.9143 81.0852 79.0304 83.1805 76.505 81.9387L67.5444 77.5328C66.5705 77.0539 65.4295 77.0539 64.4556 77.5328L55.495 81.9387C52.9696 83.1805 50.0857 81.0852 50.4863 78.2997L51.9076 68.4161C52.0621 67.3419 51.7096 66.2568 50.9532 65.4785L43.9939 58.318C42.0325 56.2999 43.134 52.9097 45.907 52.4299L55.7461 50.7275C56.8155 50.5425 57.7385 49.8718 58.2449 48.912L62.9044 40.0806Z"
                          fill="white" />
                      </g>
                    </g>
                    <defs>
                      <radialGradient id="paint0_radial_321_17504" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(16.7628 44.27) rotate(39.9829) scale(101.499 105.882)">
                        <stop stop-color="#FF98A0" />
                        <stop offset="0.5" stop-color="#FF717C" />
                        <stop offset="1" stop-color="#FB5765" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div class="btn">
              <el-button class="btn" style="background-color: #FE616E;" type="info" size="default"
                @click="">立即开通</el-button>
            </div>
          </div>
          <div class="equity">
            <ul class="ul" style="color:#FE616E;">
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FE616E" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FE616E" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FE616E" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FE616E" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FE616E" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FE616E" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FE616E" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FE616E" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FE616E" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#FE616E" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
            </ul>
          </div>
        </div>
        <div class="version b-r-5" style="background-color: #FBF5FF;">
          <div class="versionTop">
            <div class="titleIcon">
              <div class="versionName">
                <div class="versionNames">
                  <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      fill="none">
                      <g id="Group 18167">
                        <circle id="Ellipse 79" cx="12" cy="12" r="12" fill="#EDD2FF" />
                        <g id="Group 18168">
                          <path id="Vector"
                            d="M16.5769 7.57735C16.2025 7.20744 15.6974 7 15.1712 7H8.8204C8.29325 7 7.78743 7.20812 7.41291 7.57909L5.28383 9.68806C4.55471 10.4103 4.49057 11.5672 5.13539 12.3656L10.4401 18.9338C11.2403 19.9246 12.7504 19.9251 13.5512 18.9348L18.8617 12.3675C19.5078 11.5684 19.4432 10.4096 18.7122 9.68729L16.5769 7.57735Z"
                            fill="url(#paint0_radial_321_17513)" />
                          <path id="Vector_2"
                            d="M15 11L12.8023 13.933C12.4025 14.4665 11.6025 14.4668 11.2023 13.9337L9 11"
                            stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                        </g>
                      </g>
                      <defs>
                        <radialGradient id="paint0_radial_321_17513" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(4.96611 11.4144) rotate(39.8413) scale(14.4699 15.0814)">
                          <stop stop-color="#D395FC" />
                          <stop offset="0.5" stop-color="#C46AFF" />
                          <stop offset="1" stop-color="#AD33FC" />
                        </radialGradient>
                      </defs>
                    </svg></span>
                  <div class="title" style="color: #AD68DA;">旗舰版</div>
                </div>
                <!-- <div class="time fx-c">
                  <p class="fx-c">到期时间：<span>2029-09-09 10:10:10</span></p>
                </div> -->
                <div style="color: #AD68DA;" class="money">
                  <span class="left">
                    ￥
                  </span>
                  <span class="center">
                    999
                  </span>
                  <span class="right">
                    /年
                  </span>
                </div>
              </div>
              <div class="iconBig">
                <div class="svg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="132" height="132" viewBox="0 0 132 132" fill="none">
                    <g id="Group 18167" opacity="0.1">
                      <g id="Group 18169">
                        <path id="Vector"
                          d="M98.0382 24.4638C95.4176 21.8745 91.8821 20.4224 88.1981 20.4224H43.7428C40.0528 20.4224 36.512 21.8792 33.8904 24.476L18.9868 39.2388C13.883 44.2944 13.434 52.3926 17.9477 57.9814L55.0806 103.959C60.682 110.895 71.2527 110.898 76.8583 103.966L114.032 57.9948C118.555 52.4011 118.103 44.2897 112.986 39.2334L98.0382 24.4638Z"
                          fill="url(#paint0_radial_321_17555)" />
                        <path id="Vector_2"
                          d="M87 48.4224L71.6159 68.9532C68.8175 72.6878 63.2175 72.6903 60.4159 68.9581L45 48.4224"
                          stroke="white" stroke-width="10.5" stroke-miterlimit="10" stroke-linecap="round" />
                      </g>
                    </g>
                    <defs>
                      <radialGradient id="paint0_radial_321_17555" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(16.7628 51.3235) rotate(39.8413) scale(101.289 105.57)">
                        <stop stop-color="#D395FC" />
                        <stop offset="0.5" stop-color="#C46AFF" />
                        <stop offset="1" stop-color="#AD33FC" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div class="btn">
              <el-button class="btn" style="background-color: #AD68DA;" type="info" size="default"
                @click="">立即开通</el-button>
            </div>
          </div>
          <div class="equity">
            <ul class="ul" style="color:#AD68DA;">
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#AD68DA" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#AD68DA" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#AD68DA" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#AD68DA" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#AD68DA" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#AD68DA" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#AD68DA" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#AD68DA" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#AD68DA" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
              <li><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g id="Check-one (æ ¡éª)">
                      <path id="Vector"
                        d="M7.9987 15.1666C9.83963 15.1666 11.5063 14.4204 12.7127 13.214C13.9192 12.0076 14.6654 10.3409 14.6654 8.49998C14.6654 6.65905 13.9192 4.99238 12.7127 3.78593C11.5063 2.57951 9.83963 1.83331 7.9987 1.83331C6.15776 1.83331 4.4911 2.57951 3.28465 3.78593C2.07822 4.99238 1.33203 6.65905 1.33203 8.49998C1.33203 10.3409 2.07822 12.0076 3.28465 13.214C4.4911 14.4204 6.15776 15.1666 7.9987 15.1666Z"
                        fill="#AD68DA" />
                      <path id="Vector_2" d="M5.33203 8.5L7.33203 10.5L11.332 6.5" stroke="white" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg></span>供应商团队</li>
            </ul>
          </div>
        </div>
        <!-- <div class="version b-r-5" style="background-color: #FFFAF3;">
          <h2>基础版</h2>
          <h1> 999 <span class="yare">/ 年</span></h1>
          <el-button class="btns" size="default" @click="payment">立即开通</el-button>

          <ul>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
          </ul>
          <ElButton class="m-2" style="width: 100%" type="primary" link>功能特权,了解特权及对比 ></ElButton>
        </div>
        <div class="version b-r-5">
          <h2 style="color: #f6403f">高级版</h2>
          <h1> 9999 <span class="yare">/ 年</span></h1>
          <el-button class="butn" size="default" @click="payment">立即开通</el-button>

          <ul>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
          </ul>
          <ElButton class="m-4" style="width: 100%; color: #f6403f" type="primary" link>功能特权,了解特权及对比 >
          </ElButton>
        </div>
        <div class="version b-r-5">
          <h2 style="color: #d9a550">旗舰版</h2>
          <h1> 99999 <span class="yare">/ 年</span></h1>
          <el-button class="buttn" size="default" @click="payment">立即开通</el-button>

          <ul>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
          </ul>
          <ElButton class="m-4" style="width: 100%; color: #d9a550" type="primary" link>功能特权,了解特权及对比 >
          </ElButton>
        </div> -->
      </div>
      <Payment ref="editRef" />
      <setting ref="settingRef" @success="getDataList" />
    </PageMain>
  </div>
</template>
<style scoped lang="scss">
li {
  list-style-type: none;
}

.fx-c {
  display: flex;
  align-items: center;
}

.b-r-5 {
  border-radius: 5px;
}

:root {
  --el-avatar-size: 65px;
}

.personal {
  display: flex;
  justify-content: left;
  align-items: center;
  justify-content: space-between;
  // flex-wrap: wrap;
  width: 100%;
  height: 6.0625rem;
  margin-bottom: 1.875rem;
  background: #fff;

  .button {
    width: 120px;
    height: 24px;
    margin-right: 1rem;
    font-weight: 400;
    font-size: 16px;
    color: #333333;
    line-height: 19px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    border-radius: 0px 0px 0px 0px;

    span {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .avater {
    display: flex;
    align-items: center;
    margin: 1rem;
    min-width: 13.75rem;
    height: 4.0625rem;
    border-radius: 0px 0px 0px 0px;

    .top {
      min-width: 8.9375rem;
      height: 4.0625rem;
      border-radius: 0px 0px 0px 0px;

      .user {
        min-width: 18rem;
        height: 2.125rem;
        line-height: 2.4375rem;
        border-radius: 0px 0px 0px 0px;
        font-size: 1.25rem;
        font-weight: 700;
        color: #333333;

        .name {
          display: inline-block;
          min-width: 3.5rem;
          height: 2.4375rem;
          font-weight: 700;
          font-size: 1.5rem;
          color: #333333;
          line-height: 2.0625rem;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        .icon {
          margin-left: 8px;
          width: 70px;
          color: #000;
          font-size: 12px;
          background-color: #8400ff;
        }
      }

      .us {
        font-size: 12px;
        margin-bottom: 13px;
      }

      .cn {
        font-size: 12px;
      }

      .bule {
        margin-right: 5px;
        color: #000;
        background-color: #0b6ebd;
      }
    }
  }
}

.versionDtail {
  margin-top: .25rem;
  display: flex;
  align-items: center;
  width: 16.875rem;
  height: 1.375rem;
  border-radius: 0px 0px 0px 0px;
  font-size: .875rem;

  .id {
    margin-right: .75rem;
    width: 11.9375rem;
    height: 1.375rem;
    font-weight: 400;
    font-size: 1rem;
    color: #333333;
    line-height: 1.375rem;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  .icon {
    display: flex;
    align-items: center;
    width: 4.1875rem;
    height: 1.0625rem;
    border-radius: 0px 0px 0px 0px;

    .svg {
      display: inline-block;
      width: 1.6875rem;
      height: 1.0625rem;
    }

    .versions {
      display: inline-block;
      width: 2.25rem;
      height: 1.0625rem;
      margin-left: .25rem;
      line-height: 1.0625rem;
      font-weight: 500;
      font-size: .75rem;
      color: #333333;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
}

.center {
  display: flex;
  justify-content: space-between;
}

.version {
  width: calc(25% - 1rem);
  height: 28.625rem;
  background: #F9FCFF;
  border-radius: 8px 8px 8px 8px;

  .versionTop {
    min-width: 22.8125rem;
    height: 12.25rem;
    margin: 1rem 1.4375rem 1.5625rem 1rem;
    border-radius: 0px 0px 0px 0px;
    border-bottom: 1px solid rgba(170, 170, 170, 0.3);

    .titleIcon {
      display: flex;
      min-width: 22.8125rem;
      height: 8.25rem;

      .versionName {
        width: 13.6875rem;
        height: 5.6875rem;
        border-radius: 0px 0px 0px 0px;

        .versionNames {
          display: flex;
          align-items: center;
          width: 6.5rem;
          height: 2.125rem;
          border-radius: 0px 0px 0px 0px;

          .icon {
            display: inline-block;
            width: 1.5rem;
            height: 1.5rem;
            margin: .3125rem .5rem .3125rem 0;
          }

          .title {
            display: inline-block;
            width: 4.5rem;
            height: 2.125rem;
            font-weight: 500;
            font-size: 1.5rem;
            color: #409EFF;
            line-height: 2.125rem;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }
        }

        .time {
          min-width: 13.6875rem;
          height: 2.5625rem;
          margin-top: 1rem;
          border-radius: 0px 0px 0px 0px;

          p {
            min-width: 5rem;
            height: 1.375rem;
            font-weight: 500;
            font-size: .875rem;
            color: #333333;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }

          span {
            font-size: .75rem;
            color: #1A94FF;
          }
        }

        .money {
          display: flex;
          align-items: center;
          width: 6.25rem;
          height: 2.5625rem;
          margin-top: 1rem;
          font-weight: 500;
          font-size: 16px;
          color: #FCB149;
          text-align: left;
          font-style: normal;
          text-transform: none;

          span {
            display: inline-block;
          }

          .center {
            font-size: 1.5rem;
          }

          .right {
            color: #7e7e7d;
          }
        }
      }

      .iconBig {
        width: 132px;
        height: 132px;
        background: rgba(217, 217, 217, 0);
        border-radius: 0px 0px 0px 0px;

        .svg {
          width: 8.25rem
            /* 132/16 */
          ;
          height: 8.25rem;
        }
      }
    }

    .btn {
      width: 22.8125rem;
      height: 3.0625rem;
      background: #409EFF;
      border: none;
      border-radius: 8px 8px 8px 8px;

      :deep(.el-button) {
        width: 100%;
        height: 100%;
      }
    }
  }

  .equity {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24.25rem;
    height: 13.875rem;

    ul {
      list-style-type: none;
      /* 移除默认的列表项样式 */
      width: 17.5rem;
      height: 12.8125rem;
      border-radius: 0px 0px 0px 0px;
      padding: 0 20%;
      display: flex;
      color: #409EFF;
      flex-direction: column;
      align-content: center;
      flex-wrap: wrap;
      margin-left: 3.875rem;

      li {
        display: flex;
        align-items: center;
        width: 110px;
        height: 25px;
        margin-bottom: 1rem;
        margin-right: 60px;
        border-radius: 0px 0px 0px 0px;
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        text-align: left;
        font-style: normal;
        text-transform: none;

        span {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          margin-right: .25rem;
        }
      }
    }
  }
}

.butn {
  width: 80%;
  height: 50px;
  margin-left: 10%;
  margin-bottom: 15px;
  font-size: 16px;
  color: #f6403f;
  border: 1px solid #f6403f;
  border-radius: 50px;
}

.btns {
  width: 80%;
  height: 50px;
  margin-left: 10%;
  margin-bottom: 15px;
  font-size: 16px;
  color: #4c99ff;
  border: 1px solid #4c99ff;
  border-radius: 50px;
}

.buttn {
  width: 80%;
  height: 50px;
  margin-left: 10%;
  margin-bottom: 15px;
  font-size: 16px;
  color: #c18537;
  border: 1px solid #c18537;
  border-radius: 50px;
}
</style>
