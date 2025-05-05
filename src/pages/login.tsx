import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import KakaoLoginButton from '@/components/auth/KakaoLoginButton';
import NaverLoginButton from '@/components/auth/NaverLoginButton';
import MocampIcon from '@/public/svgs/MocampIcon.svg';

const LoginPage = () => {
  return (
    <div className="flex bg-[#ffffff] w-screen h-screen">
      <div className="h-100% mx-auto justify-center items-center flex flex-col bg-[#ffffff]">
        <MocampIcon />
        <div className="mt-8 mb-32 text-2xl font-medium">
          <p>
            모캠프는{' '}
            <span className="text-[#27CFA5] font-semibold">로그인</span> 후
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
