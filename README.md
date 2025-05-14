# Tamagotchi Desktop

A modern desktop Tamagotchi app built with Electron and React.

## Features

- Cute virtual pet with real-time stats
- Feed, play, and put your pet to sleep
- Animated pet interactions
- Transparent window with modern UI
- Stats tracking (hunger, happiness, energy, age)

## Development

1. Install dependencies:
```bash
npm install
```

2. Run in development mode:
```bash
npm run dev
```

3. In a separate terminal, start Electron:
```bash
npm run electron:dev
```

## Building

To build the application:

```bash
npm run build
```

## Controls

- Feed: Increases hunger stat
- Play: Increases happiness (requires energy)
- Sleep: Recovers energy (decreases hunger)

## Stats

- Hunger: Decreases over time, increase by feeding
- Happiness: Decreases slowly, increase by playing
- Energy: Decreases when playing, recover by sleeping
- Age: Increases over time

## License

MIT