const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
const propDate = process.env.NOTION_DATE_ID;

async function getDatabase() {
  const response = await notion.databases.retrieve({ database_id: process.env.NOTION_DATABASE_ID });
  return response;
}
async function getDatabaseContent() {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: propDate,
        direction: "descending",
      },
    ],
  });
  const data = response.results.map((page) => page.id);
  return data;
}

async function getPageContent(pageId) {
  const props = await notion.pages.retrieve({ page_id: pageId });
  const content = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });
  const response = {
    props,
    content,
  };
  return response;
}

module.exports = { getDatabase, getDatabaseContent, getPageContent };
