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
  useCallback,
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
  const payloadRef = useRef<Payload>({})

  useImperativeHandle(ref, () => {
    return {
      show: () => setVisible(true),
      close: () => setVisible(false),
    }
  })

  const { xxx, submitLoading, title, children, innerRef } = props

  useEffect(() => {
    // if (!ref.current) ref.current = {}
    // const lastShow = ref.current.show
    // ref.current.show = (payload: Payload = {}) => {
    //   setVisible(true)
    //   payloadRef.current = payload
    // }
    // return () => {
    //   ref.current.show = lastShow
    // }
  }, [])
}

// const TheModal = RefModal as ModalType

export const useBasicModal = () => {
  const [visible, setVisible] = useState(false)

  const modalRef = useRef()

  const show = () => setVisible(true)

  const wrapWithClose = (method?: () => void) => () => {
    setVisible(false)
    method && method()
  }

  const BasicModal = useCallback((props) => {
    const { onOk, onCancel, title, children } = props
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={wrapWithClose(onOk)}
        onCancel={wrapWithClose(onCancel)}
      >
        {children}
      </Modal>
    )
  }, [])
  return [BasicModal, show]
}

// export default forwardRef(TheModal)
