import { createStore, useStore as baseUseStore } from 'vuex'
import type { Store } from 'vuex'
import users from './modules/users'
import checks from './modules/checks'
import signs from './modules/signs'
import news from './modules/news'
import type  { UsersState } from './modules/users'
import type  { ChecksState } from './modules/checks'
import type  { SignsState } from './modules/signs'
import type  { NewsState } from './modules/news'
import type  { InjectionKey } from "vue";
import VuexPersistence from 'vuex-persist'

export interface State {

}

export interface StateAll extends State {
  users: UsersState
  checks: ChecksState,
  signs: SignsState,
  news: NewsState
}
//本地持久化
const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
  //保存想要保存的值
  reducer: (state) => ({token: (state as StateAll).users.token})

})

export const key: InjectionKey<Store<StateAll>> = Symbol()

export function useStore() {
  return baseUseStore(key)
}

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users,
    checks,
    signs,
    news
  },
  plugins: [vuexLocal.plugin]   //Use it as Vue plugin
})
