import React, { useContext, useState, useEffect } from 'react'
import _ from 'lodash'
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
      tag: {
        ...state.tag,
        tagList: [...(state.tag.tagList || []), payload],
      },
    }
  } else {
    return state
  }
}

// conncet 是由 react-redux提供
// 连接组件和全局状态
// 通过seletor可以实现组件只在自己的数据变化时渲染
// ===========
// 为什么connect要分开两次调用 => connect(mapStateToProps, mapDispatchToProps)(组件)
// 是为了第一步可以封装,直接调用connectToTag(TagList)
export const connect = (selector, mapDispatchToProps) => (Component) => {
  return (componentProps) => {
    const { state, setState, subscribe } = useContext(AppContext)

    const data = selector ? selector(state) : state

    const [, update] = useState({})
    useEffect(() => {
      // 首次渲染，订阅store变化
      // 变化发生的时候通过setState触发connect重新渲染
      subscribe(() => {
        const newData = selector ? selector(store.state) : store.state
        // 判断命名空间内数据是否变化，来控制是否重新渲染
        if (!_.isEqual(data, newData)) {
          update({})
          // console.log('update')
        }
      })
      // 如果seletor变化，会造成重复订阅
    }, [selector])

    const dispatch = (action) => {
      const newState = reducer(state, action)

      setState(newState)
    }

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
  tag: {
    tagList: [],
  },
  user: {
    userList: ['User1', 'User2'],
  },
})
export const AppContext = React.createContext(store)
