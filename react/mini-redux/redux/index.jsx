import React, { useContext, useState, useEffect } from 'react'
import _ from 'lodash'
/**
 * reducer用来规范state创建流程
 * dispatch用来规范setState的流程包括reduce流程 dispatch是来自react-redux
 *
 */

let state = {}
let reducer = undefined
let listener = []
const setState = (newState) => {
  state = newState
  listener.forEach((fn) => fn(newState))
}

const store = {
  getState: () => state,

  dispatch: (action) => {
    const newState = reducer?.(state, action)
    setState(newState)
  },

  subscribe: (fn) => {
    listener.push(fn)
    return () => {
      listener.splice(listener.findIndex(fn), 1)
    }
  },
}

// conncet 是由 react-redux提供
// 连接组件和全局状态
// 通过seletor可以实现组件只在自己的数据变化时渲染
// ===========
// 为什么connect要分开两次调用 => connect(mapStateToProps, mapDispatchToProps)(组件)
// 是为了第一步可以封装,直接调用connectToTag(TagList)
export const connect = (selector, mapDispatchToProps) => (Component) => {
  return (componentProps) => {
    const { subscribe, dispatch } = store

    const data = selector ? selector(state) : state

    const [, update] = useState({})
    useEffect(() => {
      // 首次渲染，订阅store变化
      // 变化发生的时候通过setState触发connect重新渲染
      subscribe(() => {
        const newData = selector ? selector(state) : state
        console.log(
          '🚀 ~ file: index.jsx ~ line 51 ~ subscribe ~ newData',
          newData
        )

        // 判断命名空间内数据是否变化，来控制是否重新渲染
        if (!_.isEqual(data, newData)) {
          update({})
          console.log('update')
        }
      })

      // 如果seletor变化，会造成重复订阅
    }, [selector])

    const thePropsFromMapDispatch = mapDispatchToProps
      ? mapDispatchToProps(dispatch)
      : {}

    return (
      <Component
        {...componentProps}
        dispatch={dispatch}
        {...data}
        {...thePropsFromMapDispatch}
      />
    )
  }
}

export const createStore = (_reducer, initState) => {
  reducer = _reducer
  state = initState
  return store
}
export const AppContext = React.createContext(null)

export const Provider = ({ store, children }) => {
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>
}
