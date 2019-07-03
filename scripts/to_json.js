const SQL = require('sql-template-strings');
const sqlite = require('sqlite');
const path = require('path');
const fs = require('fs-extra');

const databasePath = path.resolve(__dirname, '../database/garbage.sqlite')
const jsonFilePath = path.resolve(__dirname, '../garbage.json');

async function main() {
  const db = await sqlite.open(databasePath);

  await db.all(
    SQL`SELECT
          *
        FROM
          Garbage`
  ).then((res) => {
    return fs.writeFile(jsonFilePath, JSON.stringify(res))
  }, (e) => {
    console.log(e.message);
  });
}

main();
