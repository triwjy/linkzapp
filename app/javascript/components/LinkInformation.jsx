import { Button, Link } from '@material-ui/core'
import './styles/LinkInformation.css'
import React from 'react'

const LinkInformation = (props) => {
  const { values } = props

  const handleClick = () => {
    console.log(values);
  }
  return (
    <>
      <div className="title-text" style={{ textTransform: 'capitalize' }}>
        <h1>
          {values.name}
        </h1>
      </div>
      <div className="description-text">
        <h2>
          {values.description}
        </h2>
      </div>
      <div className="btn-open">
        <Link href={`http://${values.hyperlink}`} target='_blank'>
          <Button color="primary" variant="contained" onClick={handleClick}>Open Application
          </Button>
        </Link>
      </div>
    </>
  )
}

export default LinkInformation
