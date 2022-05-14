import React, { useRef, createRef, useState } from 'react'

import { Button, Modal } from 'antd'
import BasicModal from './BasicModal.tsx'
import { useBasicModal } from './useBasicModal'

export default () => {
  const [num, setNum] = useState(1)

  const [Modal1, showModal1] = useBasicModal()
  const [Modal2, showModal2] = useBasicModal()

  const handleClick1 = () => {
    // modal1.current.show()
    showModal1()
  }

  const handleClick2 = () => {
    showModal2()
  }

  return (
    <>
      {num}
      <Button onClick={handleClick1}>弹窗1</Button>
      <Button onClick={handleClick2}>弹窗2</Button>
      <Modal1>Im modal1, Number is {num} now</Modal1>
      <Modal2>
        Im modal2, <Button onClick={() => setNum(num + 1)}>+1</Button>
      </Modal2>
    </>
  )
}
