import path from 'path';

import packageJson from './package.json';

const main = () => {
  const PROD = process.argv.includes('-p');
  const min = PROD ? '.min' : '';
  const entry = { [packageJson.name]: './src/index.js' };
  const filename = `[name]${min}.js`;

  return {
    entry,
    output: {
      filename,
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    'env',
                    {
                      targets: {
                        browsers: ['> 1%', 'last 5 versions'],
                      },
                    },
                  ],
                ],
              },
            },
          ],
        },
      ],
    },
    devtool: PROD ? false : 'source-maps',
  };
};

export default main;
