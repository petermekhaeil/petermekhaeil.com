import Link from 'next/link';
import React from 'react';

const Sites = ({ sites }) => {
  return (
    <ul>
      {sites.map((site) => {
        return (
          <div title={site.title} key={site.title}>
            <h3>
              <Link as={`${site.link}`} href="[link]">
                <a>{site.title}</a>
              </Link>
            </h3>
            <p>{site.description}</p>
          </div>
        );
      })}
    </ul>
  );
};

export default Sites;
