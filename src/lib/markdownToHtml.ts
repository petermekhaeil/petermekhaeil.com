import { marked } from 'marked';
import { createHighlighter, type Highlighter } from 'shiki';
import { transformerStyleToClass } from '@shikijs/transformers';

const toClass = transformerStyleToClass({
  classPrefix: '__shiki_'
});

let highlighterInstance: Highlighter | null = null;

async function getSingletonHighlighter(): Promise<Highlighter> {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: ['github-dark'],
      langs: [
        'javascript',
        'typescript',
        'html',
        'css',
        'json',
        'bash',
        'dart',
        'graphql',
        'yaml',
        'sql',
        'ini',
        'docker',
        'php',
        'cs'
      ]
    });
  }
  return highlighterInstance;
}

export async function markdownToHtml(markdown: string) {
  return new Promise(async (resolve, reject) => {
    const highlighter = await getSingletonHighlighter();

    const markedOptions: marked.MarkedOptions = {
      highlight: (code, lang, callback) => {
        const html = highlighter.codeToHtml(code, {
          lang,
          theme: 'github-dark',
          transformers: [
            toClass,
            {
              pre(node) {
                this.addClassToHast(node, 'not-prose m-0 p-0');
              }
            }
          ]
        });

        if (callback) {
          callback(null, html);
        }
      }
    };

    const markedCallback = (err: any, html: string) => {
      if (err) return reject(err);
      resolve(html);
    };

    marked(markdown, markedOptions, markedCallback);
  });
}
