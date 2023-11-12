from flask import Flask

app = Flask()


@app.get("/sections")
def get_sections():
  pass


@app.get("/lesson/<session>")
def get_lessons():
  pass


@app.get("/questions/<lesson>")
def get_questions():
  pass


@app.post("/questions/<lesson>")
def submit_question():
  pass
