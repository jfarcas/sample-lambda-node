# Lambda Test Node.js

Test repository for the [Lambda Deploy Action](https://github.com/jfarcas/lambda-deploy-action) reusable GitHub action.

## Purpose

This repository tests the `jfarcas/lambda-deploy-action` reusable action with a simple Node.js Lambda function.

## Usage

1. Go to the **Actions** tab
2. Run "Deploy Node.js Lambda" workflow  
3. Select your environment (dev/pre/prod)

## Files

- **[index.js](index.js)** - Simple Node.js Lambda function
- **[package.json](package.json)** - Node.js dependencies and scripts
- **[.github/config/lambda-deploy-config.yml](.github/config/lambda-deploy-config.yml)** - Deploy action configuration
- **[version.txt](version.txt)** - Version tracking

## Local Testing

```bash
npm install    # Install dependencies
npm test      # Run tests  
npm run local-test  # Test locally
```

## Setup

### Required Secrets
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_ROLE_ARN` - AWS role ARN (optional)
- `TEAMS_WEBHOOK_URL` - Teams notifications (optional)

### Required Variables  
- `S3_BUCKET_NAME` - S3 bucket for artifacts
- `LAMBDA_FUNCTION_NAME` - Lambda function name
- `AWS_REGION` - AWS region

## Action Repository

[jfarcas/lambda-deploy-action](https://github.com/jfarcas/lambda-deploy-action) - Main action repository with full documentation.