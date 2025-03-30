/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",  // 일단 바로 로그인으로 리다이렉션션
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
