const getREM = (width) => {
    if (width >= 1600) return 16;
    else if (width >= 1200) return 14;
    else return 12;
}

const formatInt = n => {
    if (n < 1000) return `${n}`;
    if (n < 1000000) return `${~~(n / 1000)}k`;
    return `${~~(n / 1000000)}m`;
}

const convertNode = (node) => node ? [...convertNode(node.parent), node.entry.attributes['qualified name']] : [];

const findNode = (root, [first, ...rest]) => {
    if (root.entry.name === 'all') {
        if (rest.length === 0) return null;
        else return findNode(root.children[rest[0]], rest);
    }
    if (first === root.entry.attributes['qualified name']) {
        if (rest.length === 0) return root;
        else return findNode(root.children[rest[0]], rest);
    } else return null;
}

export { getREM, formatInt, convertNode, findNode };