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
};
onMounted(() => {
  getDataList();
});
</script>
<template>
  <div v-loading="loading">
    <PageMain style="background-color: #f3f5f7">
      <div class="personal b-r-5">
        <div class="avater">
          <el-avatar style="margin-right: 15px" :size="50" :src="form.avatar" />
          <div class="top">
            <!-- <span class="icon">icon基础版本</span> -->
            <p class="user">{{ form.name }}</p>
            <div class="versionDtail">
              <div
                style="margin-right: 5px"
                class="i-ri:vip-fill w-1.5em h-1.5em"
              ></div>
              试用版
            </div>
          </div>
        </div>
        <ElButton
          style="color: #fff; text-align: left"
          type="primary"
          link
          @click="edit"
          >编辑个人中心>
        </ElButton>
        <el-text
          style="align-self: flex-end; flex: 1; text-align: right; color: #fff"
          class="m-4"
          >ID:13246578913</el-text
        >
      </div>
      <div class="center">
        <div class="version b-r-5">
          <h2 style="color: #555555">试用版</h2>
          <div class="time">
            <p>到期时间</p>
            <p>2029-09-09 10:10:10</p>
          </div>
          <el-button class="btn" type="info" size="default" @click=""
            >已开通</el-button
          >
          <ul>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
          </ul>
        </div>
        <div class="version b-r-5">
          <h2>基础版</h2>
          <h1> 999 <span class="yare">/ 年</span></h1>
          <el-button class="btns" size="default" @click="payment"
            >立即开通</el-button
          >

          <ul>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
          </ul>
          <ElButton class="m-2" style="width: 100%" type="primary" link
            >功能特权,了解特权及对比 ></ElButton
          >
        </div>
        <div class="version b-r-5">
          <h2 style="color: #f6403f">高级版</h2>
          <h1> 9999 <span class="yare">/ 年</span></h1>
          <el-button class="butn" size="default" @click="payment"
            >立即开通</el-button
          >

          <ul>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
          </ul>
          <ElButton
            class="m-4"
            style="width: 100%; color: #f6403f"
            type="primary"
            link
            >功能特权,了解特权及对比 >
          </ElButton>
        </div>
        <div class="version b-r-5">
          <h2 style="color: #d9a550">旗舰版</h2>
          <h1> 99999 <span class="yare">/ 年</span></h1>
          <el-button class="buttn" size="default" @click="payment"
            >立即开通</el-button
          >

          <ul>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
            <li>供应商团队</li>
          </ul>
          <ElButton
            class="m-4"
            style="width: 100%; color: #d9a550"
            type="primary"
            link
            >功能特权,了解特权及对比 >
          </ElButton>
        </div>
      </div>
      <Payment ref="editRef" />
      <setting ref="settingRef" @success="getDataList" />
    </PageMain>
  </div>
</template>
<style scoped lang="scss">
// li {
//   list-style-type: none;
// }
.b-r-5 {
  border-radius: 5px;
}

.personal {
  display: flex;
  justify-content: left;
  align-items: center;
  // flex-wrap: wrap;
  width: 100%;
  height: 8rem;
  margin-bottom: 1.875rem;

  background: linear-gradient(to bottom right, #6678fe, #919efe);

  .avater {
    display: flex;
    margin-left: 30px;
    width: 50%;

    .top {
      margin-top: -6px;
      margin-left: 20px;

      .user {
        font-size: 18px;
        font-weight: 700;
        color: #fff;
        margin-bottom: 10px;

        .icon {
          margin-left: 8px;
          width: 70px;
          color: #fff;
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
        color: #fff;
        background-color: #0b6ebd;
      }
    }
  }
}

.versionDtail {
  display: flex;
  align-content: center;
  font-size: 14px;
  color: #fff;
}

.center {
  display: flex;
  justify-content: space-between;
}

.version {
  width: 24%;
  background-color: #fff;

  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    color: #4c99ff;
    margin-bottom: 20px;
    border-bottom: 1px solid #eeeeee;
  }

  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    // margin-left: 45px;
    height: 42px;
    margin-bottom: 20px;

    .yare {
      font-size: 14px;
      font-weight: 400;
    }
  }

  .btn {
    width: 80%;
    height: 50px;
    margin-left: 10%;
    margin-bottom: 15px;
    font-size: 16px;
    background-color: #555555;
    border: none;
    border-radius: 50px;
  }

  .time {
    text-align: center;
    font-size: 14px;
    height: 42px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  ul {
    width: 100%;
    padding: 0 20%;
    display: flex;
    flex-wrap: wrap;
    margin: 12% auto;
    list-style-type: disc;

    li {
      width: calc(50% - 30px);
      margin-bottom: 20px;
      margin-left: 30px;
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
