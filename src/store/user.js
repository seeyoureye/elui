const state ={
    userid:'',//基础的 userid
    setUserRolesId:'',//用于设置用户权限的 id
}

const mutations={
    GETID(state,id){
        state.userid = id
    },
    SETROLES(state,id){
        state.setUserRolesId = id
    }
}

const actions = {
    getId({commit},id){
        commit('GETID',id)
    },
    setroles({commit},id){
        commit('SETROLES',id)
    }
}

const getters = {
    getUserId(state){
        return state.userid
    },
    setRolesId(state){
        return state.setUserRolesId
    }
}
// 暴露
export default  {
    state,
    mutations,
    actions,
    getters
}
