import { loadingHide, loadingShow } from "@/components/SpinkitLoading/index"; //加载

// 获取数据loading
export async function obtainLoading(apiFunction: any) {
  // 显示加载动画
  loadingShow({
    type: "circle-fade",
    size: 50,
    color: "#fff",
    text: "数据加载中……",
  });
  // 执行传入的 API 函数
  const res = await apiFunction;
  // 隐藏加载动画
  loadingHide();
  return res;
}
// 提交数据loading
export async function submitLoading(apiFunction: any) {
  // 显示加载动画
  loadingShow({
    type: "circle-fade",
    size: 50,
    color: "#fff",
    text: "提交数据中……",
  });
  const res = await apiFunction;
  // 隐藏加载动画
  loadingHide();
  return res;
}
