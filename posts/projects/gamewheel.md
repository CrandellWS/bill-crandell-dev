---
title: "GameWheel"
description: "Advanced random selection spinner with multiple game modes, visual effects, and chat integration"
tags: ["nextjs", "typescript", "canvas", "zustand", "framer-motion", "tailwindcss"]
githubUrl: "https://github.com/CrandellWS/gamewheel"
liveUrl: "https://crandellws.github.io/gamewheel/"
featured: true
---

# GameWheel - Advanced Random Selection Spinner

GameWheel is a powerful, open-source random selection spinner with multiple game modes, chat platform integration, and extensive customization options. Perfect for streamers, educators, event organizers, and anyone who needs fair random selection.

## Features

### 🎮 Multiple Game Modes

**First Win Mode**
- Traditional wheel behavior - spin and select a winner
- Optional winner removal
- Perfect for giveaways and simple selections

**Last Remaining Mode**
- Competitive elimination format
- Each spin eliminates the selected entry
- The final entry is the ultimate winner
- Best for tournaments and battle royale style events

**Full Tilt Mode** (NEW in v2.2.0)
- Dramatic ladder-climbing competition
- Players race to reach the top
- Configurable heights: 3, 5, 7, or 10 rungs
- Visual ladder display with real-time animated progress
- Champion celebration with confetti and trophy overlay
- All-or-nothing suspense and progressive competition

### 🎨 Visual Excellence

**Dynamic Tier System**
- 4-tier visual hierarchy based on wheel positions
- Tier 1 (North): 2.0x slice size, gold theme, star markers
- Tier 2 (Cardinals): 1.6x size, platinum shimmer
- Tier 3 (Diagonals): 1.3x size, enhanced glow
- Tier 4 (Standard): Normal sizing

**Animations & Effects**
- Smooth 60fps Canvas rendering
- Physics-based spinning with realistic friction
- Framer Motion transitions
- Confetti celebrations (toggleable)
- Trophy overlays for winners
- Ladder climb animations

### 💬 Chat Integration

Accept contestant submissions from multiple platforms:
- **Twitch** - Channel points, bits, chat commands
- **Discord** - Slash commands, reactions
- **YouTube** - Super Chat, memberships

Features:
- Configurable minimum fee amounts
- Real-time entry addition
- Platform-specific validation
- Webhook integration

> **Note**: Chat integration requires serverless hosting (Vercel, Netlify). GitHub Pages deployment includes all other features with manual entry management.

### ⚙️ Customization Options

**Per-Entry Customization**
- Weighted probability (1-10 scale)
- Individual color selection
- Inline name editing
- Bulk add (comma/newline separated)

**Global Settings**
- Dark mode with system preference detection
- Custom terminology (Contestants, Players, Participants, etc.)
- Adjustable spin duration (2-6 seconds)
- Sound effects toggle
- Confetti animation toggle

### 📊 Data Management

**History Tracking**
- Complete spin history with timestamps
- Game mode indicators
- Elimination tracking
- Ladder climb progress
- CSV export for analysis

**Import/Export**
- Save wheel configurations as JSON
- Share setups between devices
- Auto-save to localStorage
- No tracking - all data stays local

### ⌨️ Keyboard Shortcuts

- `Space` or `Enter` - Spin the wheel
- `S` - Open settings
- `D` - Toggle dark mode
- `?` - Show keyboard shortcuts help
- `Esc` - Close modals

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode, 0 errors)
- **Styling**: TailwindCSS
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **Rendering**: HTML5 Canvas API
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (static export)

## Metrics

- **Bundle Size**: 152 kB (optimized)
- **Build**: Static export
- **TypeScript**: Strict mode, 0 errors
- **Performance**: 60fps animations
- **Mobile**: Fully responsive
- **Accessibility**: Keyboard navigation

## Live Demo

Experience GameWheel in action: [https://crandellws.github.io/gamewheel/](https://crandellws.github.io/gamewheel/)

Try all three game modes:
1. **First Win** - Classic wheel spinning
2. **Last Remaining** - Elimination tournament
3. **Full Tilt** - Ladder climb competition

## Development Highlights

### Canvas Rendering Precision

Eliminated floating-point precision issues with perfect 360° coverage:
```typescript
// Epsilon tolerance for boundary detection
const EPSILON = 0.0001;

// Perfect segment coverage for any entry count
const arcLength = (2 * Math.PI) / entries.length;
```

### Physics-Based Animation

Realistic friction simulation for natural spinning behavior:
```typescript
const spinWheel = (targetAngle: number) => {
  const friction = 0.96;
  let velocity = initialVelocity;

  const animate = () => {
    velocity *= friction;
    currentAngle += velocity;

    if (velocity < stopThreshold) {
      // Settle on winner
    } else {
      requestAnimationFrame(animate);
    }
  };
};
```

### State Migration System

Backward-compatible version migration:
```typescript
const migrateState = (state: any, version: number) => {
  if (version < 2) {
    // Migrate v1 to v2
    state.gameMode = 'first-win';
  }
  if (version < 3) {
    // Migrate v2 to v3
    state.ladderHeight = 5;
  }
  return state;
};
```

## Use Cases

- **Streamers**: Integrate with Twitch/YouTube for paid entry giveaways
- **Educators**: Random student selection with custom terminology
- **Event Organizers**: Raffle drawings and elimination tournaments
- **Game Masters**: D&D initiative order or random encounters
- **Teams**: Fair task assignment or team member selection
- **Content Creators**: Audience engagement and interactive content

## GitHub Repository

Full source code, documentation, and contribution guidelines:
[https://github.com/CrandellWS/gamewheel](https://github.com/CrandellWS/gamewheel)

## Documentation

Comprehensive guides available in the repository:
- **README.md** - Setup and features overview
- **FULL_TILT_USER_GUIDE.md** - Ladder climb mode details
- **CHAT_INTEGRATION.md** - Platform integration setup
- **DEPLOYMENT.md** - Hosting options and instructions

## Version History

**v2.2.0** - Full Tilt Mode
- Ladder climb game mode
- Animated progress tracking
- Champion celebrations
- Documentation expansion

**v2.0** - Game Modes & Chat
- Last Remaining elimination mode
- Chat platform integration
- Configurable terminology
- Enhanced history tracking

**v1.0** - Initial Release
- First Win mode
- Weighted probability
- Dark mode
- CSV export

## Contributing

Contributions welcome! See the [GitHub repository](https://github.com/CrandellWS/gamewheel) for guidelines.

## License

MIT License - Open source and free to use.

---

**Built with AI-speed development** - Demonstrating 70% faster development through parallel team orchestration while maintaining production quality and zero errors.
