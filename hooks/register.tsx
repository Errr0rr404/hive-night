import type { Register, ThemeColors } from 'claude-code'

import { hiveNightSvg } from './scene'

const PLUGIN = 'hive-night'
const ID = 'hive-night'
// Hive Night palette for the app's own surfaces (sidebar, panels, borders, accents), dark mode.
const COLORS: ThemeColors = {
  v: 1,
  id: 'hive-night',
  label: 'Hive Night',
  inputs: {
    dark: {
      'surface-0': '#050d10',
      'surface-1': '#08161a',
      'surface-2': '#0b1d22',
      'surface-3': '#0f252b',
      'text-primary': '#e8f3f0',
      'text-secondary': '#b2c6c1',
      'text-muted': '#83a09a',
      'text-disabled': '#53676a',
      'fill-primary': '#e8f3f0',
      'on-primary': '#04110f',
      border: '#15302f',
      'border-strong': '#1e4542',
      'border-stronger': '#2a625b',
      'fill-accent': '#10b981',
      'text-accent': '#34d399',
      'bg-accent': '#0b2e26',
      'on-accent': '#04110f',
      'border-accent': '#10b981',
    },
  },
}

const THEME = {
  backdrop: { scene: ID, glass: { blur: 22, tint: '#071a1d', opacity: 0.66 } },
  overrideColorScheme: 'dark' as const,
  colors: COLORS,
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const result = await next(e)
    await $.command.register({ name: 'hive-theme', description: 'Hive Night backdrop: on or off' })
    await $.theme.set(THEME)
    return result
  })

  on('command.run', { command: 'hive-theme' }, async ($, e) => {
    const arg = e.args.trim().toLowerCase()
    if (arg === 'off') {
      await $.theme.clear()
      return { text: 'Hive Night is off. /hive-theme on brings it back.' }
    }
    const set = await $.theme.set(THEME)
    return { text: set.isDrawn ? 'Hive Night is on.' : `Hive Night is set, but nothing draws it yet: ${set.reason}` }
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.props.plugin !== PLUGIN || e.props.scene !== ID || e.surface !== 'desktop') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)
    return <Svg isInteractive alt="Hive Night: a dark hexagon floor with emerald and blue glows" source={hiveNightSvg()} />
  })
}
