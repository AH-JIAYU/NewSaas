<script setup lang="ts">
import Payment from './components/Payment/index.vue'
import setting from './setting.vue'
import storage from "@/utils/storage";
import api from '@/api/modules/personal_setting'
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";

//基础字典
const basicDictionaryStore = useBasicDictionaryStore();
// 国家list
const countryList = ref<any>([]);
const countryData = ref<any>()
// editRef
const editRef = ref()
// settingRef
const settingRef = ref()
// loading
const loading = ref(false)
// 定义数据
const form = ref<any>({})
// 新增
function payment() {
  editRef.value.showEdit()
}
function edit() {
  settingRef.value.showEdit(form.value)
}
// 获取数据
const getDataList = async () => {
  loading.value = true
  storage.local.remove("avatar")
  const res = await api.list()
  const aaa = storage.local.set("avatar", res.data.avatar);
  // console.log('aaa',aaa);
  const bbb = storage.local.get("avatar")
  console.log('bbb',bbb);
  countryList.value = await basicDictionaryStore.country || await basicDictionaryStore.getCountry()
  form.value = res.data
  loading.value = false
  countryData.value = countryList.value.find((item: any) => item.code === form.value.country)
}
onMounted(() => {
  getDataList()
})
</script>
<template>
  <div v-loading="loading">
    <PageMain style="background-color: #f3f5f7;">
      <div class="personal">
        <div class="avater">
          <el-avatar style="margin-right: 15px;" :size="50" :src="form.avatar" />
          <div class="top">
            <p class="user">{{ form.name }}<span class="icon">icon基础版本</span></p>
            <p class="us" v-if="form.country !== 'CN'"><span class="bule">{{ countryData?.chineseName }}</span>{{
    form.email }}</p>
            <p class="cn" v-else><span class="bule">中国</span>{{ form.phone }}</p>
          </div>
        </div>
        <ElButton style="margin-left: 20%;margin-top: -3%;" type="primary" link @click="edit">编辑个人信息>></ElButton>
      </div>
      <div class="center">
        <div class="version">
          <h2 style="color: #555555;">ICON 试用版</h2>
          <h1>￥ 999 <span class="yare">/ 年</span></h1>
          <el-button class="btn" type="info" size="default" @click="">已开通</el-button>
          <div class="time">
            <p>到期时间</p>
            <p>2029-09-09 10:10:10</p>
          </div>
          <ul>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
          </ul>
        </div>
        <div class="version">
          <h2>ICON 基础版</h2>
          <h1>￥ 999 <span class="yare">/ 年</span></h1>
          <el-button class="btns" size="default" @click="payment">立即开通</el-button>
          <div class="time">
            <p>每日只需：￥9999元</p>
          </div>
          <ul>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
          </ul>
          <ElButton style="margin-left: 26%;margin-bottom: .625rem;" type="primary" link>功能特权,了解特权及对比>></ElButton>
        </div>
        <div class="version">
          <h2 style="color: #f6403f;">ICON 高级版</h2>
          <h1>￥ 9999 <span class="yare">/ 年</span></h1>
          <el-button class="butn" size="default" @click="payment">立即开通</el-button>
          <div class="time">
            <p>每日只需：￥9999元</p>
          </div>
          <ul>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
          </ul>
          <ElButton style="margin-left: 26%;margin-bottom: .625rem;color: #f6403f;" type="primary" link>功能特权,了解特权及对比>>
          </ElButton>
        </div>
        <div class="version">
          <h2 style="color: #d9a550;">ICON 旗舰版</h2>
          <h1>￥ 99999 <span class="yare">/ 年</span></h1>
          <el-button class="buttn" size="default" @click="payment">立即开通</el-button>
          <div class="time">
            <p>每日只需：￥9999元</p>
          </div>
          <ul>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
            <li>icon500名会员系统</li>
          </ul>
          <ElButton style="margin-left: 26%;margin-bottom: .625rem;color: #d9a550;" type="primary" link>功能特权,了解特权及对比>>
          </ElButton>
        </div>
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

.personal {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 8rem;
  margin-bottom: 1.875rem;
  background-color: #f39c1b;

  .avater {
    display: flex;
    align-items: self-start;
    margin-left: 30px;

    .top {
      margin-top: -6px;

      .user {
        font-size: 18px;
        margin-bottom: 15px;

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
  }

  h1 {
    margin-left: 45px;
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
  }

  .time {
    text-align: center;
    font-size: 14px;
    margin-bottom: 30px;
  }

  ul {
    width: 100%;
    padding: 0 10%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 22%;

    li {
      width: 50%;
      margin-bottom: 20px;
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
}

.btns {
  width: 80%;
  height: 50px;
  margin-left: 10%;
  margin-bottom: 15px;
  font-size: 16px;
  color: #4c99ff;
  border: 1px solid #4c99ff;
}

.buttn {
  width: 80%;
  height: 50px;
  margin-left: 10%;
  margin-bottom: 15px;
  font-size: 16px;
  color: #c18537;
  border: 1px solid #c18537;
}
</style>
