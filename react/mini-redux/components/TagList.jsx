import React, { useContext } from 'react'
import useSWR from 'swr'
import { connect } from '../redux/index'

const TagList = ({ state }) => {
  // const { data, error } = useSWR(`http://localhost:3000/getTag`, (url) =>
  //   fetch(url).then((res) => res.json())
  // )

  const { tagList = [] } = state
  return tagList.map((tag) => {
    return <p key={tag}>{tag}</p>
  })
}
export default connect(TagList)
