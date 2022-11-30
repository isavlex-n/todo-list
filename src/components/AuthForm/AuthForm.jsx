import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
export default function AuthForm({ title, submit }) {

  const AuthSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email entered incorrectly')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol')
      .required('Password is required'),
  })

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={AuthSchema}
      onSubmit={submit}
    >
      {() => (
        <Form>
          <div className="form__group">
            <label htmlFor="title">Email:&nbsp;</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
            />
            <ErrorMessage component="small" name="email" className="error" />
          </div>
          <div className="form__group">
            <label htmlFor="title">Password:&nbsp;</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
            />
            <ErrorMessage component="small" name="pass" className="error" />
          </div>
          <div className="form__group">
            <button type="submit" className="button">
              {title}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
