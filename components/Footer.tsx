const Footer = () => {
  return (
    <footer className="flex justify-center">
      <ul className="flex items-center">
        <li className="mr-3">
          <a
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            href="https://github.com/petermekhaeil"
          >
            <span className="sr-only">Connect with Peter on GitHub</span>
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                fillRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        <li className="mr-3">
          <a
            target="_blank"
            rel="noreferrer"
            title="Twitter"
            href="https://twitter.com/PMekhaeil"
          >
            <span className="sr-only">Connect with Peter on Twitter</span>
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
          </a>
        </li>
        <li className="mr-3">
          <a
            target="_blank"
            rel="noreferrer"
            title="Dev.to"
            href="https://dev.to/petermekhaeil"
          >
            <span className="sr-only">Connect with Peter on Dev.to</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              strokeWidth="0"
              fill="currentColor"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z"></path>
            </svg>
          </a>
        </li>
        <li className="mr-3">
          <a
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
            href="https://www.linkedin.com/in/petermekhaeil/"
          >
            <span className="sr-only">Connect with Peter on LinkedIn.</span>
            <svg viewBox="0 50 512 512" className="h-6 w-6">
              <path
                d="M150.65,100.682c0,27.992-22.508,50.683-50.273,50.683c-27.765,0-50.273-22.691-50.273-50.683
  C50.104,72.691,72.612,50,100.377,50C128.143,50,150.65,72.691,150.65,100.682z M143.294,187.333H58.277V462h85.017V187.333z
  M279.195,187.333h-81.541V462h81.541c0,0,0-101.877,0-144.181c0-38.624,17.779-61.615,51.807-61.615
  c31.268,0,46.289,22.071,46.289,61.615c0,39.545,0,144.181,0,144.181h84.605c0,0,0-100.344,0-173.915
  s-41.689-109.131-99.934-109.131s-82.768,45.369-82.768,45.369V187.333z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
        </li>
        <li className="mr-3">
          <a rel="me noopener" title="RSS Feed" href="/rss.xml">
            <span className="sr-only">RSS Feed</span>
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
