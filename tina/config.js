import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "stories",
        label: "Stories",
        path: "stories",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            name: "layout",
            label: "Layout",
            type: "string",
            defaultItem: {
              label: "Story",
              value: "story.html",
            },
            options: [
              { label: "Default", value: "default.html" },
              { label: "Story", value: "story.html" },
            ]
          },
          {
            name: 'date',
            label: 'Date',
            type: 'datetime',
            defaultItem: new Date().toISOString(),
          },
          {
            name: "pinOrder",
            label: "Pin Order",
            type: "number",
          },
          {
            name: "coverImage",
            label: "Image",
            type: "image",
            description: "Image for the story",
          },
          {
            name: "description",
            label: "Description",
            type: "rich-text",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      }, 
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",
        fields: [
          {
            name: "title",
            type: "string",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            name: "layout",
            label: "Layout",
            type: "string",
            options: [
              { label: "Default", value: "default.html" },
              { label: "Story", value: "story.html" },
            ]
          },
          {
            name: "permalink",
            label: "Permalink",
            type: "string",
            description: "URL path for the page (e.g., /about)",
          },
        ],
      },
    ],
  },
});
