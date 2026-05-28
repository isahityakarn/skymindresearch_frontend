export default function TextArea({ className = '', ...props }) {
  return (
    <textarea
      className={`form-control ${className}`.trim()}
      {...props}
    />
  );
}
