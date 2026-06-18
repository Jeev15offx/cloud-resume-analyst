# Cloud Resume Analyst Architecture

## Current State

Frontend:
- HTML
- CSS
- JavaScript
- GitHub Pages

Resume analysis runs entirely inside the browser.

---

## Target Architecture

User Browser
    |
    v
GitHub Pages
    |
    v
API Gateway
    |
    v
AWS Lambda
    |
    v
DynamoDB

---

## Responsibilities

### GitHub Pages

- Hosts frontend
- Sends resume data

### API Gateway

- Receives requests
- Routes to Lambda

### Lambda

- Processes resume
- Calculates score
- Generates recommendations

### DynamoDB

- Stores analysis history
- Stores reports

---

## Benefits

- Serverless
- Low cost
- Scalable
- Cloud-native
