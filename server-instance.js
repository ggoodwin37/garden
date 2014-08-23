var hapi = require('hapi');
var config = require('getconfig');
var inspect = require('eyes').inspector({maxLength: null});

function startServerInstance(done) {

	var app = {
		config: config,
		inspect: inspect
	};

	var server = new hapi.Server(config.serverPort, config.serverHost, {
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
	return server;
}

module.exports = startServerInstance;
