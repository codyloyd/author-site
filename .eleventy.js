const {format} = require('date-fns');
const { parse } = require('node-html-parser');

// .eleventy.js
module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("public")
  eleventyConfig.addPassthroughCopy({"public/favicon": "/favicon"})
  eleventyConfig.addPassthroughCopy({"public/images": "/images"})
  eleventyConfig.addPassthroughCopy({"public/admin": "/admin"});

  eleventyConfig.addCollection("stories", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./stories/*.md").sort((a, b) => {
      const orderA = a.data.pinOrder;
      const orderB = b.data.pinOrder;

      // If both have pinOrder, sort by it
      if (Number.isInteger(orderA) && Number.isInteger(orderB)) {
        return orderA - orderB;
      }

      // If only A has pinOrder, A comes first
      if (Number.isInteger(orderA)) {
        return -1;
      }

      // If only B has pinOrder, B comes first
      if (Number.isInteger(orderB)) {
        return 1;
      }

      // If neither have pinOrder, sort by date (newest first)
      return new Date(b.data.date) - new Date(a.data.date);
    });
  });

  // Add the readableDate filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return format(dateObj, 'MMMM d, yyyy'); // You can customize the date format
  });  

  eleventyConfig.addFilter("getFirstWords", (content, description) => {
    const wordCount = 40; // Number of words to extract
    if (description) {
      return description;
    }
    try {
      const parsed = parse(content);
      const textContent = parsed.textContent; // Get the text content of the entire HTML
      const words = textContent.trim().split(/\s+/); // Split by whitespace (including newlines)
      const previewWords = words.slice(0, wordCount).join(' '); // Get the first 'wordCount' words
      return previewWords + (words.length > wordCount ? '...' : ''); // Add "..." if truncated
    } catch (error) {
      console.error("Error parsing HTML or extracting words:", error);
      return '';
    }
  });

  return {
    dir: {
      input: ".",      // Root directory for input files
      output: "_site", // Directory where Eleventy will output the generated site
      includes: "_includes", // (Optional, for other include files)
      layouts: "_layouts",   // Directory for layout files
      data: "_data" // Directory for data files
    }
  };
};