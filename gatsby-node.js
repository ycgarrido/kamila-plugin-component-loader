const fs = require("fs");
const _ = require(`lodash`);
require = require("esm")(module);

async function onCreateNode({ node, actions, createContentDigest }) {
  const { createNode, createParentChildLink } = actions;
  const fileExtsToProcess = [`js`, `jsx`];
  if (
    !_.includes(fileExtsToProcess, node.extension) ||
    node.name !== "index.component"
  ) {
    return;
  }
  let frontmatter = undefined;
  const content = fs.readFileSync(node.absolutePath, "UTF-8");
  const lastChangeTime = new Date(node.changeTime).getTime();
  const currentTime = new Date().getTime();
  const name = `${currentTime}${Math.random()}`.replace(".", "");
  const path = `${node.dir}/${name}.temp.js`;
  try {
    if (currentTime - lastChangeTime <= 5000) {
      fs.writeFileSync(path, content, "utf8");
      frontmatter = require(path).default;
      fs.unlinkSync(path);
    } else frontmatter = require(node.absolutePath).default;
  } catch (e) {
    console.error(e);
    fs.unlinkSync(path);
  }
  if (_.isArray(frontmatter)) {
    const exportsData = [...frontmatter];
    const contentDigest = createContentDigest(node);

    const nodeData = {
      id: `${node.id} >>> Components`,
      children: [],
      parent: node.id,
      node: { ...node },
      internal: {
        contentDigest,
        type: `Components`
      }
    };

    if (node.internal.type === `File`) {
      nodeData.fileAbsolutePath = node.absolutePath;
    }

    nodeData.components = [...exportsData];
    createNode(nodeData);
    createParentChildLink({ parent: node, child: nodeData });
  }
}

exports.onCreateNode = onCreateNode;
