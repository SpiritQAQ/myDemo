import React, { useContext, useState } from 'react'

import { connect } from '../redux/index'

const TagBuilder = ({ dispatch }) => {
  const [tagName, setTagName] = useState('')

  const handleInputChange = (e) => {
    setTagName(e.target.value)
  }

  const handleCreateTag = () => {
    if (!tagName) return alert('error, empty')

    dispatch({
      type: 'createTag',
      payload: tagName,
    })
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

export default connect(({ tag }) => ({ tag }))(TagBuilder)
