import os
import json

from redis import Redis

rc = Redis(host="localhost", port=3001, decode_responses=True)

LESSONS = {}
SECTIONS = {
  "budgeting": {
    "name": "Budgeting"
  },
  "debt": {
    "name": "Debt"
  },
  "financial_aid": {
    "name": "Financial Aid"
  },
  "credit_cards": {
    "name": "Credit Cards"
  },
  "retirement_plans": {
    "name": "Retirement Plans"
  },
  "stock_market": {
    "name": "Stock Market"
  }
}

for section in SECTIONS.keys():
  SECTIONS[section]['urlName'] = section
  SECTIONS[section]['lessons'] = {}
  for lesson in os.listdir(f'mock_db/{section}'):
    lesson_name = lesson.replace('.json', '')
    with open(f'mock_db/{section}/{lesson}') as file:
      lesson_data = json.load(file)
      SECTIONS[section]['lessons'][lesson_name] = lesson_data
    LESSONS[lesson_name] = section


def get_sections():
  return [
    {
      "name": section["name"],
      "urlName": section["urlName"]
    } for section in SECTIONS.values()
  ]

def get_lessons(section):
  return list(SECTIONS[section]['lessons'])


def get_questions(lesson):
  section = LESSONS[lesson]

  return {
    'name': SECTIONS[section]['lessons'][lesson]['name'],
    'quiz': [{
      'question': question['question'],
      'choices': [ choice['text'] for choice in question['choices'] ]
    } for question in SECTIONS[section]['lessons'][lesson]['quiz']]
  }


def get_lesson(lesson):
  section = LESSONS[lesson]
  return SECTIONS[section]['lessons'][lesson]


def get_tree():
  tree = []

  for section in SECTIONS.values():
    newSection = {
      'urlName': section['urlName'],
      'name': section['name'],
      'lessons': []
    }
    tree.append(newSection)
    for lesson in section['lessons'].values():
      value = rc.get(lesson['urlName'])
      value = value if value != None else 0
      newSection['lessons'].append({
        'urlName': lesson['urlName'],
        'name': lesson['name'],
        'score': value
      })
  return tree


def update_score(lesson, score):
  rc.set(lesson, score)
  section_name = LESSONS[lesson]
  print(score)
  SECTIONS[section_name]['lessons'][lesson]['score'] = score