const db = require('../db/connection');

// Ambil argumen dari command line
const action = process.argv[2]; // create / delete
const entityName = process.argv[3]; // nama tabel

if (!action || !entityName) {
  console.log("⚠️ Usage: node entities/entityManager.js <create|delete> <table_name>");
  process.exit(1);
}

if (action === 'create') {
  createEntity(entityName);
} else if (action === 'delete') {
  deleteEntity(entityName);
} else {
  console.log("❌ Invalid action. Use 'create' or 'delete'.");
  process.exit(1);
}

function createEntity(name) {
  const query = `
    CREATE TABLE IF NOT EXISTS ${name} (
      id INT AUTO_INCREMENT PRIMARY KEY
    );
  `;
  db.query(query, (err, result) => {
    if (err) {
      console.error('❌ Error creating table:', err);
      db.end();
      return;
    }
    console.log(`✅ Table '${name}' created successfully.`);
    db.end();
  });
}

function deleteEntity(name) {
  const query = `DROP TABLE IF EXISTS ${name};`;
  db.query(query, (err, result) => {
    if (err) {
      console.error('❌ Error deleting table:', err);
      db.end();
      return;
    }
    console.log(`🗑️ Table '${name}' deleted successfully.`);
    db.end();
  });
}
