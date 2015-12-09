var hapi = require('hapi');
var config = require('getconfig');
// var inspect = require('eyes').inspector({maxLength: null});

function startServerInstance(done) {
	// when running under c9 environment, we need to pull these values from env.
	// when running locally, fall back to config.
	var port = process.env.PORT;
	var host = process.env.IP;
	if (!port) {
		console.log('no port defined in env, using config instead.');
		port = config.server.port;
	}
	if (!host) {
		console.log('no host defined in env, using config instead.');
		host = config.server.host;
	}
	var server = new hapi.Server(port, host, {
		// not using any server views right now.
		// views: {
		//     engines: { jade: require('jade') },
		//     path: __dirname + '/templates'
		// }
	});

	var serverPackList = [
		{
			plugin: require('moonboots_hapi'),
			options: {
				appPath: '/{p*}',
				moonboots: {
					main: __dirname + '/client/app.js',
					developmentMode: config.isDev,
					stylesheets: [
						__dirname + '/dist/css/main.css'
					],
					beforeBuildJS: function() {
						// TODO: investigate the build-time streaming approach
						if (config.isDev) {
							var templatizer = require('templatizer');
							templatizer(__dirname + '/templates', __dirname + '/client/templates.js');
						}

					}
				}
			}
		}
	];

	server.pack.register(serverPackList, function (err) {
		if (err) throw err;
		server.start(function () {
			console.log('benterprise is running at', server.info.uri);
			done && done(server);
		});
	});

	// static files
	server.route({
		method: 'GET',
		path: '/img/{filename*}',
		handler: {
			directory: {
				path: 'img'
			}
		}
	});
	return server;
}

module.exports = startServerInstance;
