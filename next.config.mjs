const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  images: {
    domains: ['digitalcampus.msmfclasses.com', 'www.recw.ac.in','rmjit.com','production.msmfclasses.com','www.rmjit.com','digitalcampus.msmfclasses.com:90'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config, options) {
    if (isProd && process.env.GENERATE_SOURCEMAP === 'false') {
      config.devtool = false;
    }
    return config;
  },
};

export default nextConfig
