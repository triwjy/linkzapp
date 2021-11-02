import React, { useState, useEffect } from 'react'
import AddNewLink from './AddNewLink'
import AppLinks from './AppLinks'

const SideMenu = (props) => {
  const [update, setUpdate] = useState(false);
  const [values, setValues] = useState({})

  const getValues = (newValues) => {
    props.getValues(newValues)
  }

  const handleReset = () => { props.handleReset() }
  const handleShowInformation = () => { props.handleShowInformation() }

  useEffect(() => {
    getValues(values)
  }, [update])

  const handleUpdate = () => {
    setUpdate(p => !p)
  }

  return (
    <div>
      <AddNewLink
        handleUpdate={handleUpdate}
        handleReset={handleReset}
        handleShowInformation={handleShowInformation}
      />
      <AppLinks
        handleUpdate={handleUpdate}
        is_update={update}
        getValues={(values) => { getValues(values) }}
        handleReset={handleReset}
        handleShowInformation={handleShowInformation}
      />
    </div>
  )
}

export default SideMenu
