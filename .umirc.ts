import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: false,
      title: '话单分析工具',
      dll: false,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  chainWebpack(config, {webpack}) {
    config.target('electron-renderer');
  },
  proxy: {
    "/dianhua_api": {
      "target": "http://mobsec-dianhua.baidu.com/",
      "changeOrigin": true
    }
  }
}

export default config;
