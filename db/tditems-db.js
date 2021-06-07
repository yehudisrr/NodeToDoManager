const sql = require('mssql/msnodesqlv8');

const sqlConfig = {
    database: 'ToDoManager',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}

const getIncompleteTditems = async () => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query('SELECT td.*, c.Name FROM Categories c JOIN ToDos td ON c.Id = td.CategoryId WHERE td.CompletedDate IS NULL');
    return recordset;
}

const getCompletedTditems = async () => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query('SELECT td.*, c.Name FROM Categories c JOIN ToDos td ON c.Id = td.CategoryId WHERE td.CompletedDate IS NOT NULL');
    return recordset;
}

const getCategories = async () => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query('SELECT * FROM Categories');
    return recordset;
}
const getCategoryById = async id => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query`SELECT * FROM Categories WHERE Id = ${id}`;
    return recordset[0];
}

const getByCategoryId = async id => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query`SELECT td.*, c.Name FROM Categories c JOIN ToDos td ON c.Id = td.CategoryId WHERE td.CategoryId = ${id}`;
    return recordset;
}

const markAsCompleted = async ({id}) => {
    await sql.connect(sqlConfig);
    await sql.query`UPDATE ToDos SET CompletedDate = getDate() WHERE Id = ${id}`;
}
const updateCategory = async ({name, id}) => {
    await sql.connect(sqlConfig);
    await sql.query`UPDATE Categories SET Name = ${name} WHERE Id = ${id}`;
}

const addItem = async ({ title, dueDate, categoryId}) => {
    await sql.connect(sqlConfig);
    await sql.query`INSERT INTO ToDos (Title, DueDate, CategoryId) 
    VALUES (${title}, ${dueDate}, ${categoryId})`;
}
const addCategory = async ({ name }) => {
    await sql.connect(sqlConfig);
    await sql.query`INSERT INTO Categories 
    VALUES (${name})`;
}

module.exports = {
    getIncompleteTditems,
    getCompletedTditems,
    getCategories,
    updateCategory,
    addItem,
    addCategory,
    markAsCompleted,
    getCategoryById,
    getByCategoryId
}