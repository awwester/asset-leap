import React from 'react';

export default (props) => {
  console.log('class namem...', props)
  return (
    <div className={`dashboard-header mb-4 ${props.className || ""}`}>
      {props.children}
    </div>
  )
}
