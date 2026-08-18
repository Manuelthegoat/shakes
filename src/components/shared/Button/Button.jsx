import "./Button.css";

function Button({ children, variant = "primary", as = "button", ...props }) {
  const Component = as; // lets us render as <button> or <a>

  return (
    <Component className={`btn btn--${variant}`} {...props}>
      {children}
    </Component>
  );
}

export default Button;