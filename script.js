const input = document.querySelector("input");
const keys = document.querySelector(".keys");

const lst = [];

// factorial function
const factorial = function(n) {
  let ans = 1;
  for (let i = 1; i <= n; i++) {
    ans *= i;
  }
  return ans;
}

// Reversing array 
const reverse = function(lst) {
  let l = 0, r = lst.length - 1;
  while (l < r) {
    [lst[l], lst[r]] = [lst[r], lst[l]];
    l++;
    r--;
  }  
}

// Removes last unnecessary zeros from decimal number
const makeShort = function(value) {
  let i = value.length - 1;
  while (value.includes(".") && value[i] == '0') {
    i--;
  }
  if (value[i] == '.') i--;
  return value.slice(0, i + 1);
}

// Converts gradus to radians
const gradToRad = function(grad) {
  return grad * Math.PI / 180;
}

// Calculate removing specific equation for func or simply calculates with proper variable for funcions like sin, cos, tan, sqrt, log
const calculateForFunc = function(func) {
  const last = get();
  if (isNumber(last)) {
    lst.pop();
    let valueCalculated = (func.name == "sin" || func.name == "cos" || func.name == "tan") ? gradToRad(+last) : last;
    add(makeShort("" + func(+valueCalculated).toFixed(8)));
  } else if (last == ')') {
    // Getting all equation covered with brackets
    let balance = 0;
    const lstTemp = [];
    while (balance != 0 || lst.length > 0) {
      const lastElement = get();
      if (lastElement == '(') balance++;
      else if (lastElement == ')') balance--;
      lstTemp.push(lastElement);
      lst.pop();
    }
    reverse(lstTemp);
    try {
      let valueCalculated = eval(lstTemp.join(""));
      // console.log(valueCalculated);
      if (func.name == "sin" || func.name == "cos" || func.name == "tan") {
        valueCalculated = gradToRad(valueCalculated);
        // console.log(valueCalculated);
      }
      valueCalculated = "" + func(valueCalculated).toFixed(8);
      add(makeShort(valueCalculated));
    }
    catch {
      alert("Invalid format for calculation. Try again!");
    }
  } else {
    alert("Invalid format for calculation. Try again!");
  }
}

// input method
const setInput = function() {  
  if (lst.length) {
    const value = lst.join("");
    input.value = value.replaceAll("**", "^").replaceAll("*", "x");
  } else {
    input.value = "0";
  }
  // console.log(input.value);
};

// calculation list methods
const isNumber = function(val) {
  if (!val) return false;
  let valNew = val;
  if (valNew.includes(".")) valNew = valNew.replaceAll(".", "");
  return Number.isInteger(+valNew);
};

const get = function() {
  return lst[lst.length - 1];
};

const add = function(chr) {
  const last = get();
  // console.log(last);
  if (isNumber(last) && isNumber(chr)) {
    if (last == "0" && chr == "0") {
      return;
    } else if (last.includes(".") && chr == ".") {
      return;
    }
    lst[lst.length - 1] += chr;
  } else if (chr == "." && lst.length == 0) {
    lst.push("0.");
  } else {
    lst.push(chr);
  }

  setInput();
};

const pop = function() {
  if (!lst.length) return;
  const last = get();
  if (last.length == 1) {
    lst.pop();
  } else {
    lst[lst.length - 1] = last.slice(0, -1);
  }
  setInput();
}

const clear = function() {
  lst.splice(0, lst.length);
  setInput();
}


// Initialize 0 at the beginning of the calculator
setInput();

keys.addEventListener("click", function(e) {
  const el = e.target;
  const ascii = (el.textContent).charCodeAt(0);

  // 0 to 9 digits pressed
  if (48 <= ascii && ascii <= 57) {
    const digit = String.fromCharCode(ascii);
    add(digit);
  }
  // AC button
  else if (el.classList.contains("green")) {
    clear();
  }
  // CE button 
  else if (el.classList.contains("pink")) {
    pop();
  }
  // + operation
  else if (el.classList.contains("add")) {
    const last = get();
    if (lst.length && last != "+") add("+");
  }
  // - operation
  else if (el.classList.contains("minus")) {
    const last = get();
    if (lst.length && last != "-") add("-");
  } 
  // * operation
  else if (el.classList.contains("mult")) {
    const last = get();
    if (lst.length && last != "*") add("*");
  } 
  // / operation
  else if (el.classList.contains("div")) {
    const last = get();
    if (lst.length && last != "/") add("/");
  } 
  // % operation 
  else if (el.classList.contains("modulo")) {
    const last = get();
    if (lst.length && last != "%") add("%");
  }
  // x^y operation
  else if (el.classList.contains("power")) {
    const last = get();
    if (lst.length && last != "**") add("**");
  }
  // dot adding
  else if (el.classList.contains("dot")) {
    add(".");
  }
  // ( bracket
  else if (el.classList.contains("bracket--open")) {
    add("(");
  }
  // ) bracket
  else if (el.classList.contains("bracket--close")) {
    add(")");
  }
  // ! factorial 
  else if (el.classList.contains("fact")) {
    calculateForFunc(factorial);
  }
  // sin func
  else if (el.classList.contains("sin")) {
    calculateForFunc(Math.sin);
  }
  // cos func
  else if (el.classList.contains("cos")) {
    calculateForFunc(Math.cos); 
  }
  // tan func
  else if (el.classList.contains("tan")) {
    calculateForFunc(Math.tan);
  } 
  // e func
  else if (el.classList.contains("e")) {
    const last = get();
    if (!lst.length || !last.includes(".")) {
      add("" + Math.E);
    }
  }
  // log func
  else if (el.classList.contains("log")) {
    calculateForFunc(Math.log);
  }
  // sqrt func
  else if (el.classList.contains("sqrt")) {
    calculateForFunc(Math.sqrt);
  }
  // PI func
  else if (el.classList.contains("pi")) {
    const last = get();
    if (!lst.length || !last.includes(".")) {
      add("" + Math.PI);
    }
  }
  // = operation
  else if (el.classList.contains("blue")) {
    try {
      let valueCalculated = "" + eval(lst.join(""));
      lst.splice(0, lst.length);
      valueCalculated = makeShort(valueCalculated);
      add(valueCalculated);
    } 
    catch {
      alert("Invalid format for calculation. Try again!");
    }
  }
  console.log(lst);
});