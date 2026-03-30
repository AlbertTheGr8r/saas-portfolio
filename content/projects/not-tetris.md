---
title: "Not-Tetris: A Dual-Perspective Tetris Experience"
date: "2026-03-28"
status: "completed"
excerpt: "Developing a competitive local multiplayer Tetris variant with a shared grid, dual perspective rendering, and AI opponents."
tags: ["game-development", "react", "typescript", "zustand", "ai"]
techStack: ["React 19", "TypeScript", "Zustand", "Tailwind CSS v4", "Vite"]
demoUrl: "https://outcrop.antiparity.net/"
draft: false
---

Not every game needs to reinvent the wheel. Sometimes, the most interesting ideas emerge from asking a simple question: what if we combine this with another thing? That question led us down a grind of perspective-dependent rendering and an AI system that had to learn an entirely new way to think about territory.

Presenting: [Outcrop](https://outcrop.antiparity.net/)

## The Core Idea: Shared Space, Separate Realities

The concept behind Not-Tetris is deceptively simple. Imagine a tetris 10×20 grid where every single cell belongs to either Player 1 or Player 2—there is no empty space in the traditional sense. When you look at the board from P1's perspective, your blocks are solid and P2's blocks appear as empty voids. From P2's perspective, the inverse is true. Each player experiences what feels like a normal game of Tetris, but they're constantly pushing into each other's territory, fighting for control of the same physical space.

This creates a fundamentally different strategic landscape than traditional versus Tetris. There's no garbage system, no random attacks to stack precariously. Every piece you place directly converts cells from your opponent's territory to your own, and every line clear doesn't just remove blocks—it floods the opponent's side with fresh space while reclaiming yours. The game becomes a zero-sum battle for board real estate where aggression and defense are the same action.

## The Game Engine: Pure Functions in a Stateful World

We separated the engine into pure, framework-agnostic modules that could be tested independently and reused across different contexts. The `game-logic.ts` module handles grid creation and piece spawning—pure functions that take a seed and return a deterministic board state. The `collision.ts` module determines whether a piece can exist at a given position, taking into account the unique gravity direction for each player. P1's pieces fall downward from the top, while P2's pieces rise upward from the bottom.

The `turf.ts` module (the line-clearing and territory logic) is where the magic happens. When a player clears a line, the game calculates which rows were affected based on that player's perspective, removes the line from the unified grid, and fills the void with the opponent's color. This creates the satisfying territorial dynamics we wanted: your line clears are always felt by your opponent, whether they're advantageous or disastrous for your own position.

Scoring follows a variation of modern Tetris, with back-to-back multipliers rewarding difficult clears like T-spins and tetrises. We implemented both modern and classic modes, the latter with reduced previews and slower speed curves for players who prefer a more measured pace.

## Rendering: The Dual Perspective Problem

Rendering proved to be one of our most interesting technical challenges. The game supports three distinct view modes: single board (where you see the active player's perspective), dual board (split-screen showing both players' views simultaneously), and a practice mode that renders the unified grid with both players' pieces visible.

For single-board rendering, we developed a perspective system in `PlayField.tsx` that transforms the unified grid into whatever the player needs to see. When P1 is playing, the grid is rendered as-is with P1's blocks shown as solid and P2's blocks rendered as empty. For P2, we apply a visual flip—the grid is rendered upside-down so that "down" for P2 corresponds to the bottom of the screen, even though physically their pieces are growing upward from row 19.

The dual-board mode displays both perspectives side-by-side with a VS separator between them. This is particularly engaging for local multiplayer, as each player can focus on their own board without seeing their opponent's pieces directly—creating that tense uncertainty about what's happening on the other side.

## The AI: Learning to Fight Itself

Building an AI for Not-Tetris showed a new perspective following conventional Tetris bot design. Traditional heuristics optimize for things like aggregate board height and hole count, but those concepts don't translate cleanly to a shared grid where "height" is relative to your perspective and "holes" might actually be opponent territory you want to maintain.

We developed a heuristic evaluation system with nine distinct features. Here are the key ones:
- Frontier height measures the average depth of your territory baseline. 
- True holes count opponent cells buried beneath your blocks - these are particularly dangerous because you can't easily reclaim them without clearing multiple lines. 
- Territory contamination tracks exposed opponent cells in your half of the board, which are problematic but not immediately threatening. 
- Bumpiness measures the variance between adjacent column heights, 
- While overextension squared heavily penalizes spikes that push too deep into enemy territory—essentially warning the AI not to overcommit to aggressive plays that could cost it spawn protection.

The AI normalizes the grid for each evaluation, flipping P2's perspective to match P1's so a single heuristic model can play either side optimally. It enumerates all possible rotations and column positions, simulates each placement at maximum speed, evaluates the resulting board state, and selects the move with the highest weighted score. We implemented three difficulty levels with distinct weight profiles: Easy prioritizes stability, Normal balances defensive and offensive play, and Hard pushes for aggressive territory expansion with dynamic weight adjustment as matches progress.

A fascinating emergent behavior from training: the AI learned that the midline (rows 9-10) is a psychological as much as physical boundary. It developed strategies around maintaining just enough presence in opponent territory to create pressure while keeping enough depth at home to survive spawn collisions.

## State Management: Zustand in Practice

We chose Zustand for state management after considering several alternatives, and it proved ideal for our needs. The game store in `gameStore.ts` handles all game state: grid, players, scores, hold pieces, next queues, and UI state like active player and board view. Zustand's selector pattern allowed us to write components that only re-render when the specific state they need changes, which was critical for maintaining performance during matches.

The store implements all game actions: movement, rotation, hard drops, holds, and the game tick that processes gravity for both players simultaneously. We made the deliberate choice to process both players in the same tick, handling P1's downward gravity and P2's upward gravity in sequence within a single frame. This ensures fair simultaneous play where neither player gets a timing advantage.

## Controls and Input: Dual Input Streams

Local multiplayer meant supporting two completely independent input streams. P1 uses WASD for movement, Q/E for rotation, and Shift for hold. P2 uses J/L for movement, U/O for rotation, and Enter or Right Shift for hold. The input system in `useControls.ts` listens for key events and dispatches actions to the appropriate player based on which keys were pressed, handling both pressed and held states for smooth movement.

## Visual Effects: Feedback Systems

A competitive game lives or dies on its feedback systems. We implemented a visual effects framework that triggers various animations for lock events, line clears, hold flashes, and opponent effects. When you clear lines in versus mode, your opponent sees a row push effect and a glow indicating which lines were cleared on your side. This creates that crucial sense of impact—you always know when you've applied pressure, even without seeing your opponent's screen.

## What We Learned

This project taught me several valuable lessons. First, perspective-dependent game logic requires careful separation between the authoritative game state and the rendered view. The unified grid is the single source of truth, but each player needs a different interpretation of that truth. Second, AI heuristics designed for one game type rarely translate directly to variants--you need to understand the underlying strategic dynamics before you can encode them in evaluation functions. Third, state management libraries like Zustand shine when you need fine-grained reactivity without the overhead of context providers or more complex solutions.

## Looking Forward

The foundation we've built opens up several interesting directions. A replay system based on recorded inputs and seeds could allow matches to be shared and spectated without transmitting continuous game state. Online multiplayer would extend the local experience to remote players, requiring a deterministic sync model to ensure both clients see identical game states. We're also intrigued by the possibility of custom game modes that break the 50/50 starting equilibrium—introducing asymmetrical scenarios that challenge players in different ways.

The game is playable now, and we're excited to see where these possibilities take us.
