// imports
const { getByCursor } = require("../database/postgres/postgresOperator.js");
const { connect, disconnect } = require("../database/mongo/mongoose.js");
const mo = require("../database/mongo/mongoOperator.js");
const Logger = require("../lib/Logger.js");

const importRegisters = async () => {
  const query = `
    SELECT id, nome, cep, uf, municipio, bairro, endereco, complemento, numero, data_atualizacao 
    = require(pessoas 
    ORDER BY id
  `;
  const res = await getByCursor(query);

  await connect();

  Logger.trace(`data geted by postgres db ${res.length}`);
  await mo.manyInsert("coordenates", res);
  Logger.trace("data saved in mongo db");

  await disconnect();

  return true;
};

importRegisters();
