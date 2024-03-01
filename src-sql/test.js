const { readFileSync } = require("fs");
const yaml = require("js-yaml");
const { join } = require("node:path");

const YAML_CONFIG_FILENAME = "config.yml";
const filePath = join(__dirname, "./config", YAML_CONFIG_FILENAME);

const fn = () => {
  yaml.load(readFileSync(filePath, "utf8"));
}
