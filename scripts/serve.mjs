// Local static server that mimics Vercel's cleanUrls, for checking the prerendered build.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const candidates = path === '/' ? ['index.html'] : [path.slice(1), `${path.slice(1)}.html`];
  for (const c of candidates) {
    try {
      const body = await readFile(join(dist, c));
      res.writeHead(200, { 'content-type': types[extname(c)] || 'application/octet-stream' });
      return res.end(body);
    } catch {}
  }
  res.writeHead(404, { 'content-type': 'text/html' });
  res.end(await readFile(join(dist, '404.html')));
}).listen(process.env.PORT || 4173, () => console.log(`http://localhost:${process.env.PORT || 4173}`));
