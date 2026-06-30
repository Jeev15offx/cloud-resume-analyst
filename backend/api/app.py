from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

import os
import logging

# -----------------------------
# Load Environment Variables
# -----------------------------
load_dotenv()

# -----------------------------
# Logging Configuration
# -----------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s: %(message)s"
)

logger = logging.getLogger(__name__)

# -----------------------------
# Flask App
# -----------------------------
app = Flask(__name__)
CORS(app)

# -----------------------------
# Environment Variables
# -----------------------------
APP_NAME = os.getenv("APP_NAME", "Cloud Resume Analyst")
APP_VERSION = os.getenv("APP_VERSION", "1.0")
APP_ENV = os.getenv("APP_ENV", "development")

logger.info(f"{APP_NAME} Backend Started")
logger.info(f"Environment: {APP_ENV}")

# -----------------------------
# Standard API Response
# -----------------------------
def api_response(success, message, data=None):
    return jsonify({
        "success": success,
        "message": message,
        "data": data
    })

# -----------------------------
# Home Endpoint
# -----------------------------
@app.route("/api/v1/")
def home():

    return api_response(
        success=True,
        message="Application is running",
        data={
            "application": APP_NAME,
            "version": APP_VERSION,
            "environment": APP_ENV,
            "status": "running"
        }
    )

# -----------------------------
# Health Check Endpoint
# -----------------------------
@app.route("/api/v1/health")
def health():

    return api_response(
        success=True,
        message="Health check successful",
        data={
            "status": "healthy"
        }
    )

# -----------------------------
# Resume Analysis Endpoint
# -----------------------------
@app.route("/api/v1/analyze", methods=["POST"])
def analyze():

    data = request.get_json()

    logger.info("Resume analysis request received")

    if not data:

        logger.error("No JSON payload received")

        return api_response(
            success=False,
            message="Invalid request payload",
            data=None
        ), 400

    resume = data.get("resume", "").lower()
    job = data.get("job", "").lower()

    if resume == "":
        logger.warning("Empty resume submitted")

    if job == "":
        logger.warning("Empty job description submitted")

    tech_skills = [
        "aws",
        "azure",
        "gcp",
        "docker",
        "kubernetes",
        "terraform",
        "jenkins",
        "linux",
        "python",
        "java",
        "git",
        "github",
        "ansible",
        "prometheus",
        "grafana",
        "mysql",
        "sql",
        "mongodb",
        "react",
        "node",
        "javascript"
    ]

    matched = []
    missing = []

    for skill in tech_skills:

        if skill in job:

            if skill in resume:
                matched.append(skill)

            else:
                missing.append(skill)

    total_skills = len(matched) + len(missing)

    if total_skills > 0:
        score = int((len(matched) / total_skills) * 100)
    else:
        score = 0

    roadmap = []

    for index, skill in enumerate(missing):

        roadmap.append(
            f"Step {index + 1}: Learn {skill}"
        )

    strengths = []

    if "aws" in matched:
        strengths.append("Cloud")

    if "docker" in matched:
        strengths.append("Containers")

    if "kubernetes" in matched:
        strengths.append("Container Orchestration")

    if "python" in matched:
        strengths.append("Automation")

    if "linux" in matched:
        strengths.append("System Administration")

    if score >= 80:
        strength_level = "Strong"

    elif score >= 50:
        strength_level = "Intermediate"

    else:
        strength_level = "Beginner"

    # -----------------------------
    # Final Result
    # -----------------------------
    result = {
        "score": score,
        "strength_level": strength_level,
        "matched_skills": matched,
        "missing_skills": missing,
        "strengths": strengths,
        "roadmap": roadmap
    }

    logger.info(f"Analysis completed with score: {score}%")

    return api_response(
        success=True,
        message="Resume analysis completed successfully",
        data=result
    )

# -----------------------------
# Run Flask
# -----------------------------
if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
