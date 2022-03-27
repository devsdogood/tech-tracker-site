import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const dev = process.env.NODE_ENV !== 'production';
const server = dev
  ? 'http://localhost:3000'
  : 'https://tech-tracker-site.vercel.app';

export default async function middleware(req: NextApiRequest) {
  // Allow NextAuth requests
  if (req.url!.includes('/auth/')) {
    return NextResponse.next();
  }

  const token = await getToken({ req });
  if (!token) return NextResponse.redirect(`${server}/api/auth/signin`);

  return NextResponse.next();
}
