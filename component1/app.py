from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/api")
def get_data():
    return jsonify({
        "name": "Maiti Clark",
        "bio": "Master’s student in Computer Science at West Chester University.",
        
        "education": [
    {
        "school": "West Chester University",
        "location": "West Chester, PA",
        "degree": "M.S. - Masters of Computer Science",
        "dates": "January 2025 – Current",
        "details": [
            "Courses: Programming Languages, Advanced Seminar: Computer Security, Foundations of Computer Science, Networks and Data Communications, Advanced Seminar: Data Visualization",
            "Upsilon Pi Epsilon (UPE) Honor Society Member – West Chester University Chapter"
        ]
    },
    {
        "school": "University College Dublin",
        "location": "Dublin, Ireland",
        "degree": "B.A. - Double Major in Information & Social Computing with Sociology",
        "dates": "September 2018 – May 2021",
        "details": [
            "Courses: Artificial Intelligence, The Digital Self, Information Ethics, Digital Marketing, Web Publishing, Information Architecture",
            "Computer-Mediated Communication, Social Media & Participation in an Online World"
        ]
    }
],

        "experience": [
    {
        "title": "Lead Bartender",
        "company": "La Scala’s Fire",
        "description": "Managed staff, created cocktail menus, and handled high-volume service."
    },
    {
        "title": "Web Specialist",
        "company": "Unifeyed LLC",
        "description": "Developed and maintained websites, improved SEO performance."
    },
    {
        "title": "Irish Dance Performer & Instructor",
        "company": "",
        "description": "Performed professionally and choreographed routines."
    }
]
    })

app.run(host="0.0.0.0", port=8000)
