import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "bun:test";

const projectRoot = dirname(fileURLToPath(import.meta.url));

test(
  "Vitest suite (package.json script `test`)",
  () => {
    const proc = Bun.spawnSync(["bun", "run", "test"], {
      cwd: projectRoot,
      stdout: "inherit",
      stderr: "inherit",
      env: process.env,
    });
    if (proc.exitCode !== 0) {
      throw new Error(`vitest exited with code ${proc.exitCode}`);
    }
  },
  { timeout: 120_000 },
);
