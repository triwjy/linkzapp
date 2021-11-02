import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'

export function useForm(initialValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = e => {
    e.preventDefault()
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
    if (validateOnChange) {
      validate({ [name]: value })
    }
  }

  return {
    values,
    errors,
    setErrors,
    setValues,
    handleChange
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: '8px'
    }
  }
}))

export function CustomForm(props) {

  const classes = useStyles()
  const { children, ...other } = props
  return (
    <form className={classes.root} {...other}>
      {children}
    </form>
  )
}
