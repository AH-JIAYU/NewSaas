import useUserStore from "@/store/modules/user";
import Message from "vue-m-message";

const useNotificationStore = defineStore(
  // 唯一ID
  "notification",
  () => {
    // 消息
    const message = ref(0);
    // 待办
    const todo = ref(0);
    // 总计
    const total = computed(() => message.value + todo.value);

    const socket = ref<any>();
    const maxReconnectAttempts = 2; // 重连超出该次数就放弃重连
    let reconnectAttempts = 0; // 重连次数
    const reconnectInterval = 3000; // 连接间隔
    const userStore = useUserStore();

    function openSocket(userId: any) {
      // console.log("调用websocket");
      const socketUrl = "ws://47.96.98.102:9100/websocket/" + userId;
      if (socket.value != null) {
        socket.value.close();
        socket.value = null;
      }
      socket.value = new WebSocket(socketUrl);
      //获得消息事件
      socket.value.onmessage = (msg: any) => {
        const type = msg.data; // 1消息 2待办
        console.log("type", type);
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
        // console.log("websocket发生了错误");
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
          // console.log(`第${reconnectAttempts}次重连`);
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
    function getUnreadMessage() {
      // 为方便演示，这里直接写死的未读数
      message.value = 2;
    }
    // 获取未读待办数
    function getUnreadTodo() {
      // 为方便演示，这里直接写死的未读数
      todo.value = 1;
    }

    return {
      message,
      todo,
      total,
      socket,
      init,
      openSocket,
    };
  }
);

export default useNotificationStore;
