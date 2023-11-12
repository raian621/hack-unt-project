import os
import json

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
  SECTIONS[section]['lessons'] = []
  for lesson in os.listdir(f'mock_db/{section}'):
    lesson_name = lesson.replace('.json', '')
    print(lesson)
    with open(f'mock_db/{section}/{lesson}') as file:
      lesson_data = json.load(file)
      print(lesson_data)
      SECTIONS[section]['lessons'].append(lesson_data)
      LESSONS[lesson_name] = lesson_data


def get_sections():
  return [
    {
      "name": section["name"],
      "urlName": section["urlName"]
    } for section in SECTIONS.values()
  ]

def get_lessons(section):
  print(SECTIONS[section])
  return list(SECTIONS[section]['lessons'])


def get_questions(lesson):
  return LESSONS[lesson]['quiz']


def get_lesson(lesson):
  return LESSONS[lesson]


def get_tree():
  tree = [
    {
      'urlName': section['urlName'],
      'name': section['name'],
      'lessons': [
        {
          'urlName': lesson['urlName'],
          'name': lesson['name']
        } for lesson in section['lessons']
      ]
    } for section in SECTIONS.values()
  ]
  return tree
