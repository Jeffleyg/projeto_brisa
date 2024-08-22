import getStatistics from "./statistics";

function formatDateBackend(date) {
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();
  return `${ano}-${mes}-${dia}`;
}

function formatValue(value) {
  return parseFloat(value).toLocaleString("pt-BR");
}

async function search(initialDate, finalDate) {
  $("#btnFiltrarGeral").attr("disabled", "disabled");
  $("#btnFiltrarGeral").addClass("loading");

  const person = JSON.parse(sessionStorage.getItem("personInfo"));

  const statistics = await getStatistics(
    person.id,
    formatDateBackend(initialDate),
    formatDateBackend(finalDate),
  );

  document.getElementById("nome").innerHTML = "Informações de " + person.nome;
  document.getElementById("bairro").value = person.bairro;
  document.getElementById("cidade").value = person.cidade;

  document.getElementById("venda").innerHTML = "R$ " +
    (!statistics.totaVendas ? 0 : formatValue(statistics.totaVendas));
  document.getElementById("maiorVendaCliente").innerHTML = "R$ " +
    (!statistics.maiorVenda ? 0 : formatValue(statistics.maiorVenda));
  document.getElementById("faturamentoTotal").innerHTML = "R$ " +
    (!statistics.totalFaturamento
      ? 0
      : formatValue(statistics.totalFaturamento));
  document.getElementById("ticketMedio").innerHTML = "R$ " +
    (!ticketMedio ? 0 : formatValue(statistics.ticketMedio));
  document.getElementById("produtoMaisVendido").innerHTML = statistics
      .produtosMaisVendidos.length
    ? statistics.produtosMaisVendidos[0].produto
    : " - ";
  document.getElementById("valorProduto").innerHTML = statistics
      .produtosMaiorValor.length
    ? statistics.produtosMaiorValor[0].produto
    : " - ";

  sessionStorage.setItem(
    "produtosMaisVendidos",
    JSON.stringify(statistics.produtosMaisVendidos),
  );
  sessionStorage.setItem(
    "produtosMaiorValorVendido",
    JSON.stringify(statistics.produtosMaiorValor),
  );

  $("#btnFiltrarGeral").removeClass("loading");
  $("#btnFiltrarGeral").removeAttr("disabled");
}

// fazer a busca inicial ao carregar a página
const initialDate = new Date();
initialDate.setMonth(initialDate.getMonth() - 1);
const finalDate = new Date();
search(initialDate, finalDate);

// buscar ao clicar no botão de filtro da tela
const filterButton = document.getElementById("btnFiltrarGeral");
filterButton.addEventListener("click", () => {
  const initialDateStr = $("#dataInicial").val().split("/");
  const finalDateStr = $("#dataFinal").val().split("/");

  const initialDate = new Date(
    initialDateStr[2],
    initialDateStr[1] - 1,
    initialDateStr[0],
  );
  const finalDate = new Date(
    finalDateStr[2],
    finalDateStr[1] - 1,
    finalDateStr[0],
  );

  search(initialDate, finalDate);
});
