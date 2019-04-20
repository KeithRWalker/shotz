const printToDom = (div, text) => {
  const selectedDiv = document.getElementById(div);
  selectedDiv.innerHTML = text;
};

export default { printToDom };
