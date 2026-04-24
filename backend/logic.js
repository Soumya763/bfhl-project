function isValidEdge(str) {
  if (!str || typeof str !== "string") return false;
  str = str.trim();

  const regex = /^[A-Z]->[A-Z]$/;
  if (!regex.test(str)) return false;

  const [parent, child] = str.split("->");
  if (parent === child) return false;

  return true;
}

function processData(data) {
  let invalid = [];
  let duplicate = [];
  let seen = new Set();
  let edges = [];

  for (let item of data) {
    let trimmed = item.trim();

    if (!isValidEdge(trimmed)) {
      invalid.push(item);
      continue;
    }

    if (seen.has(trimmed)) {
      if (!duplicate.includes(trimmed)) duplicate.push(trimmed);
      continue;
    }

    seen.add(trimmed);
    edges.push(trimmed);
  }

  let graph = {};
  let childSet = new Set();

  for (let e of edges) {
    let [p, c] = e.split("->");

    if (!graph[p]) graph[p] = [];
    graph[p].push(c);

    childSet.add(c);
  }

  let roots = Object.keys(graph).filter(node => !childSet.has(node));

  function dfs(node, visited, stack) {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    stack.add(node);

    let children = graph[node] || [];
    for (let child of children) {
      if (dfs(child, visited, stack)) return true;
    }

    stack.delete(node);
    return false;
  }

  function buildTree(node) {
    let obj = {};
    let children = graph[node] || [];

    for (let child of children) {
      obj[child] = buildTree(child);
    }

    return obj;
  }

  function getDepth(node) {
    let children = graph[node] || [];
    if (children.length === 0) return 1;

    let max = 0;
    for (let child of children) {
      max = Math.max(max, getDepth(child));
    }

    return max + 1;
  }

  let hierarchies = [];
  let totalTrees = 0;
  let totalCycles = 0;
  let maxDepth = 0;
  let largestRoot = "";

  for (let root of roots) {
    let visited = new Set();
    let stack = new Set();

    let hasCycle = dfs(root, visited, stack);

    if (hasCycle) {
      totalCycles++;
      hierarchies.push({
        root,
        tree: {},
        has_cycle: true
      });
    } else {
      let tree = {};
      tree[root] = buildTree(root);

      let depth = getDepth(root);
      totalTrees++;

      if (depth > maxDepth || (depth === maxDepth && root < largestRoot)) {
        maxDepth = depth;
        largestRoot = root;
      }

      hierarchies.push({
        root,
        tree,
        depth
      });
    }
  }

  return {
    hierarchies,
    invalid_entries: invalid,
    duplicate_edges: duplicate,
    summary: {
      total_trees: totalTrees,
      total_cycles: totalCycles,
      largest_tree_root: largestRoot
    }
  };
}

module.exports = { processData };