import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const sessionId = req.body.sessionId;

  try {
    // 세션 생성 요청
    const sessionRes = await fetch(`${BACKEND_URL}/api/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customSessionId: sessionId }),
    });

    if (!sessionRes.ok) {
      const errorText = await sessionRes.text();
      console.error('[API] sessionRes failed:', errorText);
      return res.status(sessionRes.status).send(errorText);
    }

    const session = await sessionRes.text();

    // 토큰 발급 요청
    const tokenRes = await fetch(`${BACKEND_URL}/api/sessions/${session}/connections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      console.error('[API] tokenRes failed:', errorText);
      return res.status(tokenRes.status).send(errorText);
    }

    const token = await tokenRes.text();

    res.status(200).json({ sessionId: session, token });
  } catch (error) {
    console.error('[API] OpenVidu token fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch OpenVidu token' });
  }
}
