import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ServerConfig, CandidateConfig } from "@jhgaylor/candidate-mcp-server";

export type ServerFactory = () => McpServer;
