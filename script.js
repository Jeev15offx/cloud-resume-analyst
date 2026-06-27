async function analyzeResume() {

    let resumeText =
        document.getElementById("resume").value.trim();

    let jobText =
        document.getElementById("job").value.trim();

    if (!resumeText) {

        document.getElementById("result").innerHTML =
            "<h3>Please paste your resume.</h3>";

        return;
    }

    try {

        const response = await fetch(
            "api/analyze",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    resume: resumeText,
                    job: jobText
                })
            }
        );

        const data = await response.json();

        let matchedSkills =
            data.matched_skills.length
                ? data.matched_skills.join(", ")
                : "None";

        let missingSkills =
            data.missing_skills.length
                ? data.missing_skills.join(", ")
                : "None";

        let strengths =
            data.strengths.length
                ? data.strengths.join(", ")
                : "None";

        let roadmapHTML = "";

        if (data.roadmap.length > 0) {

            roadmapHTML =
                "<strong>📚 Recommended Learning Roadmap</strong><br>";

            data.roadmap.forEach(step => {
                roadmapHTML += `${step}<br>`;
            });

            roadmapHTML += "<br>";
        }

        window.reportText = `
Cloud Resume Analyst Report

Job Match Score: ${data.score}%

Strength Level: ${data.strength_level}

Matched Skills:
${matchedSkills}

Missing Skills:
${missingSkills}

Strength Areas:
${strengths}

Learning Roadmap:
${data.roadmap.join("\n")}
`;

        document.getElementById("result").innerHTML = `
            <h3>Analysis Result</h3>

            <strong>Job Match:</strong>
            ${data.score}%<br>

            <progress
                value="${data.score}"
                max="100">
            </progress>

            <br><br>

            <strong>Resume Strength:</strong>
            ${data.strength_level}

            <br><br>

            <strong>✅ Matched Skills</strong><br>
            ${matchedSkills}

            <br><br>

            <strong>❌ Missing Skills</strong><br>
            ${missingSkills}

            <br><br>

            <strong>🏆 Top Strength Areas</strong><br>
            ${strengths}

            <br><br>

            ${roadmapHTML}
        `;

    } catch (error) {

        console.error(error);

        document.getElementById("result").innerHTML =
            "<h3>Backend connection failed.</h3>";
    }
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

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "resume-analysis-report.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}
