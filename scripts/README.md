# Daily Accountability System

Zero-effort automated blog posts that create a public log of your daily development activity.

## What It Does

Automatically generates daily blog posts documenting:
- **Git commits** across all your projects
- **Running Docker containers** (active projects)
- **Recent file modifications** (what you're working on)
- **Growth tracker entries** (if you use the growth tracking system)

## How It Works

### Option 1: GitHub Actions (Recommended)

The system runs automatically via GitHub Actions at 8 PM UTC daily:
- Collects activity data from your repos
- Generates a markdown blog post
- Commits and pushes to your blog
- Triggers automatic deployment

**Setup:** Just push the `.github/workflows/daily-log.yml` to your repo - it's already configured!

### Option 2: Local Cron Job

For local/self-hosted setups:

```bash
# Run the setup script (one time)
./scripts/setup-cron.sh

# View logs
tail -f ~/logs/daily-log.log
```

### Manual Run

Generate a log anytime:

```bash
./scripts/generate-daily-log.sh
```

## Configuration

### Add More Data Sources

Edit `generate-daily-log.sh` to add custom data collection:

```bash
# Example: Add deployment stats
collect_deployment_info() {
    echo "**Deployments:**"
    # Your custom logic here
}
```

### Auto-Push to GitHub

In `generate-daily-log.sh`, uncomment this line:

```bash
# git push origin main || echo "Push failed - will sync later"
```

### Multiple Repos Analysis

For GitHub Actions to analyze all your repos, edit `.github/workflows/daily-log.yml`:

```yaml
- name: Checkout all project repos
  run: |
    cd /tmp
    git clone https://github.com/yourusername/repo1.git
    git clone https://github.com/yourusername/repo2.git
```

## Example Output

```markdown
---
title: "Dev Log - November 15, 2025"
date: "2025-11-15"
excerpt: "20 commits across projects. 3 containers running."
tags: ["devlog", "accountability", "automated"]
---

## Infrastructure Status
**Active Containers:**
- gamewheel (nginx) - up 14 days
- postgres (postgres:14) - up 14 days

## Development Work
**Git Activity (Last 24 Hours):**
- Total commits: 20
- **gamewheel**: 8 commits
- **bill-crandell-dev**: 5 commits

**Recent Project Activity:**
- gamewheel/src/components/WinnerConfirmation.tsx
- bill-crandell-dev/app/projects/page.tsx
```

## Benefits

1. **Zero Extra Work** - Runs completely automatically
2. **Public Accountability** - Shows you're shipping, not just talking
3. **Historical Record** - Automatic timeline of your building journey
4. **Build in Public** - Authentic content from real activity
5. **SEO Content** - Regular blog posts help with discoverability

## Tips

- Let it run for a week to build up a pattern
- Share the posts on social media
- Link to specific logs in project announcements
- Use it to remember what you worked on for retrospectives

## Future Enhancements

Ideas for expansion:
- Integrate with Wakatime for time tracking
- Add container metrics (CPU, memory, requests)
- Include Claude Code session summaries
- Generate weekly summary posts
- Add visualization/charts
- Webhook integration for Discord/Slack updates

---

**Zero work. Maximum accountability.** 🎯
