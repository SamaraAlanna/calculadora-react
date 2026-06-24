import { useState } from 'react';

const useCalculator = () => {
  const [current, setCurrent] = useState('0');
  const [prev, setPrev] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingNext, setWaitingNext] = useState(false);
  const [expression, setExpression] = useState('');

  const symbols = { '/': '÷', '*': '×', '-': '−', '+': '+' };

  /* Formata número para exibição */
  const format = (val) => {
    if (val === 'Erro') return 'Erro';
    const str = parseFloat(parseFloat(val).toPrecision(10)).toString();
    return str.replace('.', ',');
  };

  const inputNum = (n) => {
    if (waitingNext) {
      setCurrent(n);
      setWaitingNext(false);
    } else {
      setCurrent((prev) => (prev === '0' && n !== '.' ? n : prev.length < 12 ? prev + n : prev));
    }
  };

  const inputDot = () => {
    if (waitingNext) {
      setCurrent('0.');
      setWaitingNext(false);
      return;
    }
    setCurrent((c) => (c.includes('.') ? c : c + '.'));
  };

  const inputOp = (op) => {
    if (operator && !waitingNext) {
      /* encadeia operação sem precisar apertar = */
      const a = prev;
      const b = parseFloat(current);
      let result;
      switch (operator) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          result = b !== 0 ? a / b : null;
          break;
        default:
          result = b;
      }
      const res = result === null ? 'Erro' : parseFloat(result.toPrecision(10)).toString();
      setCurrent(res);
      setPrev(parseFloat(res));
    } else {
      setPrev(parseFloat(current));
    }
    setOperator(op);
    setWaitingNext(true);
    setExpression(`${parseFloat(current)} ${symbols[op]}`);
  };

  const calculate = () => {
    if (operator === null || prev === null) return;
    const a = prev;
    const b = parseFloat(current);
    let result;
    switch (operator) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '*':
        result = a * b;
        break;
      case '/':
        result = b !== 0 ? a / b : null;
        break;
      default:
        result = b;
    }
    const res = result === null ? 'Erro' : parseFloat(result.toPrecision(10)).toString();
    setExpression(`${a} ${symbols[operator]} ${b} =`);
    setCurrent(res);
    setOperator(null);
    setPrev(null);
    setWaitingNext(true);
  };

  const clear = () => {
    setCurrent('0');
    setPrev(null);
    setOperator(null);
    setWaitingNext(false);
    setExpression('');
  };

  const toggleSign = () => setCurrent((c) => (parseFloat(c) * -1).toString());

  const percent = () => setCurrent((c) => (parseFloat(c) / 100).toString());

  return {
    display: format(current),
    expression,
    operator,
    inputNum,
    inputDot,
    inputOp,
    calculate,
    clear,
    toggleSign,
    percent,
  };
};

export default useCalculator;
