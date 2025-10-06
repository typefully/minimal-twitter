#!/usr/bin/env node

import fs from 'fs';
import readline from 'readline';

const BUNDLE_FILE = './bundle-extension.js';

// Read current version from bundle-extension.js
function getCurrentVersion() {
  const content = fs.readFileSync(BUNDLE_FILE, 'utf8');
  const versionMatch = content.match(/version:\s*"(\d+\.\d+\.\d+)"/);
  if (!versionMatch) {
    throw new Error('Could not find version in bundle-extension.js');
  }
  return versionMatch[1];
}

// Parse version string into parts
function parseVersion(version) {
  const parts = version.split('.').map(Number);
  return {
    major: parts[0],
    minor: parts[1],
    patch: parts[2]
  };
}

// Bump version based on type
function bumpVersion(version, type) {
  const v = parseVersion(version);

  switch (type) {
    case 'major':
      return `${v.major + 1}.0.0`;
    case 'minor':
      return `${v.major}.${v.minor + 1}.0`;
    case 'patch':
      return `${v.major}.${v.minor}.${v.patch + 1}`;
    default:
      throw new Error('Invalid bump type. Use: patch, minor, or major');
  }
}

// Update version in bundle-extension.js
function updateVersion(newVersion) {
  const content = fs.readFileSync(BUNDLE_FILE, 'utf8');
  const updatedContent = content.replace(
    /version:\s*"\d+\.\d+\.\d+"/,
    `version: "${newVersion}"`
  );
  fs.writeFileSync(BUNDLE_FILE, updatedContent, 'utf8');
}

// Create readline interface
function promptUser() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('Bump version (patch/minor/major): ', (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

// Main function
async function main() {
  try {
    const currentVersion = getCurrentVersion();
    console.log(`Current version: ${currentVersion}`);

    const bumpType = await promptUser();

    if (!['patch', 'minor', 'major'].includes(bumpType)) {
      console.error('Invalid option. Please choose: patch, minor, or major');
      process.exit(1);
    }

    const newVersion = bumpVersion(currentVersion, bumpType);
    console.log(`Bumping ${bumpType} version: ${currentVersion} → ${newVersion}`);

    updateVersion(newVersion);
    console.log(`✓ Version updated to ${newVersion} in ${BUNDLE_FILE}`);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
