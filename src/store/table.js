import { call, db } from "@/firebase"

export const useTableStore = defineStore({
  id: "table",
  state: () => {
    return {
      loading: false,
      tables : [
      ]
    }
  },
  actions: {
    async addTable(data){
      this.loading = true
      let res = await call("addTable", data);
      if(res.success){
        this.tables.push(data)
      }
      this.loading = false      
    },
    async fetchTables(){
      this.loading = true
      let res = await call("listTables", {});
      if(res.success){
        this.tables = res.data
      }
      this.loading = false
    },
    async reserveTable(data){
      this.loading = true
      let res = await call("reserveTable", data);
      if(res.success){
        const table = this.tables.find(table => table.name === data.name)
        if(table){
          table.status = "reserved"
        }
      }
      this.loading = false
    },

    addFood(tablename, food) {
      const table = this.tables.find(table => table.name === tablename)
      if(table){
        const index = table.foods.findIndex(item => item.name === food.name)
        if(index === -1){
          table.foods.push({...food, quantity: food.quantity})
        }else{
          table.foods[index].quantity += food.quantity;
        }
        //calculate total
        table.total = table.foods.reduce((acc, item) => acc + item.price * item.quantity, 0)
      }
    },

    clearTable(tablename) {
      const table = this.tables.find(table => table.name === tablename)
      table.checkin = ""
      table.checkout = ""
      table.total = 0
      table.users = 0
      table.status = "ready"
      table.foods = []
    }
  }
});
