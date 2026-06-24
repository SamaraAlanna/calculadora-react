import './Button.css';

const Button = ({ label, onClick, variant = 'num', wide = false, active = false }) => {
  return (
    <button
      className={`btn btn--${variant} ${wide ? 'btn--wide' : ''} ${active ? 'btn--active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
