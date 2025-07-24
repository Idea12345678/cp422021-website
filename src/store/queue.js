import { defineStore } from "pinia";
import { call, db } from "@/firebase"

export const useQueueStore = defineStore({
  id: "queue",
  state: () => {
    return {
      loading: false,
      queues : [
        
      ]
    }
  },
  actions: {
    async fetchQueues(){
      this.loading = true
      let res = await call("listQueues", {});
      if(res.success){
        this.queues = res.data
      }
      this.loading = false
    },    
    async enqueue(data){
      this.loading = true
      let res = await call("enqueue", data);
      if(res.success){
        this.queues.push(data)
      }
      this.loading = false
    },
    async dequeue(data){
      this.loading = true
      let res = await call("dequeue", data);
      if(res.success){
        this.queues = this.queues.filter(queue => queue.name !== data.name)
      }
      this.loading = false
    },
  }
});
