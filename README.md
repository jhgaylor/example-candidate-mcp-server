# HTTP Server with MCP Support

An HTTP server built with Express and TypeScript that serves both a webpage and a Model Context Protocol (MCP) endpoint.

## Features

- HTTP server with both web and MCP functionality
- Stateless MCP server implementation with modern Streamable HTTP transport
- TypeScript for type safety
- Express.js for HTTP handling

## Requirements

- Node.js 18+ 
- npm or yarn

## Installation

```bash
# Clone the repository (or download)
git clone https://github.com/your-username/example-candidate-mcp-server.git
cd example-candidate-mcp-server

# Install dependencies
npm install

# Start the http transport
npm run start:web

# Start the stdio transport
npm run start
```

## Development

```bash
# Build the TypeScript code
npm run build

# Run in development mode with auto-reloading
npm run dev

# Run tests (when added)
npm test
```

## Server Structure

```
src/
  ├── index.ts                # Main application entry point
  ├── express.ts              # HTTP server configuration
  ├── stdio.ts                # STDIO server configuration
  ├── config.ts               # Server configuration
  └── types.ts                # TypeScript type definitions
```

## License

[ISC](LICENSE) 

## Regenerating the fly deploy key

The token was made with:

`fly tokens create deploy --name gh-jakegaylor-com-mcp-server --expiry 2160h`