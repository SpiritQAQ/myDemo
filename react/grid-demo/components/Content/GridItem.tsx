import * as React from 'react'

export interface IGridItemProps {
  color: string
  index: number
}

export default function GridItem(props: IGridItemProps) {
  const { index, color } = props

  return (
    <div className=" h-20 flex items-center	justify-center	" style={{ backgroundColor: color }}>
      <span className="text-center text-2xl font-bold text-white">{index}</span>
    </div>
  )
}
