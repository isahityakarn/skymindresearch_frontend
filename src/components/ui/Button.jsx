export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const baseStyles = 'btn d-inline-flex align-items-center justify-content-center';

  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-outline-light',
    ghost: 'btn-link text-white',
  };

  const sizeStyles = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
    xl: 'btn-lg',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant] ?? variantStyles.primary} ${sizeStyles[size] ?? ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
