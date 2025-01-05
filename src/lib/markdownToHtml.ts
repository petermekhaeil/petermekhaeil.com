import { marked } from 'marked';
import shiki from 'shiki';

export function markdownToHtml(markdown: string) {
  return new Promise((resolve, reject) => {
    const markedOptions: marked.MarkedOptions = {
      highlight: (code, lang, callback) => {
        shiki
          .getHighlighter({ theme: 'github-dark' })
          .then((highlighter) => {
            const tokens = highlighter.codeToThemedTokens(code, lang);
            const html = shiki.renderToHtml(tokens, {
              elements: {
                pre({ children }) {
                  return `${children}`;
                },
                code({ children }) {
                  return `${children}`;
                }
              }
            });

            if (callback) {
              callback(null, html);
            }
          })
          .catch((error) => {
            if (callback) {
              callback(error);
            }
          });
      }
    };

    const markedCallback = (err: any, html: string) => {
      if (err) return reject(err);
      resolve(html);
    };

    marked(markdown, markedOptions, markedCallback);
  });
}
