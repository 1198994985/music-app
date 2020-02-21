const {
  override,
  addWebpackAlias,
  addDecoratorsLegacy
} = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, "src")
  }),
  addDecoratorsLegacy()
);
