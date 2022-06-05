import React from 'react'

import { useRecoilState } from 'recoil'

import { gridConfig } from '../../App'

const Form = () => {
  const [theGridConfig, setTheGridConfig] = useRecoilState(gridConfig)

  const { amount } = theGridConfig

  const handleAmountChanged = (num: number) => {
    setTheGridConfig({
      ...theGridConfig,
      amount: num,
    })
  }

  return (
    <div className="flex space-x-2 mb-5">
      <span>数量:</span>
      <input
        type="number"
        className="border border-solid border-black w-10"
        value={amount}
        onChange={e => handleAmountChanged(+e.target.value)}
      />
      {/* <input className="bg"/> */}
    </div>
  )
}

export default Form
