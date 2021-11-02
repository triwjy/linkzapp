import { TextField } from '@material-ui/core'
import React from 'react'

export default function MultiLineTextInput(props) {
  const { minRows, maxRows, label, name, value, onChange } = props
  return (
    <TextField
      variant='outlined'
      multiline
      minRows={minRows}
      maxRows={maxRows}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}
