const fs        = require('fs');
const os        = require('os');
const path      = require('path');
const _         = require('lodash');
const bacnet    = require('@biancoroyal/bacstack');

const configFile = '.nodebacstackbrowser';

module.exports.getPropertyName = (id) => {
  let name = Object.keys(bacnet.enum.PropertyIdentifier).find(key => bacnet.enum.PropertyIdentifier[key] === id);
  if (!name) return;
  name = _.startCase(_.lowerCase(name.substring(5)));
  return name;
};

module.exports.getSettings = () => {
  try {
    return JSON.parse(fs.readFileSync(path.join(os.homedir(), configFile), {encoding: 'utf8'}));
  } catch (err) {
    return {};
  }
};

module.exports.setSettings = (settings, next) => {
  fs.writeFile(path.join(os.homedir(), configFile), JSON.stringify(settings), next);
};
