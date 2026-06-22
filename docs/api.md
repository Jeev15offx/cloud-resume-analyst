# Cloud Resume Analyst API Documentation

## Overview

The Cloud Resume Analyst backend provides a REST API that analyzes a resume against a job description and returns:

* Job match score
* Matched technical skills
* Missing technical skills
* Strength areas
* Learning roadmap

---

## Base URL

Local Development:

http://127.0.0.1:5000

---

## Endpoint

### POST /analyze

Analyzes resume content against a job description.

---

## Request

### URL

POST /analyze

### Headers

Content-Type: application/json

### Request Body

```json
{
  "resume": "AWS Git Linux Python",
  "job": "AWS Docker Kubernetes Terraform Jenkins Python"
}
```

---

## Sample cURL Request

```bash
curl -X POST http://127.0.0.1:5000/analyze \
-H "Content-Type: application/json" \
-d '{
"resume":"AWS Git Linux Python",
"job":"AWS Docker Kubernetes Terraform Jenkins Python"
}'
```

---

## Success Response

Status Code:

200 OK

Example Response:

```json
{
  "score": 33,
  "strength_level": "Beginner",
  "matched_skills": [
    "aws",
    "python"
  ],
  "missing_skills": [
    "docker",
    "kubernetes",
    "terraform",
    "jenkins"
  ],
  "strengths": [
    "Cloud",
    "Automation"
  ],
  "roadmap": [
    "Step 1: Learn docker",
    "Step 2: Learn kubernetes",
    "Step 3: Learn terraform",
    "Step 4: Learn jenkins"
  ]
}
```

---

## Response Fields

| Field          | Description                                     |
| -------------- | ----------------------------------------------- |
| score          | Job match percentage                            |
| strength_level | Beginner, Intermediate, or Strong               |
| matched_skills | Skills found in both resume and job description |
| missing_skills | Skills required by job but absent in resume     |
| strengths      | Resume strength categories                      |
| roadmap        | Recommended learning path                       |

---

## Supported Technical Skills

* AWS
* Azure
* GCP
* Docker
* Kubernetes
* Terraform
* Jenkins
* Linux
* Python
* Java
* Git
* GitHub
* Ansible
* Prometheus
* Grafana
* MySQL
* SQL
* MongoDB
* React
* Node.js
* JavaScript

---

## Architecture Flow

Frontend
→ JavaScript Fetch API
→ Flask Backend
→ Resume Analysis Engine
→ JSON Response
→ Frontend Display

---

## Version

v1.0

---

## Author

Jeevan.S
Cloud Resume Analyst Project
