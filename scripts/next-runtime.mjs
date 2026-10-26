import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { dirname } from "node:path";

const require = createRequire(import.meta.url);
const env = { ...process.env };
// Use Next's bundled JS/WASM compiler on Windows where native addons can be blocked.
if (process.platform === "win32") {
  env.NEXT_TEST_WASM = "1";
  env.NEXT_TEST_WASM_DIR = dirname(require.resolve("@next/swc-wasm-nodejs"));
}
const child = spawn(
  process.execPath,
  [require.resolve("next/dist/bin/next"), ...process.argv.slice(2)],
  {
    stdio: "inherit",
    env,
    windowsHide: true,
  },
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill(signal));
child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
