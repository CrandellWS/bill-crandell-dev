#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Usage: npm run generate-post YYYY-MM-DD
const date = process.argv[2];

if (!date) {
  console.error('Usage: npm run generate-post YYYY-MM-DD');
  process.exit(1);
}

// Validate date format
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  console.error('Error: Date must be in YYYY-MM-DD format');
  process.exit(1);
}

const [year, month, day] = date.split('-');
const dailyLogPath = path.join(
  process.env.HOME,
  'growth-tracking',
  'daily',
  `${year}-${month}`,
  `${date}.md`
);

// Check if daily log exists
if (!fs.existsSync(dailyLogPath)) {
  console.error(`Error: Daily log not found at ${dailyLogPath}`);
  process.exit(1);
}

// Read the daily log
const dailyLog = fs.readFileSync(dailyLogPath, 'utf8');

// Extract work accomplishments section
const workMatch = dailyLog.match(/### 💼 Work\n([\s\S]*?)(?=\n### |$)/);
if (!workMatch) {
  console.error('Error: Could not find Work section in daily log');
  process.exit(1);
}

const workContent = workMatch[1].trim();

// Extract key learnings
const learningMatch = dailyLog.match(/### 📚 Learning\n([\s\S]*?)(?=\n### |$)/);
const learningContent = learningMatch ? learningMatch[1].trim() : '';

// Extract key insight
const insightMatch = dailyLog.match(/### Personal Insight\n\n([\s\S]*?)(?=\n### |$)/);
const insightContent = insightMatch ? insightMatch[1].trim() : '';

// Generate title from first accomplishment
const firstAccomplishment = workContent.match(/- ✅ \*\*(.*?)\*\*/);
const title = firstAccomplishment
  ? firstAccomplishment[1]
  : `Development Update - ${date}`;

// Generate excerpt
const impactMatch = workContent.match(/\*\*Impact\*\*: (.*?)(?=\n|$)/);
const excerpt = impactMatch
  ? impactMatch[1]
  : 'Updates on current projects and development progress.';

// Extract tags from technologies mentioned
const tags = [];
if (workContent.includes('Next.js')) tags.push('nextjs');
if (workContent.includes('TypeScript')) tags.push('typescript');
if (workContent.includes('AI') || workContent.includes('orchestrat')) tags.push('ai-development');
if (learningContent.includes('Parallel')) tags.push('parallel-execution');
if (!tags.length) tags.push('development', 'progress');

// Generate slug
const slug = `${date}-${title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')}`;

// Create blog post content
const blogPost = `---
title: "${title}"
date: "${date}"
excerpt: "${excerpt}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
---

## Summary

${excerpt}

## What I Built

${workContent}

${learningContent ? `## Key Learnings\n\n${learningContent}` : ''}

${insightContent ? `## Insights\n\n${insightContent}` : ''}

---

*This post was auto-generated from my daily development log and enhanced for public sharing.*
`;

// Write blog post
const postsDir = path.join(__dirname, '..', 'posts');
const postPath = path.join(postsDir, `${slug}.md`);

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

fs.writeFileSync(postPath, blogPost);

console.log(`✅ Blog post generated: ${postPath}`);
console.log(`   Title: ${title}`);
console.log(`   Slug: ${slug}`);
console.log(`   Tags: ${tags.join(', ')}`);
