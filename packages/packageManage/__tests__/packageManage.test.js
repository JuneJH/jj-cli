'use strict';

const packageManage = require('..');
const assert = require('assert').strict;

assert.strictEqual(packageManage(), 'Hello from packageManage');
console.info('packageManage tests passed');
