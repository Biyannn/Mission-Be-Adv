const db = require('../db/connection');

function deleteFields(tableName, fieldName) {
  const sql = `ALTER TABLE ${tableName} DROP COLUMN ${fieldName}`;
  db.query(sql, (err) => {
    if (err) console.log(`❌ Gagal menghapus field:`, err.sqlMessage);
    else
      console.log(
        `✅ Field '${fieldName}' berhasil dihapus dari table '${tableName}'`
      );
  });
}

const args = process.argv.slice(2);

deleteFields(args[0], args[1], args[2]);

// contoh manual pemanggilan 
// node fields/deleteFields.js table_name field_name 
// node fields/addFields.js user name 

module.exports = deleteFields;