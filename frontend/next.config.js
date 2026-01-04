/** @type {import('next').NextConfig} */
const nextConfig = {
  
  env: {
    // Azure の「環境変数」に登録してある名前（NEXT_PUBLIC_API_ENDPOINT）に合わせます
    API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  },
}

module.exports = nextConfig
