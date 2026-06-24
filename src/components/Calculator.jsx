import useCalculator from '../hooks/useCalculator';
import Display from './Display';
import Button from './Button';
import './Calculator.css';

/* Mapa de botões — facilita manutenção */
const BUTTONS = [
  { label: 'AC', variant: 'ac', action: 'clear' },
  { label: '+/-', variant: 'ac', action: 'toggleSign' },
  { label: '%', variant: 'ac', action: 'percent' },
  { label: '÷', variant: 'op', op: '/' },
  { label: '7', variant: 'num', num: '7' },
  { label: '8', variant: 'num', num: '8' },
  { label: '9', variant: 'num', num: '9' },
  { label: '×', variant: 'op', op: '*' },
  { label: '4', variant: 'num', num: '4' },
  { label: '5', variant: 'num', num: '5' },
  { label: '6', variant: 'num', num: '6' },
  { label: '−', variant: 'op', op: '-' },
  { label: '1', variant: 'num', num: '1' },
  { label: '2', variant: 'num', num: '2' },
  { label: '3', variant: 'num', num: '3' },
  { label: '+', variant: 'op', op: '+' },
  { label: '0', variant: 'num', num: '0', wide: true },
  { label: ',', variant: 'num', action: 'dot' },
  { label: '=', variant: 'eq', action: 'calculate' },
];

const Calculator = () => {
  const calc = useCalculator();

  const handleClick = (btn) => {
    if (btn.num) calc.inputNum(btn.num);
    if (btn.op) calc.inputOp(btn.op);
    if (btn.action === 'clear') calc.clear();
    if (btn.action === 'toggleSign') calc.toggleSign();
    if (btn.action === 'percent') calc.percent();
    if (btn.action === 'dot') calc.inputDot();
    if (btn.action === 'calculate') calc.calculate();
  };

  return (
    <div className="calculator">
      <Display value={calc.display} expression={calc.expression} />
      <div className="calculator__grid">
        {BUTTONS.map((btn) => (
          <Button
            key={btn.label + (btn.op || '')}
            label={btn.label}
            variant={btn.variant}
            wide={btn.wide}
            active={btn.op && btn.op === calc.operator}
            onClick={() => handleClick(btn)}
          />
        ))}
      </div>
      <p className="calculator__badge">DIO · React Challenge</p>
    </div>
  );
};

export default Calculator;
