// OBJECTIVE: Practice registers, yanking, macros, and the dot command
//
// Tasks:
//   1. Yank the `baseConfig` object into register "a": "ayip (yank-inner-paragraph)
//   2. Paste register "a" below the `prodConfig` object: "ap
//   3. Record a macro to convert each `const` to `export const`:
//      qa → ^ciwexport const<Esc> → j → q → then 5@a
//   4. Use the dot command: change `timeout: 5000` to `timeout: 10000`
//      using ci" or ct, → then move to next occurrence → press .
//   5. Yank the word `development` into register "b": "byiw
//   6. Replace `staging` with the contents of register "b": ciw<C-r>b
//   7. Delete lines 60-63 into the black hole register: "_4dd (won't clobber clipboard)
//   8. Use :reg to inspect your registers after each operation
//
// TIMING: Expert 50s | Proficient 100s | Learning 200s

const baseConfig = {
  host: "localhost",
  port: 3000,
  timeout: 5000,
  retries: 3,
  debug: true,
}

const prodConfig = {
  host: "api.production.internal",
  port: 443,
  timeout: 5000,
  retries: 5,
  debug: false,
}

const stagingConfig = {
  host: "api.staging.internal",
  port: 443,
  timeout: 5000,
  retries: 3,
  debug: true,
}

const developmentConfig = {
  host: "localhost",
  port: 3000,
  timeout: 5000,
  retries: 1,
  debug: true,
}

// These should all become `export const` via macro:
const API_VERSION = "v2"
const MAX_CONNECTIONS = 100
const CACHE_TTL = 3600
const RATE_LIMIT = 1000
const BATCH_SIZE = 50
const RETRY_DELAY = 1000

// Delete these deprecated lines into black hole register (don't pollute clipboard):
const OLD_API = "v1"
const LEGACY_HOST = "old.api.internal"
const DEPRECATED_TTL = 600
const UNUSED_FLAG = true

// Keep these:
const FEATURE_FLAGS = {
  newAuth: true,
  betaUI: false,
  darkMode: true,
}
