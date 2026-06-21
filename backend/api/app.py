from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return "Cloud Resume Analyst Backend Running"


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
        "git"
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

    result = {
        "score": score,
        "matched_skills": matched,
        "missing_skills": missing
    }

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
