import {  useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'

import './TodoForm.css'
import TextAreaField from '../TextAreaField'

export default function TodoForm({ submitHandler, submitText, todo }) {
  const [fileField, setFileField] = useState('')


  const NewTodoSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Title must be 3 characters at minimum')
      .required('Title is required'),
    description: Yup.string()
      .min(3, 'Description must be 3 characters at minimum')
      .max(120, 'Description must be 3 characters at maximum')
      .required('Description is required'),
  })

  const submit = (values, { resetForm }) => {
    values.file = fileField
    submitHandler(values, todo?.id)
    if (!todo) {
      resetForm({ values: '' })
    }
  }

  const chooseFile = (event) => {
    const { files } = event.target
    if (!files?.length) {
      return
    }
    const file = files[0]
    setFileField(file)
  }

  return (
    <Formik
      initialValues={{
        title: todo?.title || '',
        description: todo?.description || '',
        completion: todo?.completion || dayjs().format('YYYY-MM-DD'),
        file: fileField?.name || '',
      }}
      validationSchema={NewTodoSchema}
      onSubmit={submit}
    >
      {({ touched, errors, isSubmitting, values }) => (
        <Form className="form">
          <div className="form__group">
            <label htmlFor="title">Title:&nbsp;</label>
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="Enter title"
            />
            <ErrorMessage component="small" name="title" className="error" />
          </div>
          <div className="form__group">
            <TextAreaField
              label="Description:"
              id="description"
              name="description"
              placeholder="Enter description"
            />
          </div>
          <div className="form__group">
            <label htmlFor="completion">Date of completion:&nbsp;</label>
            <Field id="completion" type="date" name="completion" />
          </div>
          <div className="form__group">
            <label htmlFor="file" className="form__file-label button">
              {!fileField ? 'Choose file' : fileField.name}
            </label>
            <Field
              type="file"
              name="file"
              id="file"
              accept="image/*,.pdf, .doc, audio/*"
              className="form__file-input"
              onChange={chooseFile}
            />
          </div>
          <div className="form__group">
            <button type="submit" className="button">
              {submitText}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
