import Link from 'next/link';
import React from 'react';

const Projects = ({ projects }) => {
  console.log(projects);
  return (
    <ul>
      {projects.map((project) => {
        return (
          <div title={project.name} key={project.name}>
            <h3>
              <Link as={`${project.url}`} href="[url]">
                <a>{project.name}</a>
              </Link>
            </h3>
            <p>{project.description}</p>
          </div>
        );
      })}
    </ul>
  );
};

export default Projects;
