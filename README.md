Questience
==========

A simple web-based task-manager in the form of an RPG game. Allows the creation of quests (projects) with tasks in it.

Quest Characteristics
---------------------

* a name
* a title
* a deadline (optional)
* tasks
* bonus points for one category (explained below)

Task Characteristics
--------------------

* a name
* a deadline
* points for different skills (explained below)
* repeats (never, every x hours/days/weeks)

Attributes:
-----------

* Mind: A task that enriches the mind for the sake of the intellect, like reading, meditation, chess. The goal must be to improve one’s intelligence.
* Muscle: A task that improves one’s fitness levels, strength, dexterity, etc. like a sport, exercise, etc.
* Heart: A task that involves adrenaline, and is a step in conquering a fear, or exploring something new. Examples: going to a bar and opening a girl, parachuting, etc.
* Charisma: A task done to improve one’s social skills, like buying new clothes (with the goal of dressing better), buying paintings, learning music, etc.
* Passion: A task done to improve one’s sex life, like joining a new club to meet women, completing a new seduction video, etc.
* Money: A task that improves one’s career, wealth, etc. This could include a book about programming, an investment in a stock, etc.
Skills:

Skills are based upon experience in each of the above categories. The skills for a user could start at any baseline from 0-100, as a percentile of what the player considers themselves capable of. They can adjust and fine-tune these at any time, but that will reset the game. For example:

* Mind: 35
* Muscle: 30
* Heart: 7
* Charisma: 15
* Passion: 7
* Money: 40

Scale:

* 0-5: non-existent
* 6-15: very poor
* 16-25: poor
* 26-50: reasonably good
* 51-75: very good
* 76-90: excellent
* 91-100: life changing

Each task will carry between 0.1 - 1.0 points for up to two categories, combined. At the end of every quest, the user will get a multiple of points for the quest categories, with the following formula:

    (total task points) * (random number between 1-1.5)

The random number will increase at greater speeds between 0-40 points, than from 41-100 points.

If a user reaches a 100 points in any category, that category will be marked as completed, and the points will continue accumulating. If the player completes all categories, they will have completed the level, and will start the next level at a proportion of their end scores. For example, consider this score upon completion:

* Mind: 124
* Muscle: 106
* Heart: 100
* Charisma: 101
* Passion: 157
* Money: 160

The new reset percentiles will be:

    ((highest score - 100)+1) / (rounded average score - 100) * 10

* (24/25) = 0.96 * 10 = 9.6
* (7/25) = 0.244 * 10 = 25
* (1/25) = 0.04 * 10 = 4
* (2/25) = 0.08 * 10 = 1
* (57/25) = 2.28 * 10 = 23
* (61/25) = 2.44 * 10 = 24

The scores only go up to a maximum of 50 points.

Features:
--------

The other features of the system include:

Responsive design: viewable on mobiles, iPads and desktops
Simple user system, with logins, passwords, password recovery, etc.
Built using node.js/express, mongodb, Backbone.js, Twitter Bootstrap, SCSS/Less