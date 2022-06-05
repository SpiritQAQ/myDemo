import { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { gridConfig } from '../../App'

import GridItem, { IGridItemProps } from './GridItem'

import { getRandomColor } from '../../utils/color'

type GridItemProps = {}

const Content = () => {
  const [theGridConfig] = useRecoilState(gridConfig)
  const { amount } = theGridConfig

  const itemsObject = useMemo(() => {
    return new Array(amount).fill(amount).map((_, i) => {
      return {
        color: getRandomColor(),
        index: i + 1,
      }
    })
  }, [amount])

  const contentStyle = {
    display: 'grid',
    // gridTemplateColumns: 'auto',
    // gridTemplateRows: 'repeat(, 100px)',
    gridTemplateColumns: 'repeat(5, 1fr)',

    // gap
    gridRowGap: '12px',
    gridColumnGap: '12px',

    // justifyItems: 'stretch',
  }

  return (
    <>
      <div style={contentStyle}>
        {itemsObject.map(item => (
          <GridItem {...item} key={item.index} />
        ))}
      </div>
      <div>{JSON.stringify(contentStyle)}</div>
    </>
  )
}

export default Content
