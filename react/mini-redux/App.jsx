import React, { useState } from 'react'

import TagBuilder from './components/TagBuilder'
import TagList from './components/TagList'
import UserList from './components/UserList'

import { store, AppContext } from './redux'

const App = () => {
  return (
    <AppContext.Provider value={store}>
      <TagBuilder />
      <br />

      <UserList />

      <TagList />
    </AppContext.Provider>
  )
}

export default App
