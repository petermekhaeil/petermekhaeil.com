import { marked } from 'marked';
import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import { transformerStyleToClass } from '@shikijs/transformers';
import githubDark from '@shikijs/themes/github-dark';

const toClass = transformerStyleToClass({
  classPrefix: '__shiki_'
});

let highlighterInstance: HighlighterCore | null = null;

async function getSingletonHighlighter(): Promise<HighlighterCore> {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighterCore({
      themes: [githubDark],
      langs: [
        import('@shikijs/langs/javascript'),
        import('@shikijs/langs/typescript'),
        import('@shikijs/langs/html'),
        import('@shikijs/langs/css'),
        import('@shikijs/langs/json'),
        import('@shikijs/langs/bash'),
        import('@shikijs/langs/dart'),
        import('@shikijs/langs/graphql'),
        import('@shikijs/langs/yaml'),
        import('@shikijs/langs/sql'),
        import('@shikijs/langs/ini'),
        import('@shikijs/langs/docker'),
        import('@shikijs/langs/php'),
        import('@shikijs/langs/cs')
      ],
      engine: createOnigurumaEngine(import('shiki/wasm'))
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
