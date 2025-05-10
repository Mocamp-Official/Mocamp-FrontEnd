import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import KakaoLoginButton from '@/components/auth/KakaoLoginButton';
import NaverLoginButton from '@/components/auth/NaverLoginButton';
import MocampIcon from '@/public/svgs/MocampIcon.svg';
import { getGoogleProcess, getNaverProcess, getKakaoProcess } from '@/apis/auth';

type platformType = 'naver' | 'kakao' | 'google' | null;

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [platform, setPlatform] = useState<platformType>(null);

  useEffect(() => {
    const handleNaverLogin = async (): Promise<void> => {
      const code: string | null = new URL(window.location.href).searchParams.get('code');
      const success: boolean | undefined = await getNaverProcess(code);
      success && router.push('/myhome');
    };

    const handleGoogleLogin = async () => {
      const code: string | null = new URL(window.location.href).searchParams.get('code');
      const success: boolean | undefined = await getGoogleProcess(code);
      success && router.push('/myhome');
    };

    const handleKakaoLogin = async (): Promise<void> => {
      const code: string | null = new URL(window.location.href).searchParams.get('code');
      const success: boolean | undefined = await getKakaoProcess(code);
      success && router.push('/myhome');
    };

    // handleNaverLogin();
    handleKakaoLogin();
    handleGoogleLogin();
  }, []);

  return (
    <div className="flex bg-[#ffffff] w-screen h-screen">
      <div className="h-100% mx-auto justify-center items-center flex flex-col bg-[#ffffff]">
        <MocampIcon />
        <div className="mt-8 mb-32 text-2xl font-medium">
          <p>
            모캠프는 <span className="text-[#27CFA5] font-semibold">로그인</span> 후
          </p>
          <p className="mt-2">시작할 수 있어요 :D</p>
        </div>
        <div className="flex flex-col gap-5 w-[600px]">
          <NaverLoginButton />
          <KakaoLoginButton />
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
