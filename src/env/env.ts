const REQUIRED_ENV_VARS = ["FOURSQUARE_API_KEY"];

function loadEnv(keys: string[]): Record<string, string> {
  const env: Record<string, string> = {};

  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (!value) throw new Error(`${key} wasn't provided in .env`);
    env[key] = value;
  }

  return env;
}

export const env = loadEnv(REQUIRED_ENV_VARS);

if (env.FOURSQUARE_API_KEY!.length < 20) {
  throw new Error("FOURSQUARE_API_KEY is too short to be a real API key");
}
