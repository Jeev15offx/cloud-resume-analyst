function analyzeResume() {

    fetch("http://127.0.0.1:5000/analyze", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        resume: "aws git linux",
        job: "aws docker kubernetes terraform"
    })
})
.then(response => response.json())
.then(data => {
    console.log(data);
});





    let resumeText = document.getElementById("resume").value.toLowerCase().trim();
    let jobText = document.getElementById("job").value.toLowerCase().trim();

    if (resumeText.length === 0) {
        document.getElementById("result").innerHTML =
            "<h3>Please paste your resume.</h3>";
        return;
    }

    // Clean text
    resumeText = resumeText.replace(/[^\w\s]/g, "");
    jobText = jobText.replace(/[^\w\s]/g, "");

    // Stopwords
    let stopwords = [
        "the", "is", "and", "a", "an", "with",
        "for", "to", "of", "in", "on", "at",
        "by", "from", "looking", "should", "have"
    ];

    // Technical Skills Database
    let techSkills = [
        "aws",
        "azure",
        "gcp",
        "cloud",
        "docker",
        "kubernetes",
        "terraform",
        "ansible",
        "jenkins",
        "git",
        "github",
        "linux",
        "bash",
        "python",
        "java",
        "javascript",
        "react",
        "node",
        "mysql",
        "sql",
        "mongodb",
        "devops",
        "sre",
        "networking",
        "security",
        "cybersecurity",
        "prometheus",
        "grafana"
    ];

    // Word Count
    let wordCount = resumeText.split(/\s+/).length;

    // Resume Section Checks
    let keywords = [
        "project",
        "skills",
        "experience",
        "education"
    ];

    let matchedKeywords = keywords.filter(word =>
        resumeText.includes(word)
    );

    // Job Words
    let jobWords = jobText
        .split(/\s+/)
        .filter(word =>
            word.length > 2 &&
            !stopwords.includes(word)
        );

    let uniqueJobWords = [...new Set(jobWords)];

    // Matches
    let matchedWords = uniqueJobWords.filter(word =>
        resumeText.includes(word)
    );

    // Technical Matches
    let techWords = uniqueJobWords.filter(word =>
        techSkills.includes(word)
    );

    let matchedTech = techWords.filter(word =>
        resumeText.includes(word)
    );

    let missingTech = techWords.filter(word =>
        !resumeText.includes(word)
    );

    // Generic Matches
    let genericWords = uniqueJobWords.filter(word =>
        !techSkills.includes(word)
    );

    let missingGeneric = genericWords.filter(word =>
        !resumeText.includes(word)
    );

    // Match Percentages
    let techMatchPercent =
        techWords.length > 0
            ? Math.floor(
                  (matchedTech.length / techWords.length) * 100
              )
            : 0;

    let overallMatchPercent =
        uniqueJobWords.length > 0
            ? Math.floor(
                  (matchedWords.length / uniqueJobWords.length) * 100
              )
            : 0;

    let finalScore = Math.floor(
        (techMatchPercent * 0.7) +
        (overallMatchPercent * 0.3)
    );

    // Resume Score
    let score = 0;
    let feedback = [];

    if (wordCount >= 80 && wordCount <= 300)
        score++;
    else
        feedback.push("Resume length not optimal");

    if (matchedKeywords.includes("skills"))
        score++;
    else
        feedback.push("Add skills section");

    if (matchedKeywords.includes("project"))
        score++;
    else
        feedback.push("Add projects section");

    if (matchedKeywords.includes("experience"))
        score++;
    else
        feedback.push("Add experience section");

    if (matchedKeywords.includes("education"))
        score++;
    else
        feedback.push("Add education section");

    // Resume Strength
    let strength = "";

    if (score <= 2) {
        strength = "Beginner";
    } else if (score <= 4) {
        strength = "Intermediate";
    } else {
        strength = "Strong";
    }

    // Learning Roadmap
    let roadmapHTML = "";

    if (missingTech.length > 0) {

        roadmapHTML =
            "<strong>📚 Recommended Learning Roadmap</strong><br>";

        missingTech.forEach((skill, index) => {
            roadmapHTML +=
                `Step ${index + 1}: ${skill}<br>`;
        });

        roadmapHTML += "<br>";
    }

    // Save report for download
    window.reportText = `
Analysis Result

Word Count: ${wordCount}

Resume Score: ${score}/5

Resume Strength: ${strength}

Job Match: ${finalScore}%

Tech Match: ${techMatchPercent}%

Overall Match: ${overallMatchPercent}%

Matched Technical Skills:
${matchedTech.join(", ") || "None"}

Missing Technical Skills:
${missingTech.join(", ") || "None"}

Missing Keywords:
${missingGeneric.join(", ") || "None"}

Feedback:
${feedback.join(", ") || "Strong Resume"}
`;

    // Display Result
    document.getElementById("result").innerHTML = `
        <h3>Analysis Result</h3>

        <strong>Word Count:</strong> ${wordCount}<br><br>

        <strong>Resume Score:</strong> ${score}/5<br>
        <progress value="${score}" max="5"></progress><br><br>

        <strong>Resume Strength:</strong> ${strength}<br><br>

        <strong>Job Match:</strong> ${finalScore}%<br>
        <progress value="${finalScore}" max="100"></progress><br><br>

        <strong>🔹 Tech Match:</strong> ${techMatchPercent}%<br>
        <strong>🔸 Overall Match:</strong> ${overallMatchPercent}%<br><br>

        <strong>✅ Matched Technical Skills</strong><br>
        ${matchedTech.join(", ") || "None"}<br><br>

        <strong>❌ Missing Technical Skills</strong><br>
        ${missingTech.join(", ") || "None"}<br><br>

        <strong>🏆 Top Strengths</strong><br>
        ${matchedTech.length ? matchedTech.join(", ") : "None"}<br><br>

        <strong>📈 Improvement Areas</strong><br>
        ${
            missingTech.length
                ? missingTech.map(skill => `Add ${skill}`).join("<br>")
                : "None"
        }<br><br>

        ${roadmapHTML}

        <strong>⚠ Missing Keywords</strong><br>
        ${missingGeneric.join(", ") || "None"}<br><br>

        <strong>Feedback</strong><br>
        ${feedback.length
            ? feedback.join("<br>")
            : "Strong Resume"}
    `;
}

// Download Report
function downloadReport() {

    if (!window.reportText) {
        alert("Please analyze a resume first.");
        return;
    }

    let blob = new Blob(
        [window.reportText],
        { type: "text/plain" }
    );

    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "resume-analysis-report.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}
