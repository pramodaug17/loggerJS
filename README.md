# LiteLoggerJS

A lightweight, transport-based logger designed for **browser apps** (with an optional in-page **UI log window**) and extensible enough to work in **Node.js** by plugging in different transports.

> ✅ ESM-first, typed via JSDoc → `.d.ts` generation  \
> ✅ Transport architecture (UI/Console/Custom)  \
> ✅ Fluent/chaining API (`returns this`)

---

## Badges

[![npm version](https://img.shields.io/npm/v/liteloggerjs.svg)](https://www.npmjs.com/package/liteloggerjs)
[![npm downloads](https://img.shields.io/npm/dm/liteloggerjs.svg)](https://www.npmjs.com/package/liteloggerjs)
[![license](https://img.shields.io/npm/l/liteloggerjs.svg)](./LICENSE)
[![types](https://img.shields.io/badge/types-.d.ts-blue.svg)](#type-support)
[![bundle size](https://img.shields.io/bundlephobia/minzip/liteloggerjs)](https://bundlephobia.com/package/liteloggerjs)
[![CI](https://img.shields.io/github/actions/workflow/status/pramodaug17/loggerJS/ci.yml)](https://github.com/pramodaug17/loggerJS/actions)

---

## Features

- **Transport-based logging**: add/remove outputs without changing the logger core.
- **Browser UI transport**: render logs in an on-page window.
- **Node-ready**: detach browser-only transport and use Console/File/HTTP transports.
- **Log levels**: `ERROR`, `WARN`, `INFO`, `DEBUG`, `VERBOSE`.
- **Fluent API**: chain configuration calls.
- **Type support**: JSDoc-driven type generation for `.d.ts`.
- **Safe UI rendering**: recommended approach uses `textContent` (avoids HTML injection).

---

## Installation

### npm

```bash
npm i liteloggerjs
```

### pnpm

```bash
pnpm add liteloggerjs
```

### yarn

```bash
yarn add liteloggerjs
```

---

## Quick Start

### Browser (with UI log window)

```js
import LiteLogger, { LogLevel } from "liteloggerjs";
import { UITransport } from "liteloggerjs"; // or "liteloggerjs/browser" if you expose a browser entry

const logger = new LiteLogger({ isEnabled: true, logLevel: LogLevel.DEBUG })
  .addTransport(new UITransport())
  .initialize();

logger.info("Hello from browser!");
logger.debug("Debug info...");
logger.error("Something went wrong!");
```

> Tip: Include the package CSS (or your own) to style the log window.

### Node.js (recommended approach)

In Node, you typically do **not** want `UITransport`. Instead, attach a console (or file/network) transport.

```js
import LiteLogger, { LogLevel } from "liteloggerjs";
// import { ConsoleTransport } from "liteloggerjs/node"; (recommended split)

const logger = new LiteLogger({ isEnabled: true, logLevel: LogLevel.INFO })
  .addTransport(new ConsoleTransport())
  .initialize();

logger.info("Hello from Node!");
logger.warn("Heads up!");
```

---

## Usage Examples

### Change log level at runtime

```js
logger.setLogLevel(LogLevel.VERBOSE);
logger.verbose("Now logging at verbose level.");
```

### Enable / Disable logging

```js
logger.disable();
logger.info("This will NOT be logged.");

logger.enable();
logger.info("Logging enabled again.");
```

### Buffering before initialization

Depending on your implementation, logs can be buffered until `initialize()` is called.

```js
const logger = new LiteLogger();
logger.info("Buffered log (before initialize)");

logger.addTransport(new UITransport()).initialize();
logger.info("Printed after initialize");
```

---

## API Reference

### `LiteLogger` / `LoggerCore`

Create an instance:

```js
const logger = new LiteLogger(config);
```

#### Configuration

- `isEnabled` *(boolean)*: enable/disable logging
- `logLevel` *(number)*: minimum level to log

#### Methods

- `initialize(): this`  
  Initializes transports and flushes buffered logs.

- `addTransport(transport): this`  
  Adds a transport instance (UI/Console/custom).

- `setLogLevel(level): this`  
  Set the active log level.

- `enable(): this` / `disable(): this`  
  Toggle logging.

- `error(message: string): void`
- `warn(message: string): void`
- `info(message: string): void`
- `debug(message: string): void`
- `verbose(message: string): void`

---

## Log Levels

```js
LogLevel.ERROR   // 0
LogLevel.WARN    // 1
LogLevel.INFO    // 2
LogLevel.DEBUG   // 3
LogLevel.VERBOSE // 4
```

### Convert numeric level to string

If your package exports `LogLevelString`:

```js
import { LogLevelString, LogLevel } from "liteloggerjs";
console.log(LogLevelString[LogLevel.DEBUG]); // "DEBUG"
```

---

## Transports

### BaseTransport

Create your own transport by implementing:

- `init(): this`
- `log(logEntry): void`
- `destroy(): this` *(recommended)*

A `logEntry` typically includes:

- `timestamp: Date`
- `level: number`
- `message: string`

### UITransport (Browser)

Renders logs into a floating on-page window.

Recommended behaviors:

- the log container is scrollable
- after each log, it auto-scrolls to the end

### Create a Custom Transport (Example)

```js
import { BaseTransport, LogLevelString } from "liteloggerjs";

export class ConsoleTransport extends BaseTransport {
  constructor() {
    super("ConsoleTransport");
  }

  init() {
    return this;
  }

  log(entry) {
    const level = LogLevelString?.[entry.level] ?? String(entry.level);
    console.log(`[${level}] ${entry.message}`);
  }

  destroy() {
    return this;
  }
}
```

---

## Type Support

This library is typed via **JSDoc** and can generate `.d.ts` files during build.

If you use TypeScript or `// @ts-check` in JS projects, you’ll get:

- IntelliSense for logger APIs
- typed `LogLevel` enum values
- typed transport contracts (when JSDoc is configured)

---


## Development

### Build

```bash
pnpm run build
```

### Test (placeholder)

```bash
pnpm test
```

---

## Contributing

Contributions are welcome! 🎉

### How to contribute

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit changes with clear messages: `git commit -m "feat: add X"`
4. Push branch and open a PR

### Guidelines

- Keep changes small and focused
- Add/update docs for user-facing changes
- Ensure build passes before PR

---

## Security

If you discover a security issue, please avoid filing a public issue.
Instead, contact the maintainer privately (add email here).

---

## License

MIT © Pramod Jain  \
See [LICENSE](./LICENSE).

---

## Credits

Built with ❤️ for simple, extensible logging in browser and Node environments.
