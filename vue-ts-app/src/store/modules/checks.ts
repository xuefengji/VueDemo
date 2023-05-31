import type { MutationTree, ActionTree, GetterTree} from "vuex";
import type { State } from '../index'
import http from "@/utils/axios";

interface ApplyList {
    [index: string] : unknown
}

export interface ChecksState {
    applyList: ApplyList[]
    checkList: ApplyList[]
}

const state: ChecksState = {
    applyList: [],
    checkList: []
}
const mutations: MutationTree<ChecksState> = {
    updateApplyList (state, payload) {
        state.applyList = payload
    },
    updateCheckList (state, payload) {
        state.checkList = payload
    }
}
const actions: ActionTree<ChecksState, State> = {
    getApplyList (content, payload) {
        return http.get('/checks/apply', payload)
    },
    postApply (content, payload) {
        return http.post('/checks/apply', payload)
    }
}
const getters: GetterTree<ChecksState, State> = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}