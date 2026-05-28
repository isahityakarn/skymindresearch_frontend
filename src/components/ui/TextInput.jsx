export default function TextInput({ className = '', ...props }) {
  return (
    <input
      className={`form-control ${className}`.trim()}
      {...props}
    />
  );
}
