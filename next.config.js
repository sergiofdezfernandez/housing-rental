// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const withTM = require('next-transpile-modules')([
  'antd',
  '@ant-design/icons',
  '@ant-design/icons-svg',
  'rc-pagination',
  'rc-picker',
  'rc-util',
  'rc-tree',
  'rc-tooltip',
]);
// eslint-disable-next-line no-undef
module.exports = withTM({
  env: {
    address: '0xf6E1EDc5926888D66202d712c9529489dD8EF185',
  },
});
