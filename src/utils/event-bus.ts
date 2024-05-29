// event-bus.ts
import { reactive } from 'vue';

interface EventBus {
  listeners: Record<string, Function[]>;
  $on(event: string, callback: Function): () => void;
  $off(event: string, callback: Function): void;
  $emit(event: string, ...args: any[]): void;
}

const eventBus: EventBus = reactive({
  listeners: {},

  // 订阅事件
  $on(event: string, callback: Function): () => void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);

    // 返回取消订阅的函数
    return () => {
      this.$off(event, callback);
    };
  },

  // 取消订阅
  $off(event: string, callback: Function): void {
    if (!this.listeners[event]) return;
    const index = this.listeners[event].indexOf(callback);
    if (index !== -1) {
      this.listeners[event].splice(index, 1);
    }
  },

  // 发布
  $emit(event: string, ...args: any[]): void {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(callback => {
      callback(...args);
    });
  }
});

export default eventBus;
