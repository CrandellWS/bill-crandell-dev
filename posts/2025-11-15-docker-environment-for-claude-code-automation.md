---
title: "Docker Environment for Claude Code Automation"
date: "2025-11-15"
excerpt: "Built containerized infrastructure for AI web agents - auto-start Claude Code with Docker orchestration. From screenshot inspiration to production-ready environment in minutes."
tags: ["docker", "devops", "claude-code", "automation", "infrastructure"]
---

## Summary

Today I set up a Docker-based infrastructure for running AI web agents with Claude Code. The goal was simple: create a containerized environment where Claude Code starts automatically with specific flags, ready for autonomous web automation tasks. The result is a clean, reproducible development environment that can spin up AI agents on demand.

## What I Built

### AI Web Agents Docker Setup

**The Infrastructure:**
- Dockerfile with Node.js 20 environment
- Claude Code CLI installation and configuration
- Auto-start with `-r --dangerously-skip-permissions` flags
- Docker Compose orchestration with persistent volumes
- Environment-based API key management
- Workspace and config persistence

**Files Created:**
```
ai_web_agents/
├── Dockerfile              # Container image with Claude Code
├── docker-compose.yml      # Service orchestration
├── .env.example           # API key template
└── README.md              # Setup documentation
```

### The Architecture

**Container Setup:**
- Base: Node.js 20 slim image
- System deps: curl, git, python3, sudo
- Non-root user for security
- Global Claude Code CLI installation
- Persistent volumes for workspace and config

**Docker Compose Features:**
- Interactive TTY support for Claude Code sessions
- Environment variable injection (API keys)
- Volume mounts for data persistence
- Bridge networking
- Auto-restart policy

### Key Implementation Details

**Dockerfile Strategy:**
```dockerfile
# Node.js 20 slim for minimal footprint
FROM node:20-slim

# System dependencies
RUN apt-get update && apt-get install -y \
    curl git python3 python3-pip sudo

# Non-root user for security
RUN useradd -m -s /bin/bash aiuser

# Global Claude Code CLI
RUN npm install -g @anthropic-ai/claude-code

# Auto-start with specific flags
CMD ["claude", "-r", "--dangerously-skip-permissions"]
```

**Volume Persistence:**
- `./workspace` → Container workspace (your projects)
- `./config` → Claude Code configuration
- Ensures work survives container restarts

## Key Learnings

### Container-First Development

Building AI automation infrastructure with containers from the start. Dockerizing development environments ensures reproducibility across machines and makes deployment trivial.

### Auto-Start Configuration

Using CMD to automatically launch Claude Code with flags. No manual intervention needed - container starts, Claude Code runs with the right permissions.

### Volume Strategy for AI Tools

Persistent volumes for both workspace AND config. AI tools often have state (conversation history, learned patterns) that should survive restarts.

### Security with Convenience

Running as non-root user with sudo access. Balance between security best practices and development flexibility for AI agents that might need system access.

## Technical Deep Dive

### Why These Flags?

The `-r --dangerously-skip-permissions` flags are critical for automated agents:
- `-r`: Resume mode for continuous operation
- `--dangerously-skip-permissions`: Allows autonomous actions without prompts

Perfect for web automation scenarios where you want Claude Code to work independently.

### Interactive TTY Setup

```yaml
stdin_open: true
tty: true
```

These Docker Compose settings enable interactive sessions. Critical for attaching to the running Claude Code instance and monitoring/controlling it.

### Environment Variable Pattern

```yaml
environment:
  - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
```

Reads from `.env` file, never commits secrets to git. Clean pattern for managing credentials in containerized environments.

## Metrics

### Infrastructure Delivered
- Setup time: ~10 minutes
- Files created: 4
- Lines of code/config: 110
- Docker layers: Optimized with apt cleanup
- Base image size: Node 20 slim (~150 MB)
- Security: Non-root user, no hardcoded secrets

### The DevOps Formula

Traditional setup would require:
1. Install Node.js on host
2. Install system dependencies
3. Configure Claude Code
4. Set up environment variables
5. Document the process
6. Replicate on other machines (hope it works!)

With Docker:
1. **One command**: `docker-compose up -d`
2. Works on any machine with Docker

## What's Next

**Enhancement Ideas:**
- Multi-agent orchestration (multiple Claude instances)
- Web UI dashboard for managing agents
- Agent-to-agent communication via shared volumes
- Logging and monitoring integration
- GPU support for local model inference
- Kubernetes deployment for scale

**Integration Opportunities:**
- Connect to web scraping targets
- API automation workflows
- Content generation pipelines
- Testing automation
- DevOps task automation

## Insights

This project demonstrates infrastructure-as-code thinking for AI tools. Instead of manually configuring development environments, we codify the setup and make it reproducible.

The pattern here applies broadly:
- **Container**: Isolated environment with all dependencies
- **Orchestration**: Docker Compose for service management
- **Persistence**: Volumes for state that matters
- **Automation**: CMD/entrypoint for auto-start behavior

When you treat AI tools as containerized services, you get all the benefits of modern DevOps: reproducibility, scalability, and portability.

## Conclusion

AI web agents need infrastructure just like any other service. This Docker setup provides a clean foundation for running Claude Code autonomously - perfect for automation tasks, web scraping, content generation, or any scenario where you want an AI agent working independently.

The beauty of this approach: spin up an agent in seconds, let it work, tear it down when done. Infrastructure that matches the dynamic nature of AI workloads.

---

**GitHub:** [AI Web Agents Docker Setup](https://github.com/CrandellWS/bill-crandell-dev)

*Built with Docker, Docker Compose, Node.js 20, and Claude Code CLI.*
