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

export { getREM, formatInt };