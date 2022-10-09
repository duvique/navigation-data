import 'dotenv/config';
import './configuration/database';
import App from './app';

const port = process.env.PORT || 3005;

const init = async () => {
  const { server } = await new App().start();
  server.listen(port);
};

Promise.resolve()
  .then(init)
  .then(() => console.log(`> [SERVER] Server listening on port ${port}`))
  .catch(e => `> [SERVER] Server start failed - ${e}`);
