import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head />
        <body className="bg-gray-900 text-gray-200 antialiased px-4 py-6 max-w-3xl mx-auto sm:px-6 sm:py-6 lg:max-w-4xl lg:py-6 lg:px-6 xl:max-w-6xl">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
