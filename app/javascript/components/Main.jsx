import React, { useEffect, useState } from 'react'
import SideMenu from './SideMenu'
import MainMenu from './MainMenu'
import './styles/Main.css'
import { Paper } from '@material-ui/core'

const Main = () => {
  const [values, setValues] = useState({})
  const [reset, setReset] = useState(true)

  const handleReset = () => {
    setReset(true)
  }

  const handleShowInformation = () => {
    setReset(false)
  }


  const getValues = (newValues) => {
    setValues(newValues)
  }

  return (
    <>
      <div className="mainContainer">
        <Paper elevation={2} square className="sideMenu">
          <SideMenu
            getValues={(values) => { getValues(values) }}
            handleReset={handleReset}
            handleShowInformation={handleShowInformation} />
        </Paper>
        <Paper elevation={3} square className="mainMenu">
          <MainMenu
            values={values}
            reset={reset} />
        </Paper>
      </div>
    </>
  )
}

export default Main
