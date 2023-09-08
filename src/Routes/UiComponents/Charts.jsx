import React from 'react'

export default function Charts({title,chartName}) {
  return (
    <div className="chart">
    <div className="title">
      {title}
    </div>
    {chartName}
  </div>
  )
}
