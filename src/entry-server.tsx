import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';

export { seoForPath, headTags, ALL_ROUTES } from './lib/seo';
export { POSTS } from './lib/blog';
export { PROJECTS } from './data/work';
export { SITE } from './site';

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
