#!/usr/bin/env node

import fs from 'fs';
import readline from 'readline';

const BUNDLE_FILE = './bundle-extension.js';
const XCODE_PROJECT = './bundle/safari/Minimal Twitter/Minimal Twitter.xcodeproj/project.pbxproj';

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

// Get current build number from Xcode project
function getCurrentBuildNumber() {
  const content = fs.readFileSync(XCODE_PROJECT, 'utf8');
  const buildMatch = content.match(/CURRENT_PROJECT_VERSION = (\d+);/);
  if (!buildMatch) {
    throw new Error('Could not find CURRENT_PROJECT_VERSION in Xcode project');
  }
  return parseInt(buildMatch[1], 10);
}

// Update Xcode project version and build number
function updateXcodeProject(newVersion, newBuildNumber) {
  let content = fs.readFileSync(XCODE_PROJECT, 'utf8');

  // Update MARKETING_VERSION (all occurrences)
  content = content.replace(
    /MARKETING_VERSION = [\d.]+;/g,
    `MARKETING_VERSION = ${newVersion};`
  );

  // Update CURRENT_PROJECT_VERSION (all occurrences)
  content = content.replace(
    /CURRENT_PROJECT_VERSION = \d+;/g,
    `CURRENT_PROJECT_VERSION = ${newBuildNumber};`
  );

  fs.writeFileSync(XCODE_PROJECT, content, 'utf8');
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
    const currentBuildNumber = getCurrentBuildNumber();
    console.log(`Current version: ${currentVersion} (build ${currentBuildNumber})`);

    const bumpType = await promptUser();

    if (!['patch', 'minor', 'major'].includes(bumpType)) {
      console.error('Invalid option. Please choose: patch, minor, or major');
      process.exit(1);
    }

    const newVersion = bumpVersion(currentVersion, bumpType);
    const newBuildNumber = currentBuildNumber + 1;
    console.log(`Bumping ${bumpType} version: ${currentVersion} → ${newVersion} (build ${currentBuildNumber} → ${newBuildNumber})`);

    updateVersion(newVersion);
    console.log(`✓ Version updated to ${newVersion} in ${BUNDLE_FILE}`);

    updateXcodeProject(newVersion, newBuildNumber);
    console.log(`✓ Xcode project updated to ${newVersion} (build ${newBuildNumber})`);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
