function analyzeResume() {

    let resumeText = document.getElementById("resume").value.toLowerCase().trim();
    let jobText = document.getElementById("job").value.toLowerCase().trim();

    if (resumeText.length === 0) {
        document.getElementById("result").innerText = "Please paste your resume.";
        return;
    }

    // Clean text
    resumeText = resumeText.replace(/[^\w\s]/g, "");
    jobText = jobText.replace(/[^\w\s]/g, "");

    // Stopwords
    let stopwords = ["the","is","and","a","an","with","for","to","of","in","on","at","by","from","looking","should","have"];

    // Tech skills list
    let techSkills = [
        "java","python","javascript","html","css","react","node",
        "aws","cloud","docker","kubernetes","git","sql","mysql"
    ];

    // Word count
    let wordCount = resumeText.split(/\s+/).length;

    // Resume section validation
    let keywords = ["project", "skills", "experience", "education"];
    let matchedKeywords = keywords.filter(word => resumeText.includes(word));

    // Job words
    let jobWords = jobText.split(/\s+/)
        .filter(word => word.length > 2 && !stopwords.includes(word));

    let uniqueJobWords = [...new Set(jobWords)];

    // Matches
    let matchedWords = uniqueJobWords.filter(word => resumeText.includes(word));

    // Split matches
    let techWords = uniqueJobWords.filter(word => techSkills.includes(word));
    let matchedTech = techWords.filter(word => resumeText.includes(word));

    let genericWords = uniqueJobWords.filter(word => !techSkills.includes(word));
    let matchedGeneric = genericWords.filter(word => resumeText.includes(word));

    // 🎯 Correct scoring
    let techMatchPercent = techWords.length > 0
        ? Math.floor((matchedTech.length / techWords.length) * 100)
        : 0;

    let overallMatchPercent = uniqueJobWords.length > 0
        ? Math.floor((matchedWords.length / uniqueJobWords.length) * 100)
        : 0;

    // Final weighted score
    let finalScore = Math.floor((techMatchPercent * 0.7) + (overallMatchPercent * 0.3));

    // Resume quality score
    let score = 0;
    let feedback = [];

    if (wordCount >= 80 && wordCount <= 300) score++;
    else feedback.push("Resume length not optimal");

    if (matchedKeywords.includes("skills")) score++;
    else feedback.push("Add skills section");

    if (matchedKeywords.includes("project")) score++;
    else feedback.push("Add projects");

    if (matchedKeywords.includes("experience")) score++;
    else feedback.push("Add experience");

    if (matchedKeywords.includes("education")) score++;
    else feedback.push("Add education");

    // Output
    document.getElementById("result").innerHTML = `
        Word Count: ${wordCount} <br>
        Resume Score: ${score} / 5 <br>
        Job Match: ${finalScore}% <br><br>

        🔹 Tech Match: ${techMatchPercent}% (${matchedTech.join(", ")}) <br>
        🔸 Overall Match: ${overallMatchPercent}% <br><br>

        Feedback: ${feedback.length ? feedback.join(", ") : "Strong Resume"}
    `;
}
