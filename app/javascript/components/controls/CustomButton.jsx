import { Button, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    margin: "8px"
  },
  label: {
    textTransform: "none"
  }
}))

export default function CustomButton(props) {
  const classes = useStyles()

  const { text, size, color, variant, onClick, ...other } = props
  return (
    <Button
      size={size || "large"}
      color={color || "primary"}
      variant={variant || "contained"}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >{text}</Button>
  )
}
