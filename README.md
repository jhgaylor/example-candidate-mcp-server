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

## Customizing the candidate data

To customize the candidate data, you can set the following environment variables in your environment or in a `.env` file at the root of your project:

- `CONTACT_EMAIL`: The contact email address for the server.
- `MAILGUN_API_KEY`: The API key for Mailgun, used for sending emails.
- `MAILGUN_DOMAIN`: The domain for Mailgun, used for sending emails.
- `CANDIDATE_NAME`: The name of the candidate.
- `RESUME_URL`: The URL to the candidate's resume in PDF format.
- `LINKEDIN_URL`: The URL to the candidate's LinkedIn profile.
- `GITHUB_URL`: The URL to the candidate's GitHub profile.
- `WEBSITE_URL`: The URL to the candidate's personal website.

These variables are used to configure the server and customize the candidate's information that is served by the MCP server. Make sure to restart the server after making changes to these variables for them to take effect.

You can also update them directly in `src/config.ts`.

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