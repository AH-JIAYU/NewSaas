import type { App } from "vue";
import type { SpinkitProps } from "./index.vue";
import Component from "./index.vue";

let instance: App<Element>;
let mountNode: HTMLElement;

function loadingShow(options: SpinkitProps, mountNode?: any) {
  instance = createApp(Component, options as any);
  if (!mountNode) {
    mountNode = document.createElement("div");
    mountNode.setAttribute("uid", String(instance._uid));
  }
  document.body.appendChild(mountNode);
  instance.mount(mountNode);
}

function loadingHide(mountNode?: any) {
  instance?.unmount();
  document.body.removeChild(mountNode);
}

export { loadingShow, loadingHide, mountNode };
