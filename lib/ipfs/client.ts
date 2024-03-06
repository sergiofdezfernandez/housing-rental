import { create } from 'ipfs-http-client';
const ipfsClient = create({ url: '/ip4/127.0.0.1/tcp/5001' });
export default ipfsClient;
