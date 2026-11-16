# Hive Night

A free theme for the Claude desktop app. It puts a dark hexagon floor behind the chat, with slow emerald and blue glows, cells that light up as if they're working, a few glowing bees and the odd comet. The chat sits on frosted glass above it.

![Hive Night](docs/preview.png)

## Install

In a terminal (needs the `claude` CLI):

```bash
claude plugin install hive-night --marketplace Errr0rr404/hive-night
```

Or ask Claude in any Code session of the desktop app: "Run `claude plugin install hive-night --marketplace Errr0rr404/hive-night`".

Then start a new session in the desktop app: the theme turns on when a session starts.

Typing `/plugin install …` in the desktop app's message box does not work: `/plugin` is a terminal command, and the desktop app doesn't have it. In Claude Code in a terminal, `/plugin install hive-night --marketplace Errr0rr404/hive-night` works too.

## Use

- `/hive-theme off` turns the backdrop off.
- `/hive-theme on` turns it back on.

## Notes

- You need a version of the Claude desktop app that draws mod backdrops. The terminal doesn't draw it.
- Everything is one animated SVG: no scripts, no network, no assets to download.
- If your system asks for reduced motion, the animation stops and the bees hide.
- Make it yours by changing the colors and the cell list in `hooks/scene.ts`.

## License

MIT, free to use and change. Made by [Zan](https://github.com/Errr0rr404).
