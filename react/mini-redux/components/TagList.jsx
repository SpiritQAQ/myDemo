import React, { useContext } from 'react'
import useSWR from 'swr'
import { connect } from '../redux/index'

const TagList = ({ tag, dispatch }) => {
  const { data, error, loading } = useSWR(
    `http://localhost:3000/getTag`,
    (url) => fetch(url).then((res) => res.json()),
    {
      onSuccess: (data) => {
        const newTagList = data.data.map((tag) => tag.name)

        dispatch({
          type: 'setTagList',
          payload: newTagList,
        })
      },
    }
  )
  if (loading) return 'loading'
  if (error) return <>{JSON.stringify(error)}</>

  const { tagList } = tag

  return tagList.map((tag) => {
    return <p key={tag}>{tag}</p>
  })
}
export default connect(({ tag }) => ({ tag }))(TagList)
