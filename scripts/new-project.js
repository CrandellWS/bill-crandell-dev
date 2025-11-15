#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log('Create New Project Page\n');

  const slug = await prompt('Project slug (e.g., gamewheel): ');
  const title = await prompt('Project title: ');
  const description = await prompt('Short description: ');
  const githubUrl = await prompt('GitHub URL: ');
  const liveUrl = await prompt('Live demo URL (optional): ');
  const tags = await prompt('Tags (comma-separated): ');
  const featured = await prompt('Featured project? (y/n): ');

  const tagsArray = tags.split(',').map(t => t.trim());
  const isFeatured = featured.toLowerCase() === 'y';

  const projectContent = `---
title: "${title}"
description: "${description}"
tags: [${tagsArray.map(t => `"${t}"`).join(', ')}]
githubUrl: "${githubUrl}"
${liveUrl ? `liveUrl: "${liveUrl}"` : '# liveUrl: ""'}
featured: ${isFeatured}
---

# ${title}

${description}

## Features

- Feature 1
- Feature 2
- Feature 3

## Tech Stack

${tagsArray.map(tag => `- **${tag}**`).join('\n')}

## Links

- [GitHub Repository](${githubUrl})
${liveUrl ? `- [Live Demo](${liveUrl})` : ''}

## Screenshots

(Add screenshots here)

## Development

(Add development notes here)
`;

  const projectsDir = path.join(__dirname, '..', 'posts', 'projects');
  const projectPath = path.join(projectsDir, `${slug}.md`);

  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
  }

  fs.writeFileSync(projectPath, projectContent);

  console.log(`\n✅ Project page created: ${projectPath}`);
  console.log(`   Title: ${title}`);
  console.log(`   Slug: ${slug}`);
  console.log(`   Featured: ${isFeatured}`);

  rl.close();
}

main().catch(console.error);
