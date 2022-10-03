import { Server } from 'socket.io';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: unknown) {
		const io = new Server(server.httpServer);

		io.on('connection', (socket) => {
			socket.emit('eventFromServer', 'Hello from the server!');

			socket.on('plansChanged', () => {
				socket.broadcast.emit('plansChanged');
			});
		});
	}
};

export default webSocketServer;
