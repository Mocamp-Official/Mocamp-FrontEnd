import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const sessionId = req.body.sessionId;

  // 세션 생성
  const sessionRes = await fetch(`${BACKEND_URL}/api/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customSessionId: sessionId }),
  });

  const session = await sessionRes.text(); 

  // 토큰 발급
  const tokenRes = await fetch(`${BACKEND_URL}/api/sessions/${session}/connections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const token = await tokenRes.text();

  res.status(200).json({ sessionId: session, token });
}
