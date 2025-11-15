#!/bin/bash

# Daily Accountability Log Generator
# Automatically generates blog posts documenting daily development activity

set -e

BLOG_DIR="$HOME/projects/bill-crandell-dev"
POSTS_DIR="$BLOG_DIR/posts"
PROJECTS_DIR="$HOME/projects"
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%H:%M:%S)
POST_FILE="$POSTS_DIR/$DATE-daily-dev-log.md"

# Skip if post already exists
if [ -f "$POST_FILE" ]; then
    echo "Post for $DATE already exists. Skipping."
    exit 0
fi

echo "Generating daily accountability log for $DATE..."

# Collect Docker container data
collect_docker_info() {
    if command -v docker &> /dev/null && docker ps &> /dev/null 2>&1; then
        echo "**Active Containers:**"
        docker ps --format "- {{.Names}} ({{.Image}}) - up {{.Status}}" || echo "- None running"
    else
        echo "**Active Containers:**"
        echo "- Docker not available"
    fi
}

# Collect git activity from all repos
collect_git_activity() {
    echo "**Git Activity (Last 24 Hours):**"

    local total_commits=0
    local repos_with_activity=""

    # Find all git repos in projects directory
    while IFS= read -r repo; do
        cd "$repo"
        # Count commits from last 24 hours
        commits=$(git log --since="24 hours ago" --oneline 2>/dev/null | wc -l)

        if [ "$commits" -gt 0 ]; then
            total_commits=$((total_commits + commits))
            repo_name=$(basename "$repo")
            repos_with_activity="$repos_with_activity\n- **$repo_name**: $commits commits"

            # Get commit messages
            git log --since="24 hours ago" --pretty=format:"  - %s" 2>/dev/null | head -5 | while read -r line; do
                if [ -n "$line" ]; then
                    repos_with_activity="$repos_with_activity\n$line"
                fi
            done
        fi
    done < <(find "$PROJECTS_DIR" -name ".git" -type d -exec dirname {} \; 2>/dev/null)

    if [ "$total_commits" -gt 0 ]; then
        echo -e "- Total commits: $total_commits"
        echo -e "$repos_with_activity"
    else
        echo "- No commits in the last 24 hours"
    fi
}

# Collect file system activity (recently modified project files)
collect_recent_activity() {
    echo "**Recent Project Activity:**"

    # Find recently modified files (excluding node_modules, .next, etc.)
    recent_files=$(find "$PROJECTS_DIR" -type f \
        -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \
        -o -name "*.py" -o -name "*.go" -o -name "*.rs" \
        -o -name "*.md" -o -name "Dockerfile" -o -name "*.yml" -o -name "*.yaml" \
        2>/dev/null | \
        grep -v node_modules | \
        grep -v .next | \
        grep -v out | \
        grep -v dist | \
        grep -v build | \
        xargs ls -lt 2>/dev/null | \
        head -10 | \
        awk '{print $9}' | \
        sed "s|$PROJECTS_DIR/||g")

    if [ -n "$recent_files" ]; then
        echo "$recent_files" | head -5 | while read -r file; do
            if [ -n "$file" ]; then
                echo "- $file"
            fi
        done
    else
        echo "- No recent file changes detected"
    fi
}

# Check for growth tracker logs
collect_growth_logs() {
    GROWTH_LOG="$HOME/growth-tracking/logs/$(date +%Y-%m).md"

    if [ -f "$GROWTH_LOG" ]; then
        echo "**Today's Growth Log Entry:**"
        # Extract today's entry if it exists
        TODAY_SECTION=$(grep -A 10 "## $DATE" "$GROWTH_LOG" 2>/dev/null || echo "")
        if [ -n "$TODAY_SECTION" ]; then
            echo "$TODAY_SECTION" | head -8
        else
            echo "- No entry logged yet"
        fi
    fi
}

# Generate excerpt based on activity
generate_excerpt() {
    local commits=$1
    local containers=$2

    if [ "$commits" -gt 0 ] && [ "$containers" -gt 0 ]; then
        echo "$commits commits across projects. $containers containers running."
    elif [ "$commits" -gt 0 ]; then
        echo "$commits commits across projects today."
    elif [ "$containers" -gt 0 ]; then
        echo "$containers containers running. Infrastructure maintenance day."
    else
        echo "Planning and research day."
    fi
}

# Count active containers
container_count=$(docker ps -q 2>/dev/null | wc -l || echo "0")

# Count commits
commit_count=0
while IFS= read -r repo; do
    cd "$repo"
    commits=$(git log --since="24 hours ago" --oneline 2>/dev/null | wc -l)
    commit_count=$((commit_count + commits))
done < <(find "$PROJECTS_DIR" -name ".git" -type d -exec dirname {} \; 2>/dev/null)

excerpt=$(generate_excerpt "$commit_count" "$container_count")

# Generate the markdown post
cat > "$POST_FILE" << EOF
---
title: "Dev Log - $(date '+%B %d, %Y')"
date: "$DATE"
excerpt: "$excerpt"
tags: ["devlog", "accountability", "automated"]
---

# Development Activity - $(date '+%B %d, %Y')

> Automated accountability log generated at $TIMESTAMP

## Infrastructure Status

$(collect_docker_info)

## Development Work

$(collect_git_activity)

$(collect_recent_activity)

$(collect_growth_logs)

## Notes

This is an automated log generated by my accountability system. It tracks:
- Running Docker containers (active projects)
- Git commits across all repositories
- Recent file modifications
- Daily growth tracker entries

---

*Generated automatically by the daily accountability system*
EOF

echo "✅ Generated: $POST_FILE"

# Auto-commit and push if in git repo
cd "$BLOG_DIR"
if [ -d ".git" ]; then
    git add "$POST_FILE"
    git commit -m "Add daily dev log for $DATE [automated]" || true

    # Optional: auto-push (uncomment when ready)
    # git push origin main || echo "Push failed - will sync later"

    echo "✅ Committed to git"
fi

echo "🎉 Daily accountability log complete!"
