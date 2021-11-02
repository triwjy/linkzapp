import React, { useState } from 'react'
import LinkDefault from './LinkDefault'
import LinkInformation from './LinkInformation'

const MainMenu = (props) => {
  const { reset } = props

  if (reset) {
    return <LinkDefault />
  }
  return <LinkInformation values={props.values} />
}

export default MainMenu
