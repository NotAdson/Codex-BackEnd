import server from '../../index.js';

export default async () => {
	global.__SERVER_INSTANCE__ = await server.start();
};
