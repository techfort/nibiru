'use strict';

const args = require('minimist')(process.argv.slice(2));
const runner = require('./lib/runner');
const fs = require('fs');
const path = require('path');

const YAML = require('yamljs');
let event = JSON.parse(fs.readFileSync(path.join('.', args.p), { encoding: 'utf8' }) || {});
let func = args.f || args.function;
let base = args.b || args.basepath;

const config = YAML.load(path.join(__dirname, base || '', 'serverless.yml'));
config.base = path.join(__dirname, base);
if (!func) {
  throw new Error('Function not specified');
}

let result = runner(config, func, event);

module.exports = result; 
