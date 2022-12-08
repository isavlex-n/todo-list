import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { v4 } from 'uuid'
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'

import './TodoForm.css'
import TextAreaField from '../TextAreaField'
import { storage } from '../../firebase'

export default function TodoForm({ submitHandler, submitText, todo }) {
  const [fileField, setFileField] = useState(null)
  const [fileLink, setFileLink] = useState('')


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
    values.file = fileLink
    submitHandler(values, todo?.id)

    if (!todo) {
      setFileField(null)
      resetForm({ values: '' })
    }
  }

  const chooseFile = (event) => {
    const { files } = event.target
    if (!files?.length) {
      return
    }
    const file = files[0]
    setFileField((prev) => file)
    const imageRef = ref(storage, `images/${file.name + v4()}`)
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileLink(() => url)
      })
    })
  }

  return (
    <Formik
      initialValues={{
        title: todo?.title || '',
        description: todo?.description || '',
        completion:
          todo?.completion || dayjs().add(1, 'day').format('YYYY-MM-DD'),
      }}
      validationSchema={NewTodoSchema}
      onSubmit={submit}
    >
      {() => (
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
            <label htmlFor={`file-${Date.now()}`} className="form__file-label button">
              {!fileField ? 'Choose file' : fileField.name}
            </label>
            <input
              type="file"
              name="file"
              id={`file-${Date.now()}`}
              accept="image/*"
              className="form__file-input"
              onChange={chooseFile}
            />
            {todo?.file && (
              <a href={todo.file} target="blank">
                Download
              </a>
            )}
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
