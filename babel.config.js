module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { node: 'current' },
        },
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      ['module-resolver', {
        alias: {
          configs: './src/configs',
          utils: './src/utils',
          interfaces: './src/interfaces',
          core: './src/core',
          routes: './src/routes',
          app: './src/app',
        },
      }],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-private-methods', { loose: true }],
      ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
      'babel-plugin-transform-typescript-metadata'
    ],
    ignore: [
      '**/.spec.ts',
    ],
};
