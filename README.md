# Notion API
This project is a notion-api server that is hosted via vercel in order to retrieve the data from my notion account and integrate it with my frontend application.
Creating my proxy server that serves as an intermediary between the Notion API and my frontend is needed to bypass the CORS error that I receive when trying to make request directly to the Notion API.
Another reason is to restructure the data that are provided via the Notion API and ommit all the unnecesairy data
