import React, { useContext, useState, useEffect } from 'react'

/**
 * reducer用来规范state创建流程
 * dispatch用来规范setState的流程包括reduce流程 dispatch是来自react-redux
 *
 * @param {*} state
 */
export const reducer = (state, { type, payload }) => {
  if (type === 'createTag') {
    return {
      ...state,
      tagList: [...(state.tagList || []), payload],
    }
  } else {
    return state
  }
}

// conncet 是由 react-redux提供
// 连接组件和全局状态
export function connect(Component) {
  return (componentProps) => {
    const { state, setState, subscribe } = useContext(AppContext)

    const [, update] = useState({})
    useEffect(() => {
      // 首次渲染，订阅store变化
      // 变化发生的时候通过setState触发connect重新渲染
      subscribe(() => update({}))
    }, [])

    const dispatch = (action) => {
      const newState = reducer(state, action)

      setState(newState)
    }

    return <Component {...componentProps} dispatch={dispatch} state={state} />
  }
}

class Store {
  constructor(initState) {
    this.state = initState
    this.listener = []
  }

  setState = (newState) => {
    store.state = newState
    this.listener.forEach((fn) => fn(newState))
  }

  subscribe = (fn) => {
    this.listener.push(fn)
    return () => {
      this.listener.splice(this.listener.findIndex(fn), 1)
    }
  }
}
export const store = new Store({
  tagList: [],
})
export const AppContext = React.createContext(store)
