import React, { useState } from 'react'

import TagBuilder from './components/TagBuilder'
import TagList from './components/TagList'
import UserList from './components/UserList'

import { Provider, createStore } from './redux'

const reducer = (state, { type, payload }) => {
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

const store = createStore(reducer, {
  tag: {
    tagList: [],
  },
  user: {
    userList: ['User1', 'User2'],
  },
})

const App = () => {
  return (
    <Provider store={store}>
      <TagBuilder />
      <br />

      <UserList />

      <TagList />
    </Provider>
  )
}

export default App
