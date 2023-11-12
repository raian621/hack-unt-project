import os
import json

sections = os.listdir('mock_db')

LESSONS = {}
SECTIONS = {}

for section in sections:
  SECTIONS[section] = {}
  for lesson in os.listdir(f'mock_db/{section}'):
    lesson_name = lesson.replace('.json', '')
    print(lesson)
    with open(f'mock_db/{section}/{lesson}') as file:
      lesson_data = json.load(file)
      SECTIONS[section][lesson_name] = lesson_data
      LESSONS[lesson_name] = lesson_data


def get_sections():
  return list(SECTIONS.keys())


def get_lessons(section):
  return list(SECTIONS[section].keys())


def get_questions(lesson):
  return LESSONS[lesson]['quiz']


def get_content(lesson):
  return LESSONS[lesson]['content']


