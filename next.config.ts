import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  output: 'export', // Это включает статический экспорт
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['next-image-export-optimizer'],
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public/images',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: '75',
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
    nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
    nextImageExportOptimizer_generateAndUseBlurImages: 'true',
    nextImageExportOptimizer_remoteImageCacheTTL: '0',
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'fonts/name.ext',
          publicPath: '/fonts/',
          esModule: false
        },
      },
    });
    return config;
  },
};

export default nextConfig;
