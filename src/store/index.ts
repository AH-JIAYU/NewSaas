import { getActivePinia } from 'pinia';

const pinia = createPinia()


// 因为状态管理使用的是setup的方式构建所以我们重写一个$reset并挂载到pinia中
pinia.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state));
  store.$reset = () => {
    store.$patch(initialState);
  }
})
// 重置pinia
export const resetPinia = () => {
  const getActive: any = getActivePinia();
  const stores = getActive._s; // 获取所有 storen
  stores.forEach((item: any) => {
    try{
      item.$reset(); // 重置每个 store 的状态
    }catch{
    }
  });
}


export default pinia
