import useUserStore from "@/store/modules/user";
import Message from "vue-m-message";
import api from "@/api/modules/notification";

const useNotificationStore = defineStore(
  // 唯一ID
  "notification",
  () => {
    // 消息
    const message = ref(0);
    const messageList = ref<any>([]);

    // 待办
    const todo = ref(0);
    const todoList = ref<any>([]);
    // 总计
    const total = computed(() => message.value + todo.value);

    const auditTypeList = ["合作邀约"];//消息类型

    const socket = ref<any>();
    const maxReconnectAttempts = 2; // 重连超出该次数就放弃重连
    let reconnectAttempts = 0; // 重连次数
    const reconnectInterval = 3000; // 连接间隔
    const userStore = useUserStore();

    function openSocket(userId: any) {
      const socketUrl = "ws://47.96.98.102:9100/websocket/" + userId;
      if (socket.value != null) {
        socket.value.close();
        socket.value = null;
      }
      socket.value = new WebSocket(socketUrl);
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
      //关闭事件
      socket.value.onclose = (e: any) => {
        // 异常关闭重新连接
        if (e && e.code !== 1000) {
          websocketreconnect();
        }
      };
      //发生了错误事件
      socket.value.onerror = () => {
        websocketreconnect();
      };

      // 页面大刷新 主动断开连接
      window.addEventListener("beforeunload", () => {
        if (socket.value) {
          socket.value.close(); // 关闭websocket
          socket.value.onclose(); // 关闭websocket
        }
      });
    }

    // 重新连接
    function websocketreconnect() {
      console.error("websocket连接异常，请稍候重试");
      if (reconnectAttempts < maxReconnectAttempts) {
        setTimeout(function () {
          socket.value = null;
          reconnectAttempts++;
          userStore.userId && openSocket(userStore.userId);
        }, reconnectInterval);
      } else {
        console.error("重连失败！请稍后重试");
      }
    }

    function init() {
      getUnreadMessage();
      getUnreadTodo();
    }
    // 获取未读消息数
    async function getUnreadMessage() {
      const res = await api.getTenantMessageList({});
      messageList.value = res.data.tenantMessageInfoList;
      // 未读的消息数
      message.value = messageList.value.filter(
        (item: any) => item.isReadAlready === 1
      ).length;
    }
    // 获取未读待办数
    async function getUnreadTodo() {
      const res = await api.getTenantAuditList({});
      todoList.value = res.data.tenantAuditInfoList;
      // 未读的待办数
      todo.value = todoList.value.filter(
        (item: any) => item.isReadAlready === 1
      ).length;
    }

    return {
      message,
      todo,
      messageList,
      todoList,
      total,
      socket,
      auditTypeList,
      getUnreadMessage,
      getUnreadTodo,
      init,
      openSocket,
    };
  }
);

export default useNotificationStore;
