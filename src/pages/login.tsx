import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import KakaoLoginButton from '@/components/auth/KakaoLoginButton';
import NaverLoginButton from '@/components/auth/NaverLoginButton';
import MocampIcon from '@/public/svgs/MocampIcon.svg';

export default function LoginPage() {
  return (
    <div className="flex bg-[#F2F2F2] w-screen h-screen">
      <div className="w-[660px] h-100% mx-auto justify-center items-center flex flex-col bg-[#ffffff]">
        <MocampIcon />
        <p className="my-10 text-2xl">
          함께 모여 캠키고 성취하는 우리만의 공간
        </p>
        <div className="flex flex-col gap-3">
          <NaverLoginButton></NaverLoginButton>
          <KakaoLoginButton></KakaoLoginButton>
          <GoogleLoginButton></GoogleLoginButton>
        </div>
      </div>
    </div>
  );
}
