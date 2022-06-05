import React from 'react'
import { RecoilRoot, atom } from 'recoil'

import Content from './components/Content'
import Form from './components/Form'

interface GridConfig {
  amount: number
}

const gridConfigDefault: GridConfig = {
  amount: 12,
  // row: 2,
  // col: 2,
}

export const gridConfig = atom({
  key: 'gridConfig',
  default: gridConfigDefault,
})

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <div className="p-4">
        <Form />
        <Content />
      </div>
    </RecoilRoot>
  )
}

export default App
