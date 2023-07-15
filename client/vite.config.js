import react from '@vitejs/plugin-react-swc';
import { createProxyMiddleware } from 'http-proxy-middleware';

// https://vitejs.dev/config/
export default {
  plugins: [react()],

  server: {
    middleware: [
      createProxyMiddleware('/api', {
        target: 'http://localhost:5174', // Replace with your backend server URL
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // Remove '/api' from the request URL
        },
      }),
    ],
  },
};
