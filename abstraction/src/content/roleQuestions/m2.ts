import type { Module } from '../types';

export const m2: Module = {
  slug: 'answer-choices',
  order: 2,
  title: 'Reading Answer Choices: Six Suspicious Types',
  subtitle: 'Word-for-word parsing of the six patterns that hide in wrong LR answers.',
  orientation: {
    whatItIs:
      'A drill on the six most common suspicious answer-choice patterns: Opposite, Out of Scope, Too Strong / Too Weak, Half Right / Half Wrong, Describes-What-Didn\'t-Happen, and Too Vague / Abstract. You commit to a diagnosis before the coaching appears.',
    whyItMatters:
      'Most wrong LR answers on the hardest questions fall into one of these six shapes. Naming the shape is how you eliminate fast and stop second-guessing.',
    youWillBeAbleTo: [
      'Spot an Opposite answer on Strengthen/Weaken/MBT/MSS questions automatically.',
      'Separate "out of scope" traps from legitimately narrow or wide answers.',
      'Parse an answer word-by-word, flagging red-flag terms instead of gist-reading.',
      'Identify the one-word-out-of-place trap on vague/abstract choices.',
    ],
  },
  sections: [
    {
      slug: 'focus-on-answer-choices',
      title: 'Focus on the answer choices',
      kicker: 'Orientation',
      body:
`> Read each answer choice word for word, paying special attention to terms that are unclear or suspicious looking.

Many wrong answers can be eliminated because they are **out of scope** — what the answer is describing is something different from what was talked about in the stimulus. An answer choice that talks about something different from what was described in the stimulus will usually be wrong.

But note: for different categories of LR questions, **different types of wrong answers apply.** For Find the Conclusion or Must be True, out-of-scope is wrong. For Strengthen, Weaken, and even Necessary Assumption — where outside or unexpected information is acceptable — out-of-scope is *not* automatic grounds for elimination.

There are six suspicious patterns that appear frequently: some are automatically wrong, some are wrong depending on question type, and some need to be weighed against the other choices.`,
      checkpoint: {
        id: 'm2-focus',
        kind: 'mcq',
        prompt:
          'On a Strengthen question, you see an answer choice that introduces information not mentioned in the stimulus. What should you do?',
        choices: [
          { id: 'a', text: 'Eliminate immediately — it\'s out of scope.' },
          { id: 'b', text: 'Keep it — outside information can legitimately strengthen.' },
          { id: 'c', text: 'Eliminate only if the information contradicts the stimulus.' },
        ],
        correct: 'b',
        explanation:
          'On Strengthen, Weaken, and Necessary Assumption, outside information is acceptable in correct answers. Being "out of scope" is NOT automatic grounds for elimination on these question types. You have to judge whether the information moves the conclusion.',
      },
    },
    {
      slug: 'opposite',
      title: 'Opposite Answers',
      kicker: 'Pattern 1 of 6',
      body:
`Opposite answers give us a result that is the **exact opposite** of what we want.

- An answer choice that is *attacking* the conclusion will be wrong on a **Strengthen** question.
- An answer choice describing something that *cannot* be true will be wrong on a **Must be True** question.

Opposite answers appear most frequently in **Strengthen, Weaken, MBT, MSS, and Point of Agreement/Disagreement** questions.

Opposite answers will **always** be wrong.`,
      callout: {
        kind: 'warning',
        title: 'Red flag',
        body: 'An answer choice that would be correct if the question were asking the *opposite* thing.',
      },
      checkpoint: {
        id: 'm2-opposite',
        kind: 'mcq',
        prompt: 'Stimulus argues electric bikes reduce urban traffic. Question stem: "Which of the following, if true, most strengthens the argument?"\n\nWhich choice is the classic Opposite trap?',
        choices: [
          { id: 'a', text: 'E-bike sales have tripled in cities with new bike lanes.', redFlag: false },
          { id: 'b', text: 'Drivers who switch to e-bikes often sell their cars.', redFlag: false },
          { id: 'c', text: 'E-bike riders tend to take the same congested roads as cars, worsening bottlenecks.', redFlag: true },
          { id: 'd', text: 'E-bikes require less energy per mile than cars.', redFlag: false },
        ],
        correct: 'c',
        explanation:
          'C would weaken — it suggests e-bikes actually make traffic worse. That\'s the Opposite trap on a Strengthen question. Always wrong.',
      },
    },
    {
      slug: 'out-of-scope',
      title: 'Out of Scope Answers',
      kicker: 'Pattern 2 of 6',
      body:
`An out-of-scope answer will usually talk about something **unrelated** to the specific subject in the stimulus. If the stimulus is about dogs and the answer is about cats, it\'s usually wrong.

The test makers mask this in three ways:

### Unwarranted connections
Two discrete, independent concepts are discussed in the stimulus, and the answer draws a connection between them that is unsupported. *Example: stimulus says both disease and war caused many deaths during WWI; answer says "military injuries led to the spread of diseases" — unwarranted.*

### Scope too narrow
The answer discusses a group that is a **subset** of the stimulus group. *Example: stimulus about African primates, answer about gorillas in Rwanda.* Narrow answers can be correct on MBT/MSS (inference types) — "if New York is in the US, then Manhattan is in the US" is fine. For other types, case-by-case.

### Scope too wide
The answer discusses a topic **broader** than the stimulus. Usually wrong. But in Strengthen/Weaken/Explain — where outside information is fair game — it\'s not automatic. In SA/NA, an apparently out-of-scope answer that either **establishes** the conclusion (SA) or is **necessary** to the reasoning (NA) is fine.`,
      checkpoint: {
        id: 'm2-oos',
        kind: 'mcq',
        prompt: 'You\'re on a Must be True question. The stimulus talks about European songbirds. An answer talks about "finches in the Swiss Alps." Default read?',
        choices: [
          { id: 'a', text: 'Eliminate — it\'s narrower than the stimulus.' },
          { id: 'b', text: 'Keep — narrow-scope answers are often correct on MBT because anything true of the larger group is true of a subset.' },
          { id: 'c', text: 'Eliminate — MBT never allows narrowing.' },
        ],
        correct: 'b',
        explanation:
          'On MBT/MSS, narrowing of scope doesn\'t matter as long as the claim can be inferred from the stimulus. If it\'s true of European songbirds, it\'s true of finches in the Swiss Alps.',
      },
    },
    {
      slug: 'too-strong-too-weak',
      title: 'Answers That Are Too Strong / Too Weak',
      kicker: 'Pattern 3 of 6',
      body:
`Strongly or weakly worded answers are **not automatic grounds for dismissal.** The preference depends on question type:

- **Sufficient Assumption**: we like strongly worded answers.
- **Necessary Assumption**: we prefer more conservatively worded answers.
- **Strengthen / Weaken**: strongly worded answers with clear impact tend to beat answers whose impact is unclear.`,
      checkpoint: {
        id: 'm2-strong-weak',
        kind: 'mcq',
        prompt: 'On a Necessary Assumption question, two contenders survive. One uses "all" and "only," the other uses "at least some." Which tends to be more defensible?',
        choices: [
          { id: 'a', text: 'The "all / only" version — stronger is safer.' },
          { id: 'b', text: 'The "at least some" version — NA prefers conservatively worded answers.' },
          { id: 'c', text: 'Equal — wording doesn\'t matter on NA.' },
        ],
        correct: 'b',
        explanation:
          'NA looks for what the argument *requires.* Strong phrasing ("all / only") is often more than the argument actually needs. Weaker phrasing is usually what is minimally necessary and therefore defensible.',
      },
    },
    {
      slug: 'half-right-half-wrong',
      title: 'Half Right / Half Wrong',
      kicker: 'Pattern 4 of 6',
      body:
`An essential habit for the hardest LR (and RC) questions is to **carefully parse the answer choices**, looking for suspicious keywords or concepts and connections that seem out of place.

The test makers love to offer an answer that is **only partially correct**. The first half may look right, but the second half will contain out-of-scope information. Review each answer word by word, looking for red flags.`,
      callout: {
        kind: 'warning',
        body:
`If the first clause feels perfect, slow down on the second clause. That is where the trap lives.`,
      },
      checkpoint: {
        id: 'm2-half-right',
        kind: 'mcq',
        prompt:
          'Stimulus concludes that a city\'s new bike lane reduced collisions. An answer reads: "The new bike lane reduced collisions in the downtown area **and increased tourism revenue citywide**." What\'s the problem?',
        choices: [
          { id: 'a', text: 'Nothing — both clauses are restating the conclusion.' },
          { id: 'b', text: 'The second clause imports an out-of-scope topic (tourism revenue) that the stimulus never discussed.' },
          { id: 'c', text: 'The first clause is wrong; the second is fine.' },
        ],
        correct: 'b',
        explanation:
          'Classic Half Right / Half Wrong. The first clause mirrors the stimulus; the second drifts into an unrelated outcome. Even one suspicious clause is grounds for elimination on Role/Method/Flaw/Find-the-Conclusion.',
      },
    },
    {
      slug: 'didnt-happen',
      title: 'Answers Describing Something That Did Not Happen',
      kicker: 'Pattern 5 of 6',
      body:
`For questions whose correct answer describes a **feature of the stimulus\'s argument** (Role, Method, Flaw), watch for answer choices describing something that **does not happen** in the argument.

For these four question types — Role, Method, Flaw, and similar description questions — read the answer choice, think about what it means, isolate any suspicious words, and ask yourself:

> **"Does the author do this in their argument?"**

If the answer is no, eliminate.

Note: on Strengthen/Weaken, an answer describing something not in the stimulus can still be correct — the same pattern applies differently across question types.`,
      checkpoint: {
        id: 'm2-didnt-happen',
        kind: 'mcq',
        prompt:
          'Role question. An answer reads: "The cited statement is a counterexample the author uses to reject a well-known scientific study." You scan the stimulus. No scientific study is mentioned. Action?',
        choices: [
          { id: 'a', text: 'Keep it — maybe the study is implied.' },
          { id: 'b', text: 'Eliminate — on Role questions, an answer that describes something the author did not do is wrong.' },
          { id: 'c', text: 'Eliminate only if the author also didn\'t use counterexamples.' },
        ],
        correct: 'b',
        explanation:
          'On Role/Method/Flaw, test whether each clause of the answer maps to something the author actually did. If the scientific study is not in the stimulus, the answer is describing something that did not happen. Gone.',
      },
    },
    {
      slug: 'too-vague',
      title: 'Answers That Are Too Vague / Abstract',
      kicker: 'Pattern 6 of 6',
      body:
`The correct answer can be **vaguely worded.** Extracting keywords from abstract answers to figure out what they\'re *actually* talking about is one of the most valuable — and most under-developed — LSAT skills.

When faced with an abstract answer choice:

- Read the answer choice over; extract keywords that stand out.
- Think about what those keywords mean in an LSAT-specific setting.
- If it\'s a **noun**, ask: does this concept appear in the stimulus?
- If it\'s a **verb**, ask: does the author do this in the argument?
- If it\'s an **adjective/adverb**, ask: does it correctly describe the tone or strength of the author\'s argument?
- Read the answer again and try to match what it\'s describing to the stimulus\'s structure.
- Don\'t be afraid to go back and forth between the answer and the stimulus.`,
      callout: {
        kind: 'warning',
        title: 'The one-word trap',
        body:
`A common trick: an almost-perfect answer with a **glaring error — usually one single word placed right next to the correct answer, which is worded vaguely.** This trap appears over and over again. Slow down on every adjective.`,
      },
      application: {
        prompt:
          'Pick a recent LR question you got wrong on a vague answer. Write, in your own words, the LSAT-specific translation of one abstract word in that answer.',
        placeholder: 'e.g., "generalization" in that answer = a descriptive claim about a category',
        modelAnswer:
          'Good translations stay concrete: "presupposes" → "requires," "illustration" → "example," "explanation" → "cause," "generalization" → "descriptive claim about a category," "hypothesis" → "potential causal explanation."',
      },
      checkpoint: {
        id: 'm2-vague',
        kind: 'mcq',
        prompt:
          'Which of these is the first question to ask when a **verb** in an abstract answer choice feels suspicious?',
        choices: [
          { id: 'a', text: 'Does this verb appear as a noun anywhere in the stimulus?' },
          { id: 'b', text: 'Does the author *do this* in their argument?' },
          { id: 'c', text: 'Does this verb strengthen or weaken the argument?' },
        ],
        correct: 'b',
        explanation:
          'Verbs describe actions. On description-type questions especially, the test is literal: does the author actually perform that action in the stimulus? If not, the answer is wrong.',
      },
    },
  ],
  lsatSet: [],
  summary: {
    headline: 'Six suspicious patterns — diagnosable on sight.',
    didWell: [
      'Parsed answers word-by-word instead of gist-reading.',
      'Matched each suspicion pattern to the question types where it applies.',
      'Kept Strengthen/Weaken-type flexibility separate from Role/Method/Flaw\'s literal description demands.',
    ],
    watchFor: [
      'The one-word trap in vague answers.',
      'Answers where the second clause drifts out of scope.',
    ],
    nextUp: 'Decoding the fourteen most abstract question stems.',
  },
};
