import { loadingHide, loadingShow } from "@/components/SpinkitLoading/index"; //加载
// 获取数据loading
export async function obtainLoading(apiFunction: any) {
  const mountNode = document.createElement("div");
  try {
    mountNode.setAttribute("uid", String(Math.floor(Math.random() * 5)));
    // 显示加载动画
    loadingShow(
      {
        type: "circle-fade",
        size: 50,
        color: "#fff",
        text: "数据加载中……",
      },
      mountNode
    );
    // 执行传入的 API 函数
    const res = await apiFunction;
    // 隐藏加载动画
    loadingHide(mountNode);
    return res;
  } catch (error) {
    // 隐藏加载动画
    loadingHide(mountNode);
  }
}
// 提交数据loading
export async function submitLoading(apiFunction: any) {
  const mountNode = document.createElement("div");
  try {
    mountNode.setAttribute("uid", String(Math.floor(Math.random() * 5)));
    // 显示加载动画
    loadingShow(
      {
        type: "circle-fade",
        size: 50,
        color: "#fff",
        text: "提交数据中……",
      },
      mountNode
    );
    const res = await apiFunction;
    // 隐藏加载动画
    loadingHide(mountNode);
    return res;
  } catch (error) {
    // 隐藏加载动画
    loadingHide(mountNode);
  }
}
