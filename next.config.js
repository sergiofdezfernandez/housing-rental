const withTM = require('next-transpile-modules')(["antd",
  "@ant-design/icons",
  "@ant-design/icons-svg",
  "rc-pagination",
  "rc-picker",
  "rc-util",
  "rc-tree",
  "rc-tooltip"]);
  
module.exports = withTM({
  env:{
    address:"0xf6E1EDc5926888D66202d712c9529489dD8EF185"
  }
})
