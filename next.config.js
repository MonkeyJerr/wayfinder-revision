/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        // remotePatterns: [
        //   {
        //     protocol: 'https',
        //     hostname: 'sportshub.cbsistatic.com',
        //     port: '',
        //     pathname: '/i/**',
        //   },
        // ],
        unoptimized: true
      },
}



module.exports = nextConfig
