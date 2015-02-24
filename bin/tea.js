#!/usr/bin/env node

var tea = require('commander');
var pkg = require('../package.json');
var commands = require('./commands');

// ==== Tea Version
tea.version(pkg.version);

// ==== Tea Trace Option
tea.option('-t, --trace', 'Show trace output');

//================================================
// ==== General Commands
//================================================


//================================================
// ==== DB Commands
//================================================
tea
    .command('db:seed')
    .description('run seeds.js')
    .action(commands.dbSeed);

tea
    .command('db:migrate <migration>')
    .description('run specified migration or all')
    .action(commands.dbMigrate);

tea
    .command('db:rollback <migration>')
    .description('rollback migration or latest')
    .action(commands.dbRollback);

tea
    .command('db:clear')
    .description('clear all data')
    .action(commands.dbClear);
//================================================

// ==== Parse Tea
tea.parse(process.argv);

// ==== Print Help if no command is executed
if (!process.argv.slice(2).length) {
    tea.outputHelp();
}