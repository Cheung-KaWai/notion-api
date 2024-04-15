const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function getDatabase() {
  const response = await notion.databases.retrieve({ database_id: process.env.NOTION_DATABASE_ID });
  console.log("hello");
  return response;
}
async function getDatabaseContent() {
  // const response = await notion.databases.query({
  //   database_id: databaseId,
  //   sorts: [
  //     {
  //       property: "Last ordered",
  //       direction: "ascending",
  //     },
  //   ],
  // });
  console.log("hello");
}

module.exports = { getDatabase };
