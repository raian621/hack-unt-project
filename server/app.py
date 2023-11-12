from flask import Flask, Response, request
from flask_cors import CORS
import db
import json

app = Flask(__name__)
CORS(app)


@app.get("/tree")
def get_tree():
  tree = db.get_tree()
  return Response(status=200, response=json.dumps(tree))


@app.get("/sections")
def get_sections():
  sections = db.get_sections()
  return Response(status=200, response=json.dumps(sections))


@app.get("/lessons/<section>")
def get_lessons(section):
  lessons = db.get_lessons(section)
  return Response(status=200, response=json.dumps(lessons))


@app.get("/content/<lesson>")
def get_content(lesson):
  content = db.get_lesson(lesson)
  return Response(status=200, response=json.dumps(content))


@app.get("/questions/<lesson>")
def get_questions(lesson):
  questions = db.get_questions(lesson)
  return Response(status=200, response=json.dumps(questions))


@app.post("/questions/<lesson>")
def submit_questions(lesson):
  content = request.json
  score = 0
  print(content)
  print("here")
  if content != None:
    for i, _ in enumerate(content):
      section = db.LESSONS[lesson]
      choices = db.SECTIONS[section]['lessons'][lesson]['quiz'][i]['choices']
      for choice in choices:
        print(choice['text'], content[i])
        if choice['text'] == content[i] and choice['correct']:  
          score += 1

    score *= 100 / len(content)
  db.update_score(lesson, score)
  return Response(status=200, response=json.dumps({
    'score': score
  }))
