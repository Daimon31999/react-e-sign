module.exports = function override(config, env) {
  const svelteRule = {
    test: [/\.svelte$/],
    loader: require.resolve("svelte-loader"),
  };

  const rules = config.module.rules;
  const index = rules.findIndex((rule) => Object.keys(rule).includes("oneOf"));

  if (index !== -1) {
    rules[index].oneOf.unshift(svelteRule);
  }

  return config;
};
