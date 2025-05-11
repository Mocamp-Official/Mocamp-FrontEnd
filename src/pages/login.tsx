import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getGoogleProcess, getNaverProcess, getKakaoProcess } from '@/apis/auth';
import MocampIcon from '@/public/svgs/MocampIcon.svg';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import KakaoLoginButton from '@/components/auth/KakaoLoginButton';
import NaverLoginButton from '@/components/auth/NaverLoginButton';

export type platformType = 'naver' | 'kakao' | 'google' | null;

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [platform, setPlatform] = useState<platformType>(null);

  useEffect(() => {
    const storedPlatform = localStorage.getItem('platform') as platformType;
    storedPlatform && setPlatform(storedPlatform);
  }, []);

  useEffect(() => {
    const code: string | null = new URL(window.location.href).searchParams.get('code');
    if (!code || !platform) return;

    const handleNaverLogin = async (): Promise<void> => {
      const success: boolean | undefined = await getNaverProcess(code);
      success && router.push('/myhome');
    };
    const handleGoogleLogin = async () => {
      const success: boolean | undefined = await getGoogleProcess(code);
      success && router.push('/myhome');
    };
    const handleKakaoLogin = async (): Promise<void> => {
      const success: boolean | undefined = await getKakaoProcess(code);
      success && router.push('/myhome');
    };

    if (platform === 'naver') {
      handleNaverLogin();
    } else if (platform === 'kakao') {
      handleKakaoLogin();
    } else if (platform === 'google') {
      handleGoogleLogin();
    }
  }, [platform]);

  return (
    <div className="flex bg-[#ffffff] w-screen h-screen">
      <div className="h-full mx-auto justify-center items-center flex flex-col bg-[#ffffff]">
        <MocampIcon />
        <div className="mt-[1.875rem] mb-[8.4375rem] text-[1.75rem] font-medium leading-[1.6]">
          <p>
            모캠프는 <span className="text-[#27CFA5] font-semibold">로그인</span> 후
          </p>
          <p>시작할 수 있어요 :D</p>
        </div>
        <div className="flex flex-col gap-5 w-[37.5rem]">
          <NaverLoginButton platform={platform} />
          <KakaoLoginButton platform={platform} />
          <GoogleLoginButton platform={platform} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
