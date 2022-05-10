import React, { useContext, useState } from 'react'

import { connect } from '../redux/index'

const TagBuilder = ({ add }) => {
  const [tagName, setTagName] = useState('')

  const handleInputChange = (e) => {
    setTagName(e.target.value)
  }

  const handleCreateTag = () => {
    if (!tagName) return alert('error, empty')

    add(tagName)
  }

  return (
    <div style={{ display: 'flex' }}>
      <input value={tagName} onChange={handleInputChange} />
      <button style={{ marginLeft: 8 }} onClick={handleCreateTag}>
        New Tag
      </button>
    </div>
  )
}

export default connect(
  // mapStateToProps
  ({ tag }) => ({ tag }),
  // mapDispatchToProps
  (dispatch) => {
    return {
      add: (newTag) =>
        dispatch({
          type: 'createTag',
          payload: newTag,
        }),
    }
  }
)(TagBuilder)
