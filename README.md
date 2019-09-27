# gatsby-transformer-javascript-frontmatter

Parses Stories files to extract content.

## Install

`npm install --save-dev @kamila-lab/component-loader`

## How to use

To use this plugin you also need [gatsby-source-filesystem](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-filesystem) installed and configured.

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./.stories/`
      }
    },
    "@kamila-lab/component-loader"
  ]
};
```
