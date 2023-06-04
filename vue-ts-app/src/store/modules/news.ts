import type { MutationTree, ActionTree, GetterTree} from "vuex";
import type { State } from '../index'
import http from "@/utils/axios";

interface Info {
    [index: string]: unknown
}
export interface NewsState {
    info: Info
}

const state: NewsState = {
    info: {}
}
const mutations: MutationTree<NewsState> = {
    updateInfo(state, payload){
        state.info = payload
    }
}
const actions: ActionTree<NewsState, State> = {
    getRemind(content, payload){
        return http.get('news/remind', payload)
    },
    putRemind(content, payload) {
        return http.put('news/remind', payload)
    }
}
const getters: GetterTree<NewsState, State> = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}