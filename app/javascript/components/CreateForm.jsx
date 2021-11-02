import axios from 'axios'
import React from 'react'
import CustomButton from './controls/CustomButton'
import MultiLineTextInput from './controls/MultiLineTextInput'
import TextInput from './controls/TextInput'
import { useForm, CustomForm } from './useForm'

const initialValues = {
  name: '',
  hyperlink: '',
  description: ''
}

function CreateForm(props) {

  const validate = (fieldValues = values) => {
    let validation_message = { ...errors }
    if ('name' in fieldValues)
      validation_message.name = fieldValues.name ? "" : "Name cannot be blank"
    if ('hyperlink' in fieldValues)
      validation_message.hyperlink = fieldValues.hyperlink ? "" : "Link cannot be blank"

    setErrors({ ...validation_message })

    if (fieldValues == values)
      return Object.values(validation_message).every(message => message == '')
  }

  const { values, setValues, errors, setErrors, handleChange } = useForm(initialValues, true, validate)

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      const csrfToken = document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

      axios.post('/api/v1/linkapps.json', values)
        .then(resp => {
          console.log(`post succeed`);
          props.handleUpdate()
          props.handleReset()
        })
        .catch(resp => console.log(resp))

      props.handleCloseModal()
      setValues(initialValues)
    }
  }

  return (
    <CustomForm onSubmit={handleSubmit}>
      <TextInput
        label='Application Name'
        name='name'
        value={values.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextInput
        label='Link'
        name='hyperlink'
        value={values.hyperlink}
        onChange={handleChange}
        error={errors.hyperlink}
      />
      <MultiLineTextInput
        minRows={2}
        maxRows={5}
        label='Description'
        name='description'
        value={values.description}
        onChange={handleChange}
      />
      <div >
        <CustomButton
          text="Cancel"
          variant="outlined"
          onClick={props.handleCloseModal}
        />
        <CustomButton
          text="Create"
          type="submit"
        />
      </div>
    </CustomForm>
  )
}

export default CreateForm
