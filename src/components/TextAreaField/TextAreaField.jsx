import { useField, ErrorMessage } from 'formik'
export default function TextAreaField({ label, ...props }) {
  const [field, meta] = useField(props)

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className={props.className} {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorMessage
          component="small"
          name={props.name}
          className="error"
        />
      ) : null}
    </>
  )
}
