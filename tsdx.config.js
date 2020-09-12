module.exports = {
  rollup(config) {
    config.output = {
      file: 'dist/emails-input.js',
      format: 'umd',
      name: 'EmailsInput',
      sourcemap: true,
    };

    return config;
  },
};
