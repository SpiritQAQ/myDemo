import React, { useContext } from 'react'
import { connect } from '../redux/index'

const Another = ({ state }) => {
  console.log('Another rendered', 'state', state)
  return <> im fw</>
}
export default Another
