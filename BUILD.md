# Build Process for Lambda Deploy Action

This document explains how the Node.js Lambda function is built and packaged for deployment using the Lambda Deploy Action.

## 🔧 Build Scripts

The project includes several npm scripts for building and packaging:

### Core Build Scripts

```bash
# Clean build artifacts
npm run clean

# Full build process (install production deps + create zip)
npm run build

# Create deployment zip (assumes dependencies are installed)
npm run zip

# Test the build process
npm run test:build
```

### Build Process Flow

1. **Clean** - Remove any existing `lambda-function.zip`
2. **Install** - Install production dependencies only (`npm ci --production`)
3. **Zip** - Create deployment package with required files
4. **Verify** - Confirm the zip file was created successfully

## 📦 What Gets Packaged

### Included Files:
- `index.js` - Main Lambda function
- `node_modules/` - Production dependencies only
- `package.json` - Package metadata
- `package-lock.json` - Dependency lock file

### Excluded Files:
- `*.test.js` - Test files
- `test-local.js` - Local testing script
- `test-build.js` - Build testing script
- `jest.config.js` - Jest configuration
- `eslint.config.js` - ESLint configuration
- `.eslintrc.js` - Legacy ESLint config
- `logs/` - Log directory
- `.idea/` - IDE files
- `.git/` - Git repository files

## 🎯 Lambda Deploy Action Integration

The Lambda Deploy Action automatically detects and uses these scripts:

### Configuration (lambda-deploy-config.yml):
```yaml
build:
  commands:
    install: "npm ci"
    lint: "npm run lint"
    test: "npm test"
    build: "npm run build"    # Uses our build script
  
  artifact:
    path: "lambda-function.zip"    # Matches our zip output
```

### Automatic Build Process:
1. Action runs `npm ci` to install all dependencies
2. Action runs `npm run lint` for code quality
3. Action runs `npm test` for validation
4. Action runs `npm run build` to create deployment package
5. Action uploads `lambda-function.zip` to S3
6. Action deploys to Lambda function

## 🧪 Testing the Build

### Local Build Test:
```bash
# Test the complete build process
npm run test:build
```

This will:
- Clean existing artifacts
- Run the full build process
- Verify the zip file was created
- Show file size and creation time

### Manual Build Test:
```bash
# Clean and build manually
npm run clean
npm run build

# Verify the output
ls -la lambda-function.zip
```

## 🔍 Build Verification

### Expected Output:
```
lambda-function.zip    # ~2-5MB depending on dependencies
```

### Zip Contents Verification:
```bash
# List contents of the zip file
unzip -l lambda-function.zip

# Extract to temporary directory for inspection
mkdir temp-extract
unzip lambda-function.zip -d temp-extract
ls -la temp-extract/
rm -rf temp-extract
```

## 🚨 Troubleshooting

### Common Issues:

#### "No build script found"
- **Problem:** Missing `build` or `zip` script in package.json
- **Solution:** Ensure both scripts are present and properly configured

#### "zip command not found"
- **Problem:** `zip` utility not available in environment
- **Solution:** Install zip utility or use alternative packaging method

#### "Permission denied"
- **Problem:** Script files not executable
- **Solution:** Check file permissions and script syntax

#### Large zip file size
- **Problem:** Including unnecessary files or dev dependencies
- **Solution:** Review exclusion patterns and ensure production-only install

### Debug Commands:
```bash
# Check if zip utility is available
which zip

# Check package.json scripts
npm run

# Verify production dependencies only
npm ci --production
ls node_modules/

# Test zip creation manually
zip -r test.zip index.js node_modules/ package.json package-lock.json
```

## 📋 Requirements

### System Requirements:
- Node.js 18+ (matches Lambda runtime)
- npm (for package management)
- zip utility (for creating deployment package)

### Dependencies:
- Production dependencies will be included in the package
- Dev dependencies are excluded from deployment

## 🎯 Best Practices

### Package Size Optimization:
- Use `npm ci --production` to exclude dev dependencies
- Exclude test files and development tools
- Consider using webpack or similar bundlers for larger projects
- Review and minimize production dependencies

### Build Consistency:
- Use `package-lock.json` for consistent dependency versions
- Test builds in clean environments
- Verify zip contents before deployment
- Use semantic versioning in package.json

### Security:
- Exclude sensitive files from the zip
- Use `.gitignore` patterns for exclusions
- Regularly update dependencies
- Scan for vulnerabilities with `npm audit`

---

This build process ensures your Node.js Lambda function is properly packaged and ready for deployment with the Lambda Deploy Action! 🚀
