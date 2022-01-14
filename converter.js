//Declarar as variáveis chamando elas do html
const label_from_currency = document.getElementById('from_currency');
const input_from_ammount = document.getElementById('from_ammount');

const label_to_currency = document.getElementById('to_currency');
const input_to_ammount = document.getElementById('to_ammount');

const tax_info = document.getElementById('tax_info');
const swap = document.getElementById('swap');

//Adiciono eventos para as variáveis

label_from_currency.addEventListener('change', calculate);
input_from_ammount.addEventListener('input', calculate);

label_to_currency.addEventListener('change', calculate);
input_to_ammount.addEventListener('input', calculate);

swap.addEventListener('click', infoSwap);

main();

//Função principal do conversor
function main() {
  let currency = { "BRL": "Real R$", "EUR": "Euro €", "USD": "Dollar $","GBP": "Libra" };
  let options = [];
  for (var [key, value] of Object.entries(currency)) {
    options.push(`<option value='${key}'>${value}</option>`);
  }

  label_from_currency.innerHTML = options.join('\n');
  label_to_currency.innerHTML = options.join('\n');
  calculate();
}

//Função de troca das moedas
function infoSwap() {
  let temp = label_from_currency.value;
  label_from_currency.value = label_to_currency.value;
  label_to_currency.value = temp;
  calculate();
}

//Função auxiliar 1
async function getURL(url) {
  return (await fetch(url)).json();
}

//Função auxiliar 2
function getInfoSelect(select) {
  return select.options[select.selectedIndex].text;
}
//Fução que pegar os valores da api calula o novo valor da cotação
async function calculate() {
  let from = label_from_currency.value;
  let to = label_to_currency.value;
  let { rates } = await getURL(`https://api.exchangerate-api.com/v4/latest/${from}`);
  let rate = rates[to];
  input_to_ammount.value = (input_from_ammount.value * rate).toFixed(2);
}