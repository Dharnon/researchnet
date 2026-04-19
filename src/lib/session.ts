import { cookies } from 'next/headers';
import crypto from 'crypto';

const COOKIE_NAME = 'session';
const STATE_COOKIE = 'orcid_oauth_state';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('SESSION_SECRET must be set (>=16 chars) in production');
    }
    // Dev fallback so the app still boots without .env
    return 'dev-only-insecure-secret-change-me';
  }
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

function buildToken(orcid: string): string {
  return `${orcid}.${sign(orcid)}`;
}

function verifyToken(token: string | undefined): string | null {
  if (!token) return null;
  const idx = token.lastIndexOf('.');
  if (idx === -1) return null;
  const orcid = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  const expected = sign(orcid);
  if (sig.length !== expected.length) return null;
  try {
    const ok = crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    return ok ? orcid : null;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  return verifyToken(cookieStore.get(COOKIE_NAME)?.value);
}

export async function setSession(orcid: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, buildToken(orcid), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// ─── OAuth state (CSRF) ───────────────────────────────────────────────

export function generateState(): string {
  return crypto.randomBytes(16).toString('base64url');
}

export async function setOAuthState(state: string) {
  const cookieStore = await cookies();
  cookieStore.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10, // 10 min
  });
}

export async function consumeOAuthState(): Promise<string | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(STATE_COOKIE)?.value ?? null;
  cookieStore.delete(STATE_COOKIE);
  return value;
}

// Token helpers exported for the callback (it sets the cookie on a Response).
export const sessionCookie = {
  name: COOKIE_NAME,
  maxAge: MAX_AGE,
  buildToken,
};

export const stateCookie = {
  name: STATE_COOKIE,
};
