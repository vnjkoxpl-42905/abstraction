import type { Module } from '../types';

export const m4: Module = {
  slug: 'role-theory',
  order: 4,
  title: 'Role Questions: Theory',
  subtitle: 'The three-step method, concession vs. opposing viewpoint, and the 15-pattern taxonomy.',
  orientation: {
    whatItIs:
      'The core theory module. You learn the three-step method for approaching Role questions, the critical distinction between concessions and opposing viewpoints, and the fifteen abstract answer-choice patterns that appear on hard Role questions.',
    whyItMatters:
      'Role questions are won in the answer choices. "I use about 60% of all the time to examine answer choices in Role questions, with the other 40% set aside for reading the question and the stimulus." Without the taxonomy, you cannot move at that speed.',
    youWillBeAbleTo: [
      'Execute the three-step method on any Role question.',
      'Distinguish a concession from an opposing viewpoint using a single tonal cue.',
      'De-abstract any of the 15 recurring answer-choice patterns on sight.',
      'Commit to a predicted answer before reading any choice.',
    ],
  },
  sections: [
    {
      slug: 'three-step-method',
      title: 'The three-step method',
      kicker: 'Section 1',
      body:
`Here is a quick list of the habits that will make the process go a lot smoother:

1. **Locate the statement the question is asking about.** Highlight or underline it in the question *and* in the stimulus to provide a constant visual reminder of what you\'re supposed to be focusing on.
2. **Read the stimulus as you would a Find the Conclusion question.** Categorize each sentence/statement and find the argument core — identify the conclusion, premise, and intermediate conclusion (if there is one).
3. **Think about the relationship between the quoted statement and the argument\'s conclusion.** What is their relationship?`,
      callout: {
        kind: 'takeaway',
        body:
`Same reading habits as Find the Conclusion. The difference is the **third step** — you ask how the quoted statement fits into the argument you just mapped.`,
      },
      checkpoint: {
        id: 'm4-method-order',
        kind: 'mcq',
        prompt: 'Which step should you NEVER skip on a Role question, even when time is tight?',
        choices: [
          { id: 'a', text: 'Reading every answer choice.' },
          { id: 'b', text: 'Highlighting or underlining the quoted statement in the stimulus.' },
          { id: 'c', text: 'Double-checking your translation of abstract keywords.' },
        ],
        correct: 'b',
        explanation:
          'Step 1 is non-negotiable. Careless mistakes that come from analyzing the wrong statement make every downstream skill worthless. Highlight the quoted statement inside the stimulus before you start reading.',
      },
    },
    {
      slug: 'worked-example-inflation',
      title: 'Worked example — the inflation stimulus',
      kicker: 'Section 2',
      body:
`> We will see a drastic increase in the cost of food in the near future. War in the Ukraine has caused a significant disturbance on the global supply of grain and livestock feed. **Inflationary pressure on the economy means that prices only have one place to go, and that is up.**

> *What is the role played by the statement about inflationary pressure?*

**Step 1** — isolate the quoted statement (the inflation sentence). **Step 2** — read for structure:

- Statement 1: Food is going to be more expensive (opinion — a candidate for conclusion).
- Statement 2: Food supply is disrupted (fact).
- Statement 3: Inflation is making things cost more (fact).

Both facts (2 and 3) support the opinion (1). So **Statement 1 is the conclusion.** Are 2 and 3 connected? Disrupted supplies lead to higher costs; inflation leads to higher costs. Both are separate premises supporting the conclusion — **no intermediate conclusion here.**

**Step 3** — what is the quoted statement\'s relationship to the conclusion? It\'s a **premise, independently providing support for the argument\'s conclusion.**`,
      checkpoint: {
        id: 'm4-inflation',
        kind: 'mcq',
        prompt: 'Why is the inflation sentence *not* an intermediate conclusion?',
        choices: [
          { id: 'a', text: 'Because no other statement in the stimulus supports it.' },
          { id: 'b', text: 'Because it appears at the end of the stimulus.' },
          { id: 'c', text: 'Because it\'s a fact rather than an opinion.' },
        ],
        correct: 'a',
        explanation:
          'Intermediate conclusions are supported by premises *and* support the main conclusion. Here, nothing in the stimulus supports the inflation statement — so it can only be a premise.',
      },
    },
    {
      slug: 'concession-vs-opposing',
      title: 'Concession vs. opposing viewpoint',
      kicker: 'Section 3',
      body:
`> The court system must remain vigilant of the attempts made by politicians to damage its effectiveness. It has been argued that **the separation of powers already keeps a country\'s judicial system independent and free from political interference.** But all political and legal institutions are made by humans, and as such, they are fragile and prone to error.

The quoted statement runs contrary to the author\'s conclusion — so it\'s either a **concession** or an **opposing viewpoint.**

> An opposing viewpoint is simply what the other party thinks or believes. The author disagrees with it. A concession, on the other hand, is something that the speaker acknowledges, but still holds on to their original view despite it.

In the stimulus as written, the author simply makes a note of the other view without acknowledging any merit. **Opposing viewpoint.** Had the statement read *"granted, the separation of powers keep a country\'s judicial system independent and free from political interference somewhat,"* it would be a **concession** — partial agreement.`,
      callout: {
        kind: 'takeaway',
        title: 'Tonal cue',
        body:
`**Concession** usually carries a softening word: *granted, admittedly, while it is true that, to be sure.* Without that softening, it\'s an **opposing viewpoint** — and the author is simply disagreeing.`,
      },
      checkpoint: {
        id: 'm4-concession',
        kind: 'mcq',
        prompt:
          'Stimulus: "Admittedly, solar panels are expensive to install. But over a twenty-year horizon, they save more than they cost." The first sentence is a:',
        choices: [
          { id: 'a', text: 'Opposing viewpoint — the author disagrees with it entirely.' },
          { id: 'b', text: 'Concession — the author acknowledges it but still holds the original view.' },
          { id: 'c', text: 'Premise — it supports the conclusion directly.' },
        ],
        correct: 'b',
        explanation:
          '"Admittedly" is a concession cue. The author agrees panels are expensive but holds onto the original view that they\'re worth it over time.',
      },
    },
    {
      slug: 'de-abstractify',
      title: 'De-abstractify: the master skill',
      kicker: 'Section 4',
      body:
`> The ability to **de-abstractify** (translating vague and abstract terms that appear in answer choices into their stimulus equivalents) and knowing exactly what they are referring to is one of the most important skills that the advanced student needs to master.

If you don\'t have this ability, you will end up choosing a wrong answer even when you knew what you were looking for — because you didn\'t understand what the answer choice was trying to say. Advanced students read through a list of abstract answer choices and know *exactly* what each is referring to.

The technique (from Module 2): extract keywords → translate them into LSAT-specific meaning → match against the stimulus\'s structure.`,
      checkpoint: {
        id: 'm4-deabs',
        kind: 'mcq',
        prompt:
          'On the LSAT, the word "**explanation**" in an answer choice means:',
        choices: [
          { id: 'a', text: 'Any clarifying statement.' },
          { id: 'b', text: 'A definition.' },
          { id: 'c', text: 'A cause.' },
          { id: 'd', text: 'An assumption.' },
        ],
        correct: 'c',
        explanation:
          '"On the LSAT, the word ‘explanation\' has a very strict and precise meaning, it simply means cause." Whenever you see "explanation" in an answer choice, check the stimulus for cause-and-effect reasoning.',
      },
    },
    {
      slug: 'taxonomy-1-5',
      title: 'The 15-pattern taxonomy — patterns 1–5',
      kicker: 'Section 5',
      body:
`1. **"It is used to illustrate the general principle that the argument presupposes."**
Three requirements: the quoted statement is an *example*; behind it is a *principle* (should/shouldn\'t, applies to categories); the argument *requires* that principle.

2. **"It is an illustration of a premise that is used to support the argument\'s conclusion."**
The quoted statement is a concrete example of what one of the argument\'s premises claims. *John smoked two packs a day since sixteen → example of the premise "smoking causes lung cancer."*

3. **"It is used to counter a consideration that might be taken to undermine the argument\'s conclusion."**
Pre-emptive strike. The author anticipates an objection and neutralizes it inside the premises.

4. **"It makes an observation that, according to the argument, is insufficient to justify the claim that the argument concludes is false."**
Two viewpoints. The author argues *against* an opponent\'s claim. The opponent offered an observation in support; the author says that observation isn\'t enough.

5. **"It describes a phenomenon for which the argument\'s conclusion is offered as an explanation."**
Cause/effect. The quoted statement is the *effect*; the conclusion is the *cause* offered for it.`,
      checkpoint: {
        id: 'm4-tax-1-5',
        kind: 'mcq',
        prompt:
          'Stimulus: "Unemployment jumped last quarter. The most likely reason is the recent interest-rate hike." The unemployment sentence plays which role?',
        choices: [
          { id: 'a', text: 'It is a principle the argument presupposes.' },
          { id: 'b', text: 'It describes a phenomenon for which the argument\'s conclusion is offered as an explanation.' },
          { id: 'c', text: 'It is used to counter an objection.' },
        ],
        correct: 'b',
        explanation:
          'Cause/effect structure with the effect stated first and the cause (interest-rate hike) offered as conclusion. Pattern #5.',
      },
    },
    {
      slug: 'taxonomy-6-10',
      title: 'The 15-pattern taxonomy — patterns 6–10',
      kicker: 'Section 6',
      body:
`6. **"It is a general principle whose validity the argument questions."**
The quoted statement is a principle (prescriptive, applies to categories), and the author is arguing *against* its truth.

7. **"It denies a claim that the argument takes to be assumed in the reasoning it rejects."**
The author rejects the *opponent\'s* reasoning by going after an assumption that opponent\'s argument rests on.

8. **"It is a claim for which no justification is provided but that is required to establish the argument\'s main conclusion."**
A *premise* (no justification) that is *necessary* for the main conclusion. If untrue → conclusion fails.

9. **"It is a claim for which justification is provided and that, if true, establishes the truth of the argument\'s main conclusion."**
An *intermediate conclusion* that *guarantees* the main conclusion.

10. **"It is what the author\'s argument purports to explain."**
Same as #5 — the quoted statement is the phenomenon being explained.`,
      checkpoint: {
        id: 'm4-tax-6-10',
        kind: 'mcq',
        prompt:
          'An answer says the quoted statement is "required to establish the main conclusion" and has "no justification provided." What structural role?',
        choices: [
          { id: 'a', text: 'Main conclusion.' },
          { id: 'b', text: 'Intermediate conclusion.' },
          { id: 'c', text: 'Premise — necessary, unsupported.' },
          { id: 'd', text: 'Opposing viewpoint.' },
        ],
        correct: 'c',
        explanation:
          'Pattern #8. "Required" → necessary. "No justification provided" → not supported by anything else. That combination is exactly a premise that is load-bearing for the conclusion.',
      },
    },
    {
      slug: 'taxonomy-11-15',
      title: 'The 15-pattern taxonomy — patterns 11–15',
      kicker: 'Section 7',
      body:
`11. **"It is a hypothesis that the argument attempts to undermine by calling into question the sufficiency of the evidence."**
"Hypothesis" = a potential causal explanation (science/medicine stimuli). The author says the evidence is *not enough* to support the hypothesis.

12. **"It is the conclusion of the argument as a whole but is not the only explicitly stated conclusion in the argument."**
Main conclusion — *and* an intermediate conclusion also exists in the argument.

13. **"It is a statement that the argument is intended to support but is not the conclusion of the argument as a whole."**
Supported by the argument but not the main conclusion → intermediate conclusion.

14. **"It is a statement for which some evidence is provided and that itself is offered as support for the conclusion of the argument as a whole."**
Also an intermediate conclusion — supported by evidence, supports the main conclusion.

15. **"It is the conclusion of the argument as a whole and is supported by another statement for which support is offered."**
Main conclusion — supported by an intermediate conclusion (which is itself supported).`,
      callout: {
        kind: 'takeaway',
        title: 'Pattern family map',
        body:
`**Main conclusion family:** 12, 14 (IC), 15.
**Intermediate conclusion family:** 9, 13, 14.
**Premise family:** 1, 2, 3, 8.
**Against-an-opposing-view family:** 4, 6, 7, 11.
**Cause/effect family:** 5, 10, 11.`,
      },
      checkpoint: {
        id: 'm4-tax-11-15',
        kind: 'mcq',
        prompt:
          'Which pattern, when correct, *requires the stimulus to contain an intermediate conclusion*?',
        choices: [
          { id: 'a', text: 'Pattern 12 — "the conclusion of the argument as a whole but is not the only explicitly stated conclusion."' },
          { id: 'b', text: 'Pattern 2 — "an illustration of a premise."' },
          { id: 'c', text: 'Pattern 5 — "describes a phenomenon for which the conclusion is the explanation."' },
        ],
        correct: 'a',
        explanation:
          '"Not the only explicitly stated conclusion" forces the existence of a second conclusion — i.e., an intermediate one. If you can\'t find one, #12 is wrong.',
      },
    },
  ],
  lsatSet: [
    {
      id: 'pt34-s3-q14',
      source: 'PT34 S3 Q14',
      trait: 'Difficult Trait #1 — main conclusion vs. intermediate conclusion',
      stimulus:
`People's political behavior frequently does not match their rhetoric. Although many complain about government intervention in their lives, *they tend not to re-elect inactive politicians*. But a politician's activity consists largely in the passage of laws whose enforcement affects voters' lives; Thus, voters often re-elect politicians whose behavior they resent.`,
      stem:
`Which one of the following most accurately describes the role played in the argument by the claim that people tend not to re-elect inactive politicians?`,
      choices: [
        { letter: 'A', text: 'It describes a phenomenon for which the argument\'s conclusion is offered as an explanation.' },
        { letter: 'B', text: 'It is a premise offered in support of the conclusion that voters often re-elect politicians whose behavior they resent.' },
        { letter: 'C', text: 'It is offered as an example of how a politician\'s activity consists largely in the passage of laws whose enforcement interferes with voters\' lives.' },
        { letter: 'D', text: 'It is a generalization based on the claim that people complain about government intervention in their lives.' },
        { letter: 'E', text: 'It is cited as evidence that people\'s behavior never matches their political beliefs.' },
      ],
      correct: 'B',
      structureMap:
`Premise 1: People complain about government intervention, yet they don\'t re-elect inactive politicians.
  (Implicit: so they actually vote for active politicians.)
Premise 2: A politician\'s activity consists largely in passing laws whose enforcement affects voters\' lives.
Intermediate Conclusion: "Thus, voters often re-elect politicians whose behavior they resent."
Main Conclusion (Statement 1): People\'s political behavior does not match their rhetoric.

The quoted claim ("they tend not to re-elect inactive politicians") is part of Premise 1 — a premise that supports the intermediate conclusion.`,
      explanation:
`The quoted claim is a premise supporting the intermediate conclusion that voters often re-elect politicians whose behavior they resent. That is exactly what B says. Don\'t run from the convoluted name — even though B refers to that intermediate conclusion as "the conclusion," the description of the *role* (a premise supporting it) is accurate.

- **A** is wrong because the argument\'s main conclusion isn\'t offered as a cause of the quoted statement; there\'s no cause/effect structure between them.
- **C** misreads the relationship — the quoted statement isn\'t an example of what politicians do, it\'s a claim about voter behavior.
- **D** invents a generalization-from-premise relationship that isn\'t in the stimulus.
- **E** is too strong ("never") and misrepresents the author\'s conclusion, which was "frequently does not match," not "never."`,
    },
  ],
  summary: {
    headline: 'Role Questions — methodology locked.',
    didWell: [
      'Ran the 3-step method on the inflation and court-system examples.',
      'Separated concession from opposing viewpoint using tonal cues.',
      'Mapped the 15 abstract patterns to their family (premise / IC / MC / against-opponent / cause-effect).',
    ],
    watchFor: [
      'Patterns that *require* an intermediate conclusion to exist — if there isn\'t one, eliminate.',
      '"Explanation" and "hypothesis" — always trigger a cause/effect scan.',
    ],
    nextUp: 'Difficult Traits 1, 2, 3 on real LSAT stimuli.',
  },
};
