#!/usr/bin/env node

/**
 * Test script to verify the build process works correctly
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Testing Lambda build process...\n');

try {
  // Clean any existing build artifacts
  console.log('1. Cleaning existing artifacts...');
  try {
    execSync('npm run clean', { stdio: 'inherit' });
  } catch (error) {
    console.log('   No existing artifacts to clean');
  }

  // Run the build process
  console.log('\n2. Running build process...');
  execSync('npm run build', { stdio: 'inherit' });

  // Check if the zip file was created
  console.log('\n3. Verifying build output...');
  const zipPath = path.join(__dirname, 'lambda-function.zip');
  
  if (fs.existsSync(zipPath)) {
    const stats = fs.statSync(zipPath);
    console.log(`✅ Build successful!`);
    console.log(`   📦 Artifact: lambda-function.zip`);
    console.log(`   📏 Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   📅 Created: ${stats.mtime.toISOString()}`);
  } else {
    console.log('❌ Build failed: lambda-function.zip not found');
    process.exit(1);
  }

  console.log('\n🎉 Build test completed successfully!');
  console.log('\nYou can now use this project with the Lambda Deploy Action.');

} catch (error) {
  console.error('\n❌ Build test failed:', error.message);
  process.exit(1);
}
