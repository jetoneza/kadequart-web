import Koa from 'koa'
import convert from 'koa-convert'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'
import historyApiFallback from 'koa-connect-history-api-fallback'
import serve from 'koa-static'
import proxy from 'koa-proxy'
import _debug from 'debug'
import config from '../config'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'
import body from 'koa-better-body'
import request from 'request'
import fs from 'fs';

const debug = _debug('app:server')
const paths = config.utils_paths
const app = new Koa()

// Enable body parser
app.use(body())

// Enable koa-proxy if it has been enabled in the config.
if (config.proxy && config.proxy.enabled) {
  app.use(convert(proxy(config.proxy.options)))
}

// API Proxy
app.use(async (ctx, next) => {
  if(ctx.request.url.startsWith('/api/')) {
    const req = ctx.request;
    const url = req.url.substring(4); // Strip '/api/'

    delete req.header.host; // Fix for proxying HTTPS requests

    const options = {
      url,
      baseUrl: config.api_host,
      headers: req.header,
      method: req.method,
    }

    if(ctx.request.is('json')) {
      delete options.headers['content-length'];
      options.json = true;
      options.body = ctx.body;
    }

    if(ctx.request.is('multipart/form-data')) {
      if(ctx.body.files.image) {
        delete options.headers['content-length'];
        options.formData = {
          image: fs.createReadStream(ctx.body.files.image.path),
        };
      }
    }

    const PassThrough = require('stream').PassThrough;
    ctx.body = request(options)
      .on('response', res => {
        ctx.set(res.headers);
        ctx.status = res.statusCode;
      })
      .on('error', ctx.onerror)
      .pipe(PassThrough());
  } else {
    await next();
  }
});

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
app.use(convert(historyApiFallback({
  verbose: false
})))

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output

  app.use(webpackDevMiddleware(compiler, publicPath))
  app.use(webpackHMRMiddleware(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(serve(paths.client('static')))
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(serve(paths.dist()))
}

export default app
