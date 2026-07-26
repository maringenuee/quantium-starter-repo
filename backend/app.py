import json
import random
import unicodedata
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS

DATA_PATH = Path(__file__).parent / "data" / "verbs.json"

app = Flask(__name__)
CORS(app)

with DATA_PATH.open(encoding="utf-8") as f:
    DATA = json.load(f)

VERBS_BY_ID = {verb["id"]: verb for verb in DATA["verbs"]}
LANGUAGES = ("es", "fr")


def normalize(text):
    text = text.strip().lower()
    return "".join(
        c for c in unicodedata.normalize("NFD", text)
        if unicodedata.category(c) != "Mn"
    )


def verb_summary(verb):
    return {
        "id": verb["id"],
        "english": verb["english"],
        "es": {"infinitive": verb["es"]["infinitive"], "regular": verb["es"]["regular"], "group": verb["es"]["group"]},
        "fr": {"infinitive": verb["fr"]["infinitive"], "regular": verb["fr"]["regular"], "group": verb["fr"]["group"]},
    }


@app.get("/api/verbs")
def list_verbs():
    return jsonify({
        "persons": DATA["persons"],
        "verbs": [verb_summary(v) for v in DATA["verbs"]],
    })


@app.get("/api/verbs/<verb_id>")
def get_verb(verb_id):
    verb = VERBS_BY_ID.get(verb_id)
    if verb is None:
        return jsonify({"error": "verb not found"}), 404
    return jsonify({"persons": DATA["persons"], "verb": verb})


@app.get("/api/drill/question")
def drill_question():
    verb = random.choice(DATA["verbs"])
    person_index = random.randrange(6)
    return jsonify({
        "verb_id": verb["id"],
        "english": verb["english"],
        "person_index": person_index,
        "es_infinitive": verb["es"]["infinitive"],
        "fr_infinitive": verb["fr"]["infinitive"],
        "es_person": DATA["persons"]["es"][person_index],
        "fr_person": DATA["persons"]["fr"][person_index],
    })


@app.post("/api/drill/check")
def drill_check():
    body = request.get_json(silent=True) or {}
    verb_id = body.get("verb_id")
    person_index = body.get("person_index")
    es_answer = body.get("es_answer", "")
    fr_answer = body.get("fr_answer", "")

    verb = VERBS_BY_ID.get(verb_id)
    if verb is None or not isinstance(person_index, int) or not (0 <= person_index < 6):
        return jsonify({"error": "invalid drill question"}), 400

    es_correct_answer = verb["es"]["present"][person_index]
    fr_correct_answer = verb["fr"]["present"][person_index]

    return jsonify({
        "es": {
            "correct": normalize(es_answer) == normalize(es_correct_answer),
            "correct_answer": es_correct_answer,
        },
        "fr": {
            "correct": normalize(fr_answer) == normalize(fr_correct_answer),
            "correct_answer": fr_correct_answer,
        },
    })


if __name__ == "__main__":
    app.run(debug=True, port=5001)
