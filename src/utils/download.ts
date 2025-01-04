import useUserStore from "@/store/modules/user";
const userStore = useUserStore();
export default // 下载
async function DownLoad(imgUrl: any, name: any) {
  const response = await fetch(imgUrl,{
    method: 'GET',
    headers: {
      'Authorization': userStore.token  // 添加 Token 到请求头
    }
  });
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  // 根据需要设置文件名
  document.body.appendChild(link);
  link.download = name;
  link.click();
  document.body.removeChild(link);
  // 清理URL对象
  URL.revokeObjectURL(url);
}
