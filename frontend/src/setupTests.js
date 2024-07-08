const originalError = console.error;
console.error = (...args) => {
  if (/(Invalid hook call)/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};

const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    /(Failed to parse source map)/.test(args[0]) ||
    /(source-map-loader)/.test(args[0])
  ) {
    return;
  }
  originalWarn.call(console, ...args);
};
