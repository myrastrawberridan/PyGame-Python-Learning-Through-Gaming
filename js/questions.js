/* ============================================================
   questions.js — Pygame
   Beginner: 8 lessons x 3 questions = 24 questions
   Boss: 15 random from all 24
   Author: Nur Myra Qistina
   ============================================================ */

   const QBANK = {

    beginner: [
  
      // ══════════════════════
      // LESSON 1 — print()
      // ══════════════════════
      {
        id: 'b1',
        q: 'Print the message: Hello, World!',
        answer: 'print("Hello, World!")',
        altAnswers: ["print('Hello, World!')"],
        placeholder: 'print(...)',
        ctx: null,
        explanation: 'Use print() to display text. Text must be inside quotes.'
      },
      {
        id: 'b2',
        q: 'Print the number 10.',
        answer: 'print(10)',
        altAnswers: ['print("10")', "print('10')"],
        placeholder: 'print(...)',
        ctx: null,
        explanation: 'Numbers do not need quotes inside print().'
      },
      {
        id: 'b3',
        q: 'Print your name.',
        answer: 'print("Myra")',
        altAnswers: ['print("Alice")', 'print("Bob")', "print('Myra')", "print('Alice')", "print('Bob')", 'print("Python")', "print('Python')"],
        placeholder: 'print(...)',
        ctx: null,
        explanation: 'You can print any text by putting it inside quotes in print().'
      },
  
      // ══════════════════════
      // LESSON 2 — Variables
      // ══════════════════════
      {
        id: 'b4',
        q: 'Create a variable called name and set it to "Alice".',
        answer: 'name = "Alice"',
        altAnswers: ["name = 'Alice'"],
        placeholder: 'name = ...',
        ctx: null,
        explanation: 'Use = to store a value in a variable. Text needs quotes.'
      },
      {
        id: 'b5',
        q: 'Create a variable called age with value 15 and print it.',
        answer: 'age = 15\nprint(age)',
        altAnswers: ['age=15\nprint(age)'],
        placeholder: 'age = ...\nprint(...)',
        ctx: null,
        explanation: 'Store a number in a variable then use print() to show it.'
      },
      {
        id: 'b6',
        q: 'Print the variable score.',
        answer: 'print(score)',
        altAnswers: [],
        placeholder: 'print(...)',
        ctx: 'score = 100',
        explanation: 'To print a variable, just write its name inside print() without quotes.'
      },
  
      // ══════════════════════
      // LESSON 3 — input()
      // ══════════════════════
      {
        id: 'b7',
        q: 'Ask the user to enter their name and store it in a variable called name.',
        answer: 'name = input("Enter your name: ")',
        altAnswers: ["name = input('Enter your name: ')", 'name = input("Name: ")', "name = input('Name: ')"],
        placeholder: 'name = input(...)',
        ctx: null,
        explanation: 'input() asks the user to type something. Store the result in a variable.'
      },
      {
        id: 'b8',
        q: 'Ask the user for their age and store it in a variable called age.',
        answer: 'age = input("Enter your age: ")',
        altAnswers: ["age = input('Enter your age: ')", 'age = input("Age: ")', "age = input('Age: ')"],
        placeholder: 'age = input(...)',
        ctx: null,
        explanation: 'input() always gives back a string, even if the user types a number.'
      },
      {
        id: 'b9',
        q: 'Ask the user for their name then print: Hello, [name]!',
        answer: 'name = input("Enter your name: ")\nprint("Hello, " + name + "!")',
        altAnswers: [
          "name = input('Enter your name: ')\nprint('Hello, ' + name + '!')",
          'name = input("Enter your name: ")\nprint(f"Hello, {name}!")',
          "name = input('Enter your name: ')\nprint(f'Hello, {name}!')"
        ],
        placeholder: 'name = input(...)\nprint(...)',
        ctx: null,
        explanation: 'Get the name with input() then join it with other strings using +.'
      },
  
      // ══════════════════════
      // LESSON 4 — if / else
      // ══════════════════════
      {
        id: 'b10',
        q: 'If age is 18 or more, print "Adult".',
        answer: 'if age >= 18:\n    print("Adult")',
        altAnswers: ["if age >= 18:\n    print('Adult')"],
        placeholder: 'if age >= 18:\n    print(...)',
        ctx: 'age = 20',
        explanation: 'if checks a condition. The code inside must be indented with 4 spaces.'
      },
      {
        id: 'b11',
        q: 'If score is 50 or above print "Pass", else print "Fail".',
        answer: 'if score >= 50:\n    print("Pass")\nelse:\n    print("Fail")',
        altAnswers: ["if score >= 50:\n    print('Pass')\nelse:\n    print('Fail')"],
        placeholder: 'if score >= 50:\n    print(...)\nelse:\n    print(...)',
        ctx: 'score = 75',
        explanation: 'else runs when the if condition is False.'
      },
      {
        id: 'b12',
        q: 'Print "Big" if num > 10, else print "Small".',
        answer: 'if num > 10:\n    print("Big")\nelse:\n    print("Small")',
        altAnswers: ["if num > 10:\n    print('Big')\nelse:\n    print('Small')"],
        placeholder: 'if num > 10:\n    print(...)\nelse:\n    print(...)',
        ctx: 'num = 15',
        explanation: '> checks if a number is greater than another.'
      },
  
      // ══════════════════════
      // LESSON 5 — for loop
      // ══════════════════════
      {
        id: 'b13',
        q: 'Print numbers 1 to 5 using a for loop.',
        answer: 'for i in range(1, 6):\n    print(i)',
        altAnswers: ['for i in range(1,6):\n    print(i)'],
        placeholder: 'for i in range(...):\n    print(i)',
        ctx: null,
        explanation: 'range(1, 6) gives 1, 2, 3, 4, 5. The last number is not included.'
      },
      {
        id: 'b14',
        q: 'Print each fruit in the list.',
        answer: 'for fruit in fruits:\n    print(fruit)',
        altAnswers: ['for f in fruits:\n    print(f)'],
        placeholder: 'for fruit in fruits:\n    print(...)',
        ctx: 'fruits = ["apple", "banana", "mango"]',
        explanation: 'for item in list: goes through each item one by one.'
      },
      {
        id: 'b15',
        q: 'Print "Hi" 3 times using a for loop.',
        answer: 'for i in range(3):\n    print("Hi")',
        altAnswers: ["for i in range(3):\n    print('Hi')"],
        placeholder: 'for i in range(...):\n    print(...)',
        ctx: null,
        explanation: 'range(3) runs the loop 3 times (0, 1, 2).'
      },
  
      // ══════════════════════
      // LESSON 6 — while loop
      // ══════════════════════
      {
        id: 'b16',
        q: 'Print numbers 1 to 3 using a while loop.',
        answer: 'i = 1\nwhile i <= 3:\n    print(i)\n    i += 1',
        altAnswers: ['i=1\nwhile i<=3:\n    print(i)\n    i+=1'],
        placeholder: 'i = 1\nwhile i <= 3:\n    print(i)\n    i += 1',
        ctx: null,
        explanation: 'while loops as long as the condition is True. i += 1 increases i each time.'
      },
      {
        id: 'b17',
        q: 'Keep printing "Go!" while count is greater than 0, then subtract 1 each time.',
        answer: 'while count > 0:\n    print("Go!")\n    count -= 1',
        altAnswers: ["while count > 0:\n    print('Go!')\n    count -= 1"],
        placeholder: 'while count > 0:\n    print("Go!")\n    count -= 1',
        ctx: 'count = 3',
        explanation: 'count -= 1 is the same as count = count - 1.'
      },
      {
        id: 'b18',
        q: 'Print numbers from 5 down to 1 using a while loop.',
        answer: 'i = 5\nwhile i >= 1:\n    print(i)\n    i -= 1',
        altAnswers: ['i=5\nwhile i>=1:\n    print(i)\n    i-=1'],
        placeholder: 'i = 5\nwhile i >= 1:\n    print(i)\n    i -= 1',
        ctx: null,
        explanation: 'Count downwards by subtracting 1 each loop with i -= 1.'
      },
  
      // ══════════════════════
      // LESSON 7 — Functions
      // ══════════════════════
      {
        id: 'b19',
        q: 'Define a function called greet that prints "Hello!".',
        answer: 'def greet():\n    print("Hello!")',
        altAnswers: ["def greet():\n    print('Hello!')"],
        placeholder: 'def greet():\n    print(...)',
        ctx: null,
        explanation: 'def creates a function. The code inside must be indented.'
      },
      {
        id: 'b20',
        q: 'Define a function called add that takes a and b and returns a + b.',
        answer: 'def add(a, b):\n    return a + b',
        altAnswers: ['def add(a,b):\n    return a+b'],
        placeholder: 'def add(a, b):\n    return ...',
        ctx: null,
        explanation: 'return sends a value back from a function.'
      },
      {
        id: 'b21',
        q: 'Call the greet function.',
        answer: 'greet()',
        altAnswers: [],
        placeholder: '# call the function',
        ctx: 'def greet():\n    print("Hello!")',
        explanation: 'To run a function, write its name followed by ().'
      },
  
      // ══════════════════════
      // LESSON 8 — Lists
      // ══════════════════════
      {
        id: 'b22',
        q: 'Create a list called colors with "red", "green", "blue".',
        answer: 'colors = ["red", "green", "blue"]',
        altAnswers: ["colors = ['red', 'green', 'blue']"],
        placeholder: 'colors = [...]',
        ctx: null,
        explanation: 'Lists store multiple values inside square brackets [ ].'
      },
      {
        id: 'b23',
        q: 'Print the first item in the list.',
        answer: 'print(fruits[0])',
        altAnswers: [],
        placeholder: 'print(fruits[...])',
        ctx: 'fruits = ["apple", "banana", "mango"]',
        explanation: 'List indexes start at 0. fruits[0] is the first item.'
      },
      {
        id: 'b24',
        q: 'Add "orange" to the fruits list.',
        answer: 'fruits.append("orange")',
        altAnswers: ["fruits.append('orange')"],
        placeholder: 'fruits.append(...)',
        ctx: 'fruits = ["apple", "banana"]',
        explanation: '.append() adds a new item to the end of a list.'
      }
  
    ],
  
    // ── INTERMEDIATE — 9 questions (3 lessons x 3) ─────────────
    intermediate: [
  
      // LESSON 1 — List comprehension
      {
        id: 'i1',
        q: 'Use list comprehension to make a list of squares from 1 to 5.',
        answer: 'squares = [x**2 for x in range(1, 6)]',
        altAnswers: ['squares = [x*x for x in range(1, 6)]'],
        placeholder: 'squares = [x**2 for x in range(1, 6)]',
        ctx: null,
        explanation: 'List comprehension: [expression for item in iterable].'
      },
      {
        id: 'i2',
        q: 'Use list comprehension to get only even numbers from the list.',
        answer: 'evens = [x for x in numbers if x % 2 == 0]',
        altAnswers: [],
        placeholder: 'evens = [x for x in numbers if x % 2 == 0]',
        ctx: 'numbers = [1, 2, 3, 4, 5, 6, 7, 8]',
        explanation: 'Add an if condition at the end to filter items.'
      },
      {
        id: 'i3',
        q: 'Use list comprehension to uppercase all words in the list.',
        answer: 'upper = [w.upper() for w in words]',
        altAnswers: [],
        placeholder: 'upper = [w.upper() for w in words]',
        ctx: 'words = ["python", "is", "fun"]',
        explanation: 'You can call methods inside list comprehension.'
      },
  
      // LESSON 2 — Dictionaries
      {
        id: 'i4',
        q: 'Create a dictionary called student with name "Ali" and grade 90.',
        answer: 'student = {"name": "Ali", "grade": 90}',
        altAnswers: ["student = {'name': 'Ali', 'grade': 90}"],
        placeholder: 'student = {"name": ..., "grade": ...}',
        ctx: null,
        explanation: 'Dictionaries store key-value pairs inside curly braces {}.'
      },
      {
        id: 'i5',
        q: 'Loop through the dictionary and print each key and value.',
        answer: 'for key, value in person.items():\n    print(key, value)',
        altAnswers: ['for k, v in person.items():\n    print(k, v)'],
        placeholder: 'for key, value in person.items():\n    print(key, value)',
        ctx: 'person = {"name": "Ali", "age": 20, "city": "KL"}',
        explanation: '.items() gives you both the key and value in each loop.'
      },
      {
        id: 'i6',
        q: 'Check if the key "email" exists in the dictionary. Print "Found" if yes.',
        answer: 'if "email" in person:\n    print("Found")',
        altAnswers: ["if 'email' in person:\n    print('Found')"],
        placeholder: 'if "email" in person:\n    print("Found")',
        ctx: 'person = {"name": "Ali", "age": 20}',
        explanation: 'Use "in" to check if a key exists in a dictionary.'
      },
  
      // LESSON 3 — Functions with return
      {
        id: 'i7',
        q: 'Write a function max_num() that returns the larger of two numbers a and b.',
        answer: 'def max_num(a, b):\n    if a > b:\n        return a\n    else:\n        return b',
        altAnswers: ['def max_num(a, b):\n    return a if a > b else b'],
        placeholder: 'def max_num(a, b):\n    if a > b:\n        return a\n    else:\n        return b',
        ctx: null,
        explanation: 'A function can use if/else to decide what value to return.'
      },
      {
        id: 'i8',
        q: 'Write a function count_evens() that returns how many even numbers are in a list.',
        answer: 'def count_evens(nums):\n    count = 0\n    for x in nums:\n        if x % 2 == 0:\n            count += 1\n    return count',
        altAnswers: [],
        placeholder: 'def count_evens(nums):\n    count = 0\n    for x in nums:\n        if x % 2 == 0:\n            count += 1\n    return count',
        ctx: null,
        explanation: 'Use a loop to count how many items match a condition, then return the count.'
      },
      {
        id: 'i9',
        q: 'Write a function greet() that takes a name and returns a greeting string.',
        answer: 'def greet(name):\n    return "Hello, " + name + "!"',
        altAnswers: [],
        placeholder: 'def greet(name):\n    return "Hello, " + name + "!"',
        ctx: null,
        explanation: 'Functions can build and return strings using concatenation.'
      }
  
    ],
  
      // ── MASTER (placeholder) ────────────────────────────────────
    master: [
      {
        id: 'm1',
        q: 'Define a class called Dog with an __init__ method that sets the name.',
        answer: 'class Dog:\n    def __init__(self, name):\n        self.name = name',
        altAnswers: [],
        placeholder: 'class Dog:\n    def __init__(self, name):\n        self.name = name',
        ctx: null,
        explanation: '__init__ is the constructor. self refers to the current object.'
      }
    ]
  
  };
  
  // ══════════════════════════════════════════════════════════════
  // LESSON MAP — 8 lessons x 3 questions
  // ══════════════════════════════════════════════════════════════
  const LESSON_MAP = {
    beginner: {
      1: ['b1',  'b2',  'b3'],
      2: ['b4',  'b5',  'b6'],
      3: ['b7',  'b8',  'b9'],
      4: ['b10', 'b11', 'b12'],
      5: ['b13', 'b14', 'b15'],
      6: ['b16', 'b17', 'b18'],
      7: ['b19', 'b20', 'b21'],
      8: ['b22', 'b23', 'b24']
    },
    intermediate: {
      1: ['i1', 'i2', 'i3'],
      2: ['i4', 'i5', 'i6'],
      3: ['i7', 'i8', 'i9']
    }
  };
  
  // ── BOSS POOL ─────────────────────────────────────────────────
  const BOSS_POOL = {
    beginner: [
      'b1','b2','b3','b4','b5','b6','b7','b8',
      'b9','b10','b11','b12','b13','b14','b15',
      'b16','b17','b18','b19','b20','b21','b22','b23','b24'
    ],
    intermediate: [
      'i1','i2','i3','i4','i5','i6','i7','i8','i9'
    ]
  };
  
  // ── Get question by ID ────────────────────────────────────────
  function getQById(bank, id) {
    return QBANK[bank].find(function(q) { return q.id === id; }) || null;
  }
  
  // ── Get questions for a lesson ────────────────────────────────
  function getLessonQuestions(bankName, lessonNum) {
    var map = LESSON_MAP[bankName];
    if (!map || !map[lessonNum]) {
      var bank  = QBANK[bankName];
      var start = ((lessonNum - 1) * 3) % bank.length;
      return [
        bank[start % bank.length],
        bank[(start + 1) % bank.length],
        bank[(start + 2) % bank.length]
      ];
    }
    return map[lessonNum].map(function(id) {
      return getQById(bankName, id);
    }).filter(Boolean);
  }
  
  // ── Get 15 random boss questions ──────────────────────────────
  function getBossQuestions(bankName) {
    var pool     = BOSS_POOL[bankName] || QBANK[bankName].map(function(q) { return q.id; });
    var shuffled = pool.slice().sort(function() { return Math.random() - 0.5; });
    var take     = shuffled.slice(0, Math.min(15, shuffled.length));
    return take.map(function(id) {
      return getQById(bankName, id);
    }).filter(Boolean);
  }
  
  // ── Answer checker ────────────────────────────────────────────
  function normalise(s) {
    return s.trim()
      .replace(/\r\n/g, '\n')
      .replace(/[ \t]+/g, ' ')
      .replace(/ *\n */g, '\n')
      .toLowerCase();
  }
  
  function checkAnswer(userInput, q) {
    var u = normalise(userInput);
    var a = normalise(q.answer);
    if (u === a) return true;
    if (q.altAnswers) {
      return q.altAnswers.some(function(alt) { return normalise(alt) === u; });
    }
    return false;
  }
  
  // ── Editor builder ────────────────────────────────────────────
  function makeEditor(mountId, placeholder, onRunFn) {
    var mount = document.getElementById(mountId);
    if (!mount) return;
  
    var html = '<div class="code-editor-wrap" id="' + mountId + '-wrap">';
    html += '<div class="editor-chrome">';
    html += '<div class="editor-topbar">';
    html += '<div style="display:flex;gap:5px">';
    html += '<div style="width:10px;height:10px;border-radius:50%;background:#ff5f57"></div>';
    html += '<div style="width:10px;height:10px;border-radius:50%;background:#febc2e"></div>';
    html += '<div style="width:10px;height:10px;border-radius:50%;background:#28c840"></div>';
    html += '</div>';
    html += '<span style="font-family:monospace;font-size:0.75rem;color:#c9919a;">🐍 Python</span>';
    html += '</div>';
    html += '<textarea id="' + mountId + '-ta" class="editor-textarea" placeholder="' + placeholder + '" spellcheck="false" autocorrect="off" autocapitalize="off"></textarea>';
    html += '<div class="editor-footer">';
    html += '<span style="font-size:0.72rem;color:#c9919a;font-weight:700;">💡 Tab = indent · Ctrl+Enter = run</span>';
    html += '<button class="editor-run" id="' + mountId + '-runbtn">▶ RUN</button>';
    html += '</div></div></div>';
    mount.innerHTML = html;
  
    function runFn() {
      var fnName = onRunFn.replace(/\(\)/g, '').trim();
      if (typeof window[fnName] === 'function') { window[fnName](); }
    }
  
    var btn = document.getElementById(mountId + '-runbtn');
    if (btn) btn.addEventListener('click', runFn);
  
    var ta = document.getElementById(mountId + '-ta');
    if (ta) {
      ta.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
          e.preventDefault();
          var s = ta.selectionStart, end = ta.selectionEnd;
          ta.value = ta.value.substring(0, s) + '    ' + ta.value.substring(end);
          ta.selectionStart = ta.selectionEnd = s + 4;
        }
        if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); runFn(); }
      });
    }
  }
  
  function getEditorValue(mountId) {
    var ta = document.getElementById(mountId + '-ta');
    return ta ? ta.value : '';
  }
  
  function setEditorDisabled(mountId, disabled) {
    var ta  = document.getElementById(mountId + '-ta');
    var btn = document.getElementById(mountId + '-runbtn');
    if (ta)  ta.disabled  = disabled;
    if (btn) btn.disabled = disabled;
  }
  
  function setEditorState(mountId, state) {
    var wrap = document.getElementById(mountId + '-wrap');
    if (!wrap) return;
    wrap.classList.remove('correct', 'wrong');
    if (state) wrap.classList.add(state);
  }
  
  // ── Feedback renderer ─────────────────────────────────────────
  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  
  function renderFeedback(panelId, correct, q, userInput) {
    var panel = document.getElementById(panelId);
    if (!panel) return;
    panel.style.display = 'block';
    if (correct) {
      panel.className = 'fb-panel ok';
      panel.innerHTML =
        '<div class="fb-top">✅ Correct! Great job! 🎉</div>' +
        '<div class="fb-body">' + (q.explanation || 'Perfect!') + '</div>';
    } else {
      panel.className = 'fb-panel no';
      panel.innerHTML =
        '<div class="fb-top">❌ Not quite! Remember this:</div>' +
        '<div class="fb-body">' + (q.explanation || 'Check your syntax.') + '</div>' +
        '<div style="margin-top:0.5rem;font-size:0.78rem;color:#c9919a;font-weight:700;">✅ Correct answer:</div>' +
        '<pre class="fb-correct-code">' + escHtml(q.answer) + '</pre>';
    }
  }
