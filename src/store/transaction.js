import { defineStore } from "pinia";

export const useTransactionStore = defineStore({
  id: "transaction",
  state: () => {
    return {
      transactions : []
    }
  },
  actions: {
    addTransaction(transaction) {
      //generate id
      transaction.id = Math.random().toString(36).substr(2, 9)
      // created date
      transaction.created = new Date()
      this.transactions.push(transaction)
    }
  }
});
