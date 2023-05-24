function App() {
  const [expression, setExpression] = React.useState("");
  const [answer, setAnswer] = React.useState(0);

  const display = (symbol) => {
    // Check for consecutive operators and negative numbers
    if (/[-+*/]$/.test(expression) && /[-+*/]/.test(symbol)) {
      if (symbol === "-" && !/[-]$/.test(expression)) {
        setExpression((prev) => prev + symbol);
      } else {
        // Check for a minus sign followed by an operator
        if (/[-][+*/]$/.test(expression)) {
          setExpression((prev) => prev.slice(0, -2) + symbol);
        } else {
          setExpression((prev) => prev.slice(0, -1) + symbol);
        }
      }
      return;
    }
    if (
      (symbol === "/" || symbol === "*") &&
      (!expression || /[-+*/]$/.test(expression))
    ) {
      return;
    }
    if (symbol === "." && /\d*\.\d*$/.test(expression)) {
      return;
    }
    if (/[-+*/]$/.test(expression) && /[-+*/]/.test(symbol)) {
      return;
    }
    if (expression[expression.length - 1] === "=" && symbol === ".") {
      return;
    }
    if (symbol === "0" && expression === "") {
      return;
    }
    setExpression((prev) => prev + symbol);
    if (expression[expression.length - 1] === "=") {
      if (/[0-9.]/.test(symbol)) {
        setExpression(symbol);
      } else {
        setExpression(answer + symbol);
      }
    }
  };

  const calculate = () => {
    if (/[^0-9+*/.-]/.test(expression)) {
      setAnswer("Invalid expression");
    } else if (/\/0[^\d]/.test(expression)) {
      setAnswer("Cannot divide by zero");
    } else {
      // Handle the case where the expression ends with an operator
      const lastChar = expression[expression.length - 1];
      if (
        lastChar === "+" ||
        lastChar === "-" ||
        lastChar === "*" ||
        lastChar === "/"
      ) {
        setAnswer(eval(expression.slice(0, -1)));
      } else {
        setAnswer(eval(expression));
      }
    }
    setExpression((prev) => prev + "=");
  };

  const allClear = () => {
    setExpression("");
    setAnswer(0);
  };
  const clear = () => {
    setExpression((prev) =>
      prev
        .split("")
        .slice(0, prev.length - 1)
        .join("")
    );
    setAnswer(0);
  };

  return (
    <div className="container">
      <div className="grid">
        <div id="display" className="dis">
          <input type="text" value={expression} placeholder="0" disabled />
          <div className="total">{answer}</div>
        </div>
        <div onClick={allClear} id="clear" className="padButton AC clear-color">
          AC
        </div>
        <div onClick={clear} id="delete" className="padButton C clear-color">
          C
        </div>
        <div
          onClick={() => display("/")}
          id="divide"
          className="padButton divide"
        >
          /
        </div>
        <div
          onClick={() => display("*")}
          id="multiply"
          className="padButton times"
        >
          x
        </div>
        <div
          onClick={() => display("7")}
          id="seven"
          className="padButton seven numbers-color"
        >
          7
        </div>
        <div
          onClick={() => display("8")}
          id="eight"
          className="padButton eight numbers-color"
        >
          8
        </div>
        <div
          onClick={() => display("9")}
          id="nine"
          className="padButton nine numbers-color"
        >
          9
        </div>
        <div
          onClick={() => display("-")}
          id="subtract"
          className="padButton minus"
        >
          -
        </div>
        <div
          onClick={() => display("4")}
          id="four"
          className="padButton four numbers-color"
        >
          4
        </div>
        <div
          onClick={() => display("5")}
          id="five"
          className="padButton five numbers-color"
        >
          5
        </div>
        <div
          onClick={() => display("6")}
          id="six"
          className="padButton six numbers-color"
        >
          6
        </div>
        <div onClick={() => display("+")} id="add" className="padButton plus">
          +
        </div>
        <div
          onClick={() => display("1")}
          id="one"
          className="padButton one numbers-color"
        >
          1
        </div>
        <div
          onClick={() => display("2")}
          id="two"
          className="padButton two numbers-color"
        >
          2
        </div>
        <div
          onClick={() => display("3")}
          id="three"
          className="padButton three numbers-color"
        >
          3
        </div>
        <div
          onClick={calculate}
          id="equals"
          className="padButton equal numbers-color"
        >
          =
        </div>
        <div
          onClick={() => display("0")}
          id="zero"
          className="padButton zero numbers-color"
        >
          0
        </div>
        <div
          onClick={() => display(".")}
          id="decimal"
          className="padButton dot numbers-color"
        >
          .
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
