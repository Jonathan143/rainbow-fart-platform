import { defineStore, acceptHMRUpdate } from 'pinia'
import { UserState } from './interface'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: '',
    username: '',
  }),

  getters: {},

  actions: {
    updateUserInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
