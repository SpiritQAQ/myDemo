/*
 * @Author: your name
 * @Date: 2021-01-09 15:12:51
 * @LastEditTime: 2021-01-26 14:40:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /ProjextYAdminWeb/src/components/CustomModal/RefModal.tsx
 */
import React, {
  memo,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'
import { Modal, Button } from 'antd'

type Payload = {
  onOk?(): void
  onCancel?(): void
  [others: string]: any
}

type IProps = {
  xxx: any
  submitLoading?: boolean
  title: string
}

type ModalType = React.NamedExoticComponent<IProps> & {
  show(payload: Payload): void
}

const RefModal: React.FC<IProps> = (props: IProps, ref) => {
  console.log('🚀 ~ file: BasicModal.tsx ~ line 30 ~ ref', ref)
  const [visible, setVisible] = useState(false)
  const payloadRef = useRef<Payload>({})

  // useImperativeHandle(ref, () => {
  //   return {
  //     show: () => setVisible(true),
  //     close: () => setVisible(false),
  //   }
  // })

  const { xxx, submitLoading, title, children, innerRef } = props

  useEffect(() => {
    if (!ref.current) ref.current = {}
    const lastShow = ref.current.show
    ref.current.show = (payload: Payload = {}) => {
      setVisible(true)
      payloadRef.current = payload
    }
    return () => {
      ref.current.show = lastShow
    }
  }, [])

  const wrapWithClose = (method?: () => void) => () => {
    setVisible(false)
    method && method()
  }

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={wrapWithClose(payloadRef.current.onOk)}
      onCancel={wrapWithClose(payloadRef.current.onCancel)}
    >
      {children}
    </Modal>
  )
}

const TheModal = RefModal as ModalType

// TheModal.show = (payload: Payload) => console.log('RefModal is not mounted.')

// export default forwardRef(RefModal)
export default forwardRef(TheModal)
