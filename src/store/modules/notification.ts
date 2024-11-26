import useUserStore from "@/store/modules/user";
import api from "@/api/modules/notification";
import { ElMessage } from 'element-plus'
import { throttle } from "lodash-es";

const useNotificationStore = defineStore(
  // 唯一ID
  "notification",
  () => {
    const userStore = useUserStore();
    // 消息
    const message = ref(0);
    const messageList = ref<any>([]);
    // 已读
    const readAlreadyMessageUnread = ref<any>(0);
    const readAlreadyMessageList = ref<any>([]);
    // 待办
    const todo = ref(0);
    const todoUnread = ref(0);//未读待办
    const todoList = ref<any>([]);
    const readAlreadyUnread = ref(0);//已读已办
    const readAlreadyList = ref<any>([]);
    // 总计
    const total = computed(() => message.value + todoUnread.value);
    const auditTypeList = ["合作邀约"];//消息类型
    //websocket
    const socket = ref<any>();
    const toBreakOff = ref<any>(false) // webscoket是否连接
    const maxReconnectAttempts = 2; // 重连超出该次数就放弃重连
    let reconnectAttempts = 0; // 重连次数
    const reconnectInterval = 1000; // 连接间隔

    // 连接websocket
    function openSocket(userId: any) {
      return new Promise<void>((reslove, reject) => {
        // const socketUrl = import.meta.env.VITE_APP_API_BASEURL+"/api/websocket/" + userId;
        const socketUrl = "wss://saas-api.surveysaas.com/api/websocket/" + userId;

        if (socket.value != null) {
          socket.value.close();
          socket.value = null;
        }
        socket.value = new WebSocket(socketUrl);

        //连接成功,更新消息
        socket.value.onopen = () => {
          reslove()
          toBreakOff.value = true
          init()
        };
        //获得消息事件
        socket.value.onmessage = (msg: any) => {
          const type = msg.data; // 1消息 2待办
          if (Number(type) === 1) {
            getUnreadMessage();
          } else if (Number(type) === 2) {
            getUnreadTodo();
          }
          //发现消息进入,开始处理前端触发逻辑
        };
        // 关闭事件
        socket.value.onclose = (e: any) => {
          if (e && e.code !== 1000) {
            console.error(e)
            reject()//异常关闭-算失败
          } else {
            reslove()//正常关闭（webscoket任务完成）-算成功
          }
          toBreakOff.value = false;
        };

        // 发生错误事件
        socket.value.onerror = async (e: any) => {
          console.error(e)
          reject()
        };

        // 页面大刷新 主动断开连接
        window.addEventListener("beforeunload", () => {
          if (socket.value) {
            disconnect()
          }
        });
      })
    }
    //断开websocket连接
    function disconnect() {
      if (socket.value) {
        socket.value.close(); // 关闭websocket
      }
    }
    // 重连
    const websocketreconnect = throttle(() => {
      if (reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        if (userStore.userId) {
          openSocket(userStore.userId).then(() => {
            reconnectAttempts = 0;
          }).catch(() => {
            websocketreconnect()
          });
        } else {
          ElMessage({
            message: '无法建立连接,请尝试退出重新登录',
            type: 'info',
            plain: true,
          })
        }
      }
      else {
        connectionError()
        reconnectAttempts = 0;
      }
    }, reconnectInterval)
    // 重连不上提示
    function connectionError() {
      ElMessage({
        dangerouslyUseHTMLString: true,
        type: 'error',
        plain: true,
        icon: '',
        customClass: 'message--connectionError',
        duration: 5000,
        showClose: true,
        message: h('p', { class: 'el-message__content' }, [
          h('span', {
            class: 'icon',
            innerHTML: `     <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Frame 3474995">
          <rect width="14" height="14" rx="7" fill="#FFB1B0"/>
          <g id="Frame">
          <path id="Vector" d="M5.03516 7.01013C5.03516 6.86245 5.15493 6.74268 5.30261 6.74268H6.89129C6.96222 6.74268 7.03025 6.77085 7.08041 6.82101C7.13056 6.87117 7.15874 6.9392 7.15874 7.01013C7.15874 7.08106 7.13056 7.14909 7.08041 7.19925C7.03025 7.24941 6.96222 7.27758 6.89129 7.27758H5.30284C5.26772 7.27758 5.23294 7.27067 5.20049 7.25723C5.16804 7.24378 5.13856 7.22408 5.11372 7.19925C5.08889 7.17441 5.06919 7.14493 5.05575 7.11248C5.04231 7.08003 5.03539 7.04525 5.03539 7.01013H5.03516Z" fill="#333333"/>
          <path id="Vector_2" d="M4.26342 5.31823C3.82479 5.32341 3.40589 5.50129 3.09755 5.81329C2.78921 6.1253 2.61629 6.54627 2.61629 6.98493C2.61629 7.42359 2.78921 7.84456 3.09755 8.15657C3.40589 8.46857 3.82479 8.64645 4.26342 8.65163H7.01238V9.18654H4.26342C3.9724 9.18953 3.68367 9.1348 3.41393 9.0255C3.14419 8.9162 2.89881 8.7545 2.69195 8.54977C2.4851 8.34503 2.3209 8.10132 2.20883 7.83272C2.09676 7.56412 2.03906 7.27597 2.03906 6.98493C2.03906 6.69389 2.09676 6.40574 2.20883 6.13714C2.3209 5.86854 2.4851 5.62483 2.69195 5.42009C2.89881 5.21536 3.14419 5.05367 3.41393 4.94437C3.68367 4.83507 3.9724 4.78033 4.26342 4.78332H5.41766V5.31823H4.26319H4.26342ZM9.76134 5.31823H7.27053V4.78332H9.76134C10.0524 4.78033 10.3411 4.83507 10.6108 4.94437C10.8806 5.05367 11.126 5.21536 11.3328 5.42009C11.5397 5.62483 11.7039 5.86854 11.8159 6.13714C11.928 6.40574 11.9857 6.69389 11.9857 6.98493C11.9857 7.27597 11.928 7.56412 11.8159 7.83272C11.7039 8.10132 11.5397 8.34503 11.3328 8.54977C11.126 8.7545 10.8806 8.9162 10.6108 9.0255C10.3411 9.1348 10.0524 9.18953 9.76134 9.18654H9.53343V8.65163H9.76134C9.98187 8.65424 10.2007 8.61305 10.4052 8.53046C10.6097 8.44787 10.7958 8.32552 10.9527 8.17049C11.1095 8.01546 11.2341 7.83085 11.3191 7.62734C11.4041 7.42383 11.4479 7.20548 11.4479 6.98493C11.4479 6.76438 11.4041 6.54603 11.3191 6.34252C11.2341 6.13901 11.1095 5.9544 10.9527 5.79937C10.7958 5.64434 10.6097 5.52199 10.4052 5.4394C10.2007 5.35681 9.98187 5.31562 9.76134 5.31823Z" fill="#333333"/>
          <path id="Vector_3" d="M4.22241 3.32776C4.25034 3.30646 4.28219 3.29086 4.31615 3.28187C4.3501 3.27287 4.3855 3.27065 4.42031 3.27534C4.45513 3.28003 4.48868 3.29153 4.51905 3.30918C4.54942 3.32683 4.57601 3.3503 4.59731 3.37823L9.88243 10.2972C9.90479 10.325 9.92136 10.357 9.93117 10.3913C9.94097 10.4256 9.94381 10.4615 9.93952 10.4969C9.93523 10.5323 9.9239 10.5665 9.90619 10.5975C9.88848 10.6285 9.86474 10.6556 9.83639 10.6773C9.80804 10.6989 9.77564 10.7147 9.7411 10.7237C9.70656 10.7326 9.67058 10.7346 9.63528 10.7294C9.59997 10.7242 9.56606 10.712 9.53553 10.6936C9.50501 10.6751 9.47848 10.6507 9.45753 10.6218L4.17217 3.7029C4.12909 3.64655 4.11016 3.5754 4.11954 3.50509C4.12891 3.43479 4.16583 3.37108 4.22218 3.328L4.22241 3.32776Z" fill="#FD5A58"/>
          </g>
          </g>
          </svg>`},
          ),
          h('span', null, '网络连接失败,请'),
          h('span', null, { innerHTML: `<el-button></el-button>` }),
          h('button', { onClick: websocketreconnect }, '重连!')
        ])
      })
    }
    // 查看websocket状态
    const isItConnected = () => {
      if (!toBreakOff.value) {
        websocketreconnect()
      }
    }
    // 初始获取数据
    function init() {
      getUnreadMessage();
      getUnreadTodo();
    }
    // 获取未读消息数
    async function getUnreadMessage() {
      const res = await api.getTenantMessageList({});
      // 未读消息
      messageList.value = res.data.tenantMessageInfoList.filter(
        (item: any) => item.isReadAlready === 1
      );
      // 已读消息
      readAlreadyMessageList.value = res.data.tenantMessageInfoList.filter(
        (item: any) => item.isReadAlready !== 1
      );
      // 未读的消息数
      message.value = messageList.value.filter(
        (item: any) => item.isReadAlready === 1
      ).length;
      // 未读的消息数
      readAlreadyMessageUnread.value = readAlreadyMessageList.value.filter(
        (item: any) => item.isReadAlready !== 1
      ).length;
    }
    // 获取未读待办数
    async function getUnreadTodo() {
      const res = await api.getTenantAuditList({});
      todoList.value = res.data.tenantAuditInfoList.filter(
        (item: any) => item.auditStatus === 1
      );
      readAlreadyList.value = res.data.tenantAuditInfoList.filter(
        (item: any) => item.auditStatus !== 1
      );
      // 未读的待办数
      todoUnread.value = todoList.value.filter(
        (item: any) => item.isReadAlready === 1
      ).length;
      // 待办
      todo.value = todoList.value.filter(
        (item: any) => item.auditStatus === 1
      ).length;
      // 已办
      readAlreadyUnread.value = readAlreadyList.value.filter(
        (item: any) => item.auditStatus !== 1
      ).length;
    }
    return {
      message,
      todo,
      messageList,
      readAlreadyMessageList,
      readAlreadyMessageUnread,
      todoList,
      readAlreadyList,
      readAlreadyUnread,
      total,
      todoUnread,
      socket,
      auditTypeList,
      toBreakOff,
      getUnreadMessage,
      getUnreadTodo,
      init,
      openSocket,
      disconnect,
      isItConnected,
      websocketreconnect,
    };
  }
);

export default useNotificationStore;
