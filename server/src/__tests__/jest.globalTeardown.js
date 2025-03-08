import server from '../../index.js';

export default async () => {
	await server.stop(global.__SERVER_INSTANCE__);
};
