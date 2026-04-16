from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/api")
def get_data():
    return jsonify({
        "name": "Maiti Clark",
        "bio": "Master’s student in Computer Science at West Chester University.",
        "experience": [
            "Lead Bartender - La Scala’s Fire",
            "Web Specialist - Unifeyed LLC",
            "Irish Dance Performer & Instructor"
        ]
    })

app.run(host="0.0.0.0", port=8000)
