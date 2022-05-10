import React, { useContext } from 'react'
import useSWR from 'swr'
import { connect } from '../redux/index'

const TagList = ({ tag }) => {
  // const { data, error } = useSWR(`http://localhost:3000/getTag`, (url) =>
  //   fetch(url).then((res) => res.json())
  // )

  const { tagList } = tag

  return tagList.map((tag) => {
    return <p key={tag}>{tag}</p>
  })
}
export default connect(({ tag }) => ({ tag }))(TagList)
