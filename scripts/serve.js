/**
 * This task builds and launches the node.js server.
 * This node.js server serves the application.
 * Even if the server rendering is disabled, the server serves the
 * static website.
 * Then it launches browser-sync to proxy requests to the node.js server.
 * Browser-sync allows live reloading ONLY if a public ressource has changed.
 * For all other changes (like react components, component css, etc...),
 * the webpackHotMiddleware reload the changing part of the app.
 */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import BrowserSync from 'browser-sync';

import webpackConfig from '../config/webpack/webpack.playground.config';

export default async function start() {
  await new Promise(resolve => {
    const bundler = webpack(webpackConfig);

    const wpMiddleware = webpackDevMiddleware(bundler, {
      publicPath: webpackConfig.output.publicPath,
      stats: webpackConfig.stats,
    });
    const hotMiddlewares = webpackHotMiddleware(bundler);
    let doneOnce = false;
    const handleBundleComplete = () => {
      if (!doneOnce) {
        const bs = BrowserSync.create();

        const serverOptions = {
          baseDir: './playground',

          middleware: [wpMiddleware, hotMiddlewares],
        };

        bs.init({
          server: serverOptions,
          files: [
            'playground/**/*.css',
            'playground/**/*.html',
          ],
        }, resolve);
        doneOnce = true;
      }
    };

    bundler.plugin('done', () => handleBundleComplete());
  });
}
