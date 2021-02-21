import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue(), WindiCSS()],
}
