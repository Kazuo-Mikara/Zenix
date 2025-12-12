/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  env: {
    endpoint: process.env.VITE_APPWRITE_ENDPOINT,
    projectId: process.env.VITE_APPWRITE_PROJECT_ID
  },
  experimental: {
    useDeploymentId: true,
    // Optionally, use with Server Actions
    useDeploymentIdServerActions: true,
  },
};

export default nextConfig;
