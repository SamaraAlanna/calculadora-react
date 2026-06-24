import './Display.css';

const Display = ({ value, expression }) => {
  const fontSize = value.length > 9 ? '1.6rem' : value.length > 6 ? '2.2rem' : '3rem';

  return (
    <div className="display">
      <span className="display__expression">{expression}</span>
      <span className="display__value" style={{ fontSize }}>
        {value}
      </span>
    </div>
  );
};

export default Display;
