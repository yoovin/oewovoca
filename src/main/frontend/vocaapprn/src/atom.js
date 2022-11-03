import {atom} from 'recoil'

// 날짜
export const date = atom({
    key: 'date',
    default: ''
})

export const today = atom({
    key: 'today',
    default: ''
})

//user id
export const userid = atom({
    key: 'userid',
    default:''
})

export const chain = atom({
    key: 'chain',
    default: 0
})

export const goal = atom({
    key: 'goal',
    default: 0
})

export const mno = atom({
    key: 'mno',
    default:''
})

export const hno = atom({
    key: 'hno',
    default:''
})

// 시험보는용도의 voca
export const voca = atom({
    key: 'voca',
    default: []
})

// 시험채점결과
export const vocaresult = atom({
    key: 'vocaresult',
    default: []
})