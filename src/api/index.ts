import axios from "axios";
import { loadingHide } from "@/components/SpinkitLoading/index"; //加载
import { throttle,debounce } from "lodash-es";
// import qs from 'qs'
import Message from "vue-m-message";
import useSettingsStore from "@/store/modules/settings";
import useUserStore from "@/store/modules/user";
import logo from "./modules/logo";

const api: any = axios.create({
  baseURL:
    import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === "true"
      ? "/proxy/"
      : `${import.meta.env.VITE_APP_API_BASEURL}/api`,

  timeout: 1000 * 60,
  responseType: "json",
});

api.interceptors.request.use((request: any) => {
  // 全局拦截请求发送前提交的参数
  const settingsStore = useSettingsStore();
  const userStore = useUserStore();
  // 设置请求头
  if (request.headers) {
    request.headers["Accept-Language"] = settingsStore.lang;
    if (userStore.isLogin) {
      request.headers.Token = userStore.token;
    }
  }
  // 是否将 POST 请求参数进行字符串化处理
  if (request.method === "post") {
    // request.data = qs.stringify(request.data, {
    //   arrayFormat: 'brackets',
    // })
  }
  return request;
});

api.interceptors.response.use(
  (response: any) => {
    /**
     * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
     * 假设返回数据格式为：{ status: 1, error: '', data: '' }
     * 规则是当 status 为 1 时表示请求成功，为 0 时表示接口需要登录或者登录状态失效，需要重新登录
     * 请求出错时 error 会返回错误信息
     */
    // console.log(response,'response')
    if (response.data.status === 1) {
      return Promise.resolve(response.data);
    } else if (response.data.status === -1) {
      debounceMsg('error', response.data.error, 4000)
      return Promise.reject(response.data);
    } else if (response.data.status === 0) {
      if (response.data.error === 'token 无效') {
        debounceMsg('warning', '账号登录过期', 2000)
        useUserStore().logout(response.data.status);
      } else if (response.data.error === 'token 已被顶下线') {
        debounceMsg('warning', '该账号已在别处登录', 2000)
        useUserStore().logout(response.data.status, 'login');
      } else {
        debounceMsg('warning', response.data.error, 2000)
      }
      return Promise.reject(response.data);
    }
    return Promise.resolve(response.data)
  },
  (error: any) => {
    let message = error.message;
    if (message === "Network Error") {
      message = "后端网络故障";
    } else if (message.includes("timeout")) {
      message = "接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = `接口${message.substr(message.length - 3)}异常`;
    }
    debounceMsg('error', message, 2000)
    return Promise.reject(error);
  }
);
/*** 提示防抖
 * 场景：list里调用客户的接口，筛选项回调用，表格回调用，编辑弹框会调用，调用的都是pinia里的数据，
 * 调用的时候如果不存在数据，就会请求3次接口，如果这时候token过期了或者报错，就会在页面弹出3个提示
*/
const debounceMsg = debounce((type: any, message: any, zIndex: any) => {
  if (type === 'error') {
    Message.error(message, {
      zIndex: zIndex,
    });
  }
  else if (type === 'warning') {
    Message.warning(message, {
      zIndex: zIndex,
    });
  }

}, 500)
export default api;
