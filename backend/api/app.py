from flask import Flask, request, jsonify
from flask_cors import CORS

from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

APP_NAME = os.getenv("APP_NAME")
APP_VERSION = os.getenv("APP_VERSION")
APP_ENV = os.getenv("APP_ENV")


CORS(app)


@app.route("/")
def home():
    return jsonify({
         "application":APP_NAME,
         "version":APP_VERSION,
         "environment":APP_ENV,
         "status":"running"
    })

@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.get_json()

    resume = data.get("resume", "").lower()
    job = data.get("job", "").lower()

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

    score = 0

    if len(matched) + len(missing) > 0:
        score = int(
            (len(matched) /
             (len(matched) + len(missing))) * 100
        )

    roadmap = []

    for i, skill in enumerate(missing):
        roadmap.append(
            f"Step {i + 1}: Learn {skill}"
        )

    strengths = []

    if "aws" in matched:
        strengths.append("Cloud")

    if "docker" in matched:
        strengths.append("Containers")

    if "kubernetes" in matched:
        strengths.append("Orchestration")

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

    result = {
        "score": score,
        "strength_level": strength_level,
        "matched_skills": matched,
        "missing_skills": missing,
        "strengths": strengths,
        "roadmap": roadmap
    }

    return jsonify(result)


if __name__ == "__main__":
    app.run(

        host="0.0.0.0",
        port=5000,
        debug=True
    )
