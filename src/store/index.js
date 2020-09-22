import Vue from 'vue'
import Vuex from 'vuex'

import { db } from '@/fb'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: false,

        docs: [],
        activeDoc: '',

        reviews: [],
    },
    mutations: {
        CHANGE_LOGIN: (state, value) => {
            state.isLogin = value !== undefined ? value : !state.isLogin
        },

        SET_DOCS: (state, value) => state.docs = value,
        PUSH_DOCS: (state, { value, method = 'push' }) => { console.log('mutation method', method); state.docs[method](value) },
        SET_ACTIVE_DOC: (state, value) => state.activeDoc = value,

        REMOVE_DOC: (state, index) => state.docs.splice(index, 1),
        SAVE_DOC: (state, {doc, index}) => state.docs[index] = doc,

        PUSH_REVIEW: (state, { value, method = 'push' }) => state.reviews[method](value)
    },
    actions: {
        TOGGLE_LOGIN({commit}, value) {
            commit('CHANGE_LOGIN', value)
        },

        GET_DOCS: async ({commit}) => {
            const snapshot = await db.collection('docs').get()
            snapshot.docs.map(doc => {
                const chunk = {
                    ...doc.data(),
                    id: doc.id,
                    uploaded: true,
                }
                // const chunk = doc.data()
                // chunk.id = doc.id
                // chunk.body = chunk.body.replace('\\n', '\n')
                // chunk.published = chunk.published.toDate()
                // this.events.push({ ...chunk })
                commit('PUSH_DOCS', { value: chunk, method: 'push' })
            })
        },

        ADD_NEW_DOC: ({commit, getters}, { doc, method = 'push' }) => {
            console.log('method', method)
            commit('PUSH_DOCS', { value: doc || {
                tag: '', sectionName: '', docs: [], id: (new Date()).getTime(), uploaded: false
            }, method })
            return getters.LAST_DOC
        },
        REMOVE_DOC: ({commit}, index) => commit('REMOVE_DOC', index),
        SAVE_DOC: ({commit}, { doc, index }) => {
            commit('SAVE_DOC', { doc, index })

        },
        GET_DOC: ({state}, index) => state.docs[index],

        GET_REVIEWS: async ({commit}) => {
            const snapshot = await db.collection('reviews').orderBy("published", "desc").get()
            snapshot.docs.map(doc => {
                const chunk = doc.data()
                chunk.text = chunk.text.replace('\\n', '\n')
                chunk.published = chunk.published.toDate()

                commit('PUSH_REVIEW', { value: chunk, method: 'push' })
            })
        }
    },
    getters: {
        LOGIN_STATE(state) {
            return state.isLogin
        },

        DOCS_STATE: state => state.docs,
        ACTIVE_DOC_STATE: state => state.activeDoc,
        ACTIVE_DOC_INDEX: state => state.docs.findIndex(x => x.tag === state.activeDoc),

        // GET_DOC: (state, index) => state.docs[index],
        LAST_DOC: state => state.docs[state.docs.length - 1],

        REVIEWS_STATE: state => state.reviews
    }
})