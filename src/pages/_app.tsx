import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useRouter } from 'next/router';
import BasicHeader from '@/components/Header/BasicHeader';
import OnboardingHeader from '@/components/Header/OnboardingHeader';
import CreateJoinHeader from '@/components/Header/CreateJoinHeader';
import WorkspaceHeader from '@/components/Header/WorkSpaceHeader';


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter(); 
  const isLoginPage = router.pathname === '/login';
  return (
    <>
      {isLoginPage && <OnboardingHeader/>}
      <Component {...pageProps} />
    </>
  );
}


