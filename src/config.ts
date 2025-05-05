import { ServerConfig, CandidateConfig } from '@jhgaylor/candidate-mcp-server';
import axios from 'axios';
import pdfParse from 'pdf-parse';
import * as cheerio from 'cheerio';

let candidateConfig: CandidateConfig | null = null;

async function getTextFromUrl(url: string) {
  try {
    // Fetch the content from URL
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'TextExtractor/1.0'
      }
    });

    // Determine content type from response headers
    const contentType = response.headers['content-type'] || '';
    let extractedText = '';

    if (contentType.includes('application/pdf')) {
      // Extract text from PDF
      const pdfData = await pdfParse(response.data);
      extractedText = pdfData.text;
    } else if (contentType.includes('text/html')) {
      // Extract text from HTML
      const $ = cheerio.load(response.data.toString());
      // Remove script and style elements
      $('script, style').remove();
      extractedText = $('body').text().trim().replace(/\s+/g, ' ');
    } else if (contentType.includes('application/json')) {
      // Extract text from JSON
      const jsonData = JSON.parse(response.data.toString());
      extractedText = JSON.stringify(jsonData, null, 2);
    } else if (contentType.includes('text/plain')) {
      // Extract text from plain text
      extractedText = response.data.toString();
    } else {
      // Default: try to convert to string
      extractedText = `Unsupported content type: ${contentType}. Raw content:\n${response.data.toString().substring(0, 1000)}...`;
    }

    return extractedText;
  } catch (error) {
    console.error('Error fetching remote content:', error);
    return "Error fetching remote content from " + url;
  }
}


function getServerConfig() {
  const serverConfig = new ServerConfig();

  serverConfig.contactEmail = process.env.CONTACT_EMAIL;
  serverConfig.mailgunApiKey = process.env.MAILGUN_API_KEY;
  serverConfig.mailgunDomain = process.env.MAILGUN_DOMAIN;

  return serverConfig;
}

async function getCandidateConfig() {
  if (candidateConfig) {
    return candidateConfig;
  }

  candidateConfig = new CandidateConfig();
  candidateConfig.name = process.env.CANDIDATE_NAME || "Example Candidate";
  candidateConfig.resumeUrl = process.env.RESUME_URL || "https://example.com/resume.pdf";
  candidateConfig.resumeText = await getTextFromUrl(process.env.RESUME_URL || "https://example.com/resume.pdf");
  candidateConfig.linkedinUrl = process.env.LINKEDIN_URL || "https://example.com/linkedin";
  candidateConfig.githubUrl = process.env.GITHUB_URL || "https://example.com/github";
  candidateConfig.websiteUrl = process.env.WEBSITE_URL || "https://example.com";
  candidateConfig.websiteText = await getTextFromUrl(process.env.WEBSITE_URL || "https://example.com");

  return candidateConfig;
}

export { getServerConfig, getCandidateConfig };