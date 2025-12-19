const db = require("../db/connection");

function addFields(tableName, fieldName, dataType) {
  const sql = `ALTER TABLE ${tableName} ADD COLUMN ${fieldName} ${dataType};`;
  db.query(sql, (err) => {
    if (err) console.log(`❌ Gagal menambah field:`, err.sqlMessage);
    else
      console.log(
        `✅ Field '${fieldName}' (${dataType}) berhasil ditambahkan ke table '${tableName}'`
      );
  });
}

const args = process.argv.slice(2);

addFields(args[0], args[1], args[2]);

// contoh manual pemanggilan 
// node fields/addFields.js table_name field_name "data type"
// node fields/addFields.js user name "data type"


module.exports = addFields;
