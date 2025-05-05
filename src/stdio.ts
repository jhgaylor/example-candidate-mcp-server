#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ServerFactory } from "./types";

async function startStdioServer(serverFactory: ServerFactory) {
  const server = serverFactory();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

export { startStdioServer };
