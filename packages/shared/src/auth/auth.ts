export type AuthConfig = {
  authServerPath: string;
  clientId: string;
  debugClientId?: string;
  language: string;
  isDebugApi?: boolean;
};

export type TokenResponse = {
  access_token: string;
  expires: string;
  expires_in: number;
  issued: string;
  refresh_token: string;
  token_type: string;
};

export async function login(
  user: string,
  pass: string,
  config: AuthConfig,
  authType = "Ghaf",
): Promise<TokenResponse> {
  const form = new URLSearchParams({
    client_id:
      config.isDebugApi && config.debugClientId
        ? config.debugClientId
        : config.clientId,
    client_secret: "",
    lang: config.language,
    username: user,
    password: pass,
    scope: "",
    grant_type: "password",
    authtype: authType,
  });

  const response = await fetch(`${config.authServerPath}Token`, {
    method: "POST",
    headers: {
      dataType: "text/plain",
      contentType: "application/x-www-form-urlencoded",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  if (response.status !== 200) {
    throw new Error(`Login request failed with status ${response.status}`);
  }

  return (await response.json()) as TokenResponse;
}