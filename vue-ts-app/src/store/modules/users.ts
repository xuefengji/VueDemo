import type { MutationTree, ActionTree, GetterTree} from "vuex";
import type { State } from '../index'
import http from "@/utils/axios";

export interface UsersState {
    token: string
}

const state: UsersState = {
    token: ''
}

const mutations: MutationTree<UsersState> = {
    updateToken(state, paylod){
        state.token = paylod
    }
}
const actions: ActionTree<UsersState, State> = {
    login(context, payload){
        return http.post('/users/login', payload)
    }
}
const getters: GetterTree<UsersState, State> = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}