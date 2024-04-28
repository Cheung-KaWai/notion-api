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
  const data = response.results.map((page) => ({ id: page.id, props: page.properties }));
  return data;
}

async function getListOfArticles() {
  const data = await getDatabaseContent();
  const props = data.map((row) => {
    return {
      id: row.id,
      createDate: row.props["Created time"].created_time,
      lastEdit: row.props["Last edited time"].last_edited_time,
      category: row.props["Category"].multi_select[0].name,
      title: row.props["Article Title"].title[0].plain_text,
    };
  });
  return props;
}

async function getArticleContnet(pageId) {
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

module.exports = { getDatabase, getDatabaseContent, getArticleContnet, getListOfArticles };
