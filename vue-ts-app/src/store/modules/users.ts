import type { MutationTree, ActionTree, GetterTree} from "vuex";
import type { State } from '../index'

export interface UsersState {

}

const state: UsersState = {}
const mutations: MutationTree<UsersState> = {}
const actions: ActionTree<UsersState, State> = {}
const getters: GetterTree<UsersState, State> = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}