import React, { useContext } from 'react'
import { connect } from '../redux/index'

const UserList = ({ user }) => {
  console.log(' UserList ~ UserList render', user)
  const { userList } = user

  return (
    <>
      {userList.map((user) => (
        <span> {user} |</span>
      ))}
    </>
  )
}
export default connect(({ user }) => ({
  user,
}))(UserList)
