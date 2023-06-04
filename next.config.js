const withTM = require('next-transpile-modules')(["antd",
  "@ant-design/icons",
  "@ant-design/icons-svg",
  "rc-pagination",
  "rc-picker",
  "rc-util",
  "rc-tree",
  "rc-tooltip"]);
module.exports = withTM({})
