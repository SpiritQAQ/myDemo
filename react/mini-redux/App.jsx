import React, { useState } from 'react'

import TagBuilder from './components/TagBuilder'
import TagList from './components/TagList'
import Another from './components/Another'

import { store, AppContext } from './redux'

const App = () => {
  return (
    <AppContext.Provider value={store}>
      <TagBuilder />
      <br />

      <Another />

      <TagList />
    </AppContext.Provider>
  )
}

export default App
