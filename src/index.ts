#!/usr/bin/env node

import { createServer } from '@jhgaylor/candidate-mcp-server';
import { ServerConfig, CandidateConfig } from "./types";
import { startHTTPServer } from "./express";
import { startStdioServer } from "./stdio";

async function main() {
  const args = process.argv.slice(2);
  const transportArg = args.find(arg => arg.startsWith('--transport='));
  const selectedTransport = transportArg ? transportArg.split('=')[1] : 'stdio';

  const serverConfig = new ServerConfig();
  const candidateConfig = await getCandidateConfig();

  const serverFactory = () => createServer(serverConfig, candidateConfig);

  // Start servers based on transport argument
  if (selectedTransport === 'http') {
    console.log('Starting HTTP server...');
    const port = process.env.PORT || "3000";
    startHTTPServer(candidateConfig, serverFactory, parseInt(port));
  } else {
    // NOTE: this must not log to stdout, otherwise it will break the MCP protocol. console.error is correct.
    console.error('Starting STDIO server...');
    startStdioServer(serverFactory);
  }
}

main();