import express from 'express';
import { statefulHandlers, sseHandlers } from 'express-mcp-handler';
import { ServerFactory } from './types';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CandidateConfig } from "@jhgaylor/candidate-mcp-server";

// TODO: add well known for mcp
// TODO: maybe add an a2a card?
function startHTTPServer(candidateConfig: CandidateConfig, serverFactory: ServerFactory, port: number) {
  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(process.cwd(), 'public')));

  const handlers = statefulHandlers(serverFactory, {
    sessionIdGenerator: () => {
      return uuidv4();
    }
  });
  app.post('/mcp', handlers.postHandler);
  app.get('/mcp', handlers.getHandler);
  app.delete('/mcp', handlers.deleteHandler);

  const _sseHandlers = sseHandlers(serverFactory, {});
  app.get('/sse', _sseHandlers.getHandler);
  app.post('/messages', _sseHandlers.postHandler);

  // Start the server
  app.listen(port, () => {
    console.log(`Stateless MCP server running on port ${port}`);
  });
}

export { startHTTPServer };
