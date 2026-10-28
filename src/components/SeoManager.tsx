import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { headTags, seoForPath } from '../lib/seo';

// Keeps <head> in sync on client-side navigation. The prerendered HTML
// already ships the same tags, so crawlers never depend on this.
export function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
    const tpl = document.createElement('template');
    tpl.innerHTML = headTags(seoForPath(pathname));
    document.head.append(tpl.content);
  }, [pathname]);

  return null;
}
