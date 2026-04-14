import type { Module } from '../types';

export const m1: Module = {
  slug: 'keywords',
  order: 1,
  title: 'Foundations: The Keyword List',
  subtitle: 'Seven LSAT terms that change meaning the moment you sit down to the test.',
  orientation: {
    whatItIs:
      'A focused vocabulary pass on the seven terms the LSAT uses with strict, LSAT-specific meanings: presuppose, illustrate, general principle, facts, decision, principle, and generalization. Each term is defined the way the LSAT uses it — not the way everyday English uses it.',
    whyItMatters:
      'Role questions, Assumption questions, and most of the hardest LR answer choices hinge on these words. If you read them with their everyday meanings, you will eliminate correct answers and pick wrong ones with confidence.',
    youWillBeAbleTo: [
      'Translate "presuppose" to "require" on sight.',
      'Recognize an "illustration" as simply an example.',
      'Distinguish a principle (prescriptive) from a generalization (descriptive).',
      'Classify statements in an argument as facts, decisions, principles, or generalizations.',
    ],
  },
  sections: [
    {
      slug: 'presuppose',
      title: 'Presuppose',
      kicker: 'Keyword 1 of 7',
      body:
`In daily usage, a presupposition can mean either an assumption or something that is necessary.

**On the LSAT, presuppose simply means "require."** It refers to a necessary condition — something we will soon cover in depth in the Assumption chapters.

Whenever you see "presuppose" in an answer choice, mentally replace it with "require." If the stimulus doesn't actually require the thing being described, the answer is wrong.`,
      callout: {
        kind: 'takeaway',
        body: `**presuppose → require.** Not "imagine" or "take for granted" — *require*.`,
      },
      checkpoint: {
        id: 'm1-presuppose',
        kind: 'mcq',
        prompt: 'An answer choice reads: "It illustrates a condition the argument presupposes." What must the stimulus contain for this answer to be correct?',
        choices: [
          { id: 'a', text: 'An example of a condition the argument takes for granted as *likely*.' },
          { id: 'b', text: 'An example of a condition the argument *requires* to be true.' },
          { id: 'c', text: 'A condition that makes the argument stronger but is not needed.' },
          { id: 'd', text: 'A condition the author personally believes.' },
        ],
        correct: 'b',
        explanation:
          'On the LSAT, "presuppose" = "require." The condition must be necessary — if it failed, the argument would fail. "Likely," "stronger-but-not-needed," and "personally believed" all miss the necessity.',
      },
    },
    {
      slug: 'illustrate',
      title: 'Illustrate',
      kicker: 'Keyword 2 of 7',
      body:
`An illustration, as it appears in a Logical Reasoning (LR) question, is simply referring to an **example** or **examples**.

When an answer choice says a statement "illustrates" something, ask: *is the quoted statement an example of the thing being described?* If it isn't literally an example, the answer is wrong — no matter how plausible it sounds.`,
      callout: { kind: 'takeaway', body: `**illustrate → give an example of.**` },
      checkpoint: {
        id: 'm1-illustrate',
        kind: 'mcq',
        prompt:
          'Stimulus: "Pharmaceutical companies often resist publishing negative trial results. Last year, Pharma Co. refused to release three failed studies." An answer reads: "The second sentence illustrates the claim made in the first." Is this answer type accurate about what "illustrate" requires?',
        choices: [
          { id: 'a', text: 'Yes — the second sentence is a concrete example of the first\'s general claim.' },
          { id: 'b', text: 'No — "illustrate" requires the second sentence to logically entail the first.' },
          { id: 'c', text: 'No — "illustrate" requires the second sentence to be a principle.' },
        ],
        correct: 'a',
        explanation:
          'Illustration = example. The first sentence makes a general claim about an industry pattern; the Pharma Co. sentence is a concrete example of that pattern. That is exactly what "illustrate" demands.',
      },
    },
    {
      slug: 'general-principle',
      title: 'General Principle',
      kicker: 'Keyword 3 of 7',
      body:
`A principle is a rule on what we should or shouldn't do. It **applies to multiple conditions and scenarios.**

Scope matters. "John is always tired in the morning, he should go to bed earlier" is *not* a principle — it's about one person. "Those who are tired in the morning should strive to get to bed earlier" *is* a principle: it's no longer about John, it's a recommendation for a category of people.`,
      callout: {
        kind: 'note',
        body:
`A principle must be **generalizable** (apply beyond one person/case) and **prescriptive** (tell us what should or shouldn't happen).`,
      },
      checkpoint: {
        id: 'm1-general-principle',
        kind: 'mcq',
        prompt: 'Which of the following is a general principle?',
        choices: [
          { id: 'a', text: 'Maria should apologize to her brother before dinner.' },
          { id: 'b', text: 'Most people feel better after eight hours of sleep.' },
          { id: 'c', text: 'Anyone who causes harm through negligence should be held responsible.' },
          { id: 'd', text: 'Last year\'s tax policy was poorly designed.' },
        ],
        correct: 'c',
        explanation:
          'C applies to a category ("anyone who causes harm through negligence") and is prescriptive ("should be held responsible"). A is about one person. B is descriptive, not prescriptive. D is a particular evaluation, not a generalizable rule.',
      },
    },
    {
      slug: 'facts',
      title: 'Facts',
      kicker: 'Keyword 4 of 7',
      body:
`**Facts** are statements such as "Canada is the largest country in the world" or "Water consists of hydrogen and oxygen."

- Facts are **not arguments by themselves.**
- They can serve as **premises** or **background information** in an argument.`,
      checkpoint: {
        id: 'm1-facts',
        kind: 'multi',
        prompt: 'Which roles can a fact play within an LR argument? (Select all that apply.)',
        choices: [
          { id: 'a', text: 'Premise' },
          { id: 'b', text: 'Background information' },
          { id: 'c', text: 'Standalone argument' },
          { id: 'd', text: 'Conclusion' },
        ],
        correct: ['a', 'b'],
        explanation:
          'Facts are not arguments by themselves, so they cannot *be* a standalone argument. On the LSAT, a conclusion is an opinion/claim being argued for — facts typically serve as premises or background, not as the conclusion the author is arguing for.',
      },
    },
    {
      slug: 'decision',
      title: 'Decision',
      kicker: 'Keyword 5 of 7',
      body:
`A **decision** is a choice made — for example, "I will be taking the train from Canada to USA instead of Bus."

**Role in arguments**: decisions can play roles as **premises** or **conclusions.**

A decision stated without justification often functions as a premise. A decision being argued *for* (with reasons offered) is the conclusion.`,
      checkpoint: {
        id: 'm1-decision',
        kind: 'short',
        prompt:
          'In one sentence, explain how you would tell whether a decision-statement in an argument is functioning as a premise or a conclusion.',
        correct: 'conclusion',
        explanation:
          'The test is: is anything else in the argument offered as *support* for the decision? If yes, the decision is the conclusion. If the decision is just stated and used to support something else, it\'s a premise.',
      },
    },
    {
      slug: 'principle',
      title: 'Principle',
      kicker: 'Keyword 6 of 7',
      body:
`A **principle** is a generalizable statement used to guide or justify (similar to a rule) future or past actions or decisions.

Example: *"Punishment should be proportional to the crime committed."*

**Role in arguments**: principles can be **premises** or **conclusions.**`,
      checkpoint: {
        id: 'm1-principle',
        kind: 'mcq',
        prompt: 'Which statement functions most clearly as a principle?',
        choices: [
          { id: 'a', text: 'Dr. Kim charged a fair fee for her work on the Chen case.' },
          { id: 'b', text: 'Professionals should charge fees proportional to the complexity of the work.' },
          { id: 'c', text: 'Most professionals charge by the hour.' },
          { id: 'd', text: 'The Chen case was unusually complex.' },
        ],
        correct: 'b',
        explanation:
          'B states a rule that guides future actions, applies across many professionals, and is prescriptive. A is a particular evaluation; C is descriptive; D is a fact.',
      },
    },
    {
      slug: 'generalization',
      title: 'Generalization',
      kicker: 'Keyword 7 of 7',
      body:
`A **generalization** is a summary statement derived from smaller findings, like "All swans are white."

Crucial distinction:

- **Generalizations describe** what *is.*
- **Principles prescribe** what *should* or *ought* to be.

**Role in arguments**: generalizations can function as **premises** or **conclusions.**`,
      callout: {
        kind: 'takeaway',
        body:
`Principle vs. generalization — memorize this:
- **Principle → "should / ought"** (prescriptive)
- **Generalization → "is / are"** (descriptive)`,
      },
      checkpoint: {
        id: 'm1-generalization',
        kind: 'mcq',
        prompt: 'Which is a generalization rather than a principle?',
        choices: [
          { id: 'a', text: 'Drivers who text while driving should lose their licenses.' },
          { id: 'b', text: 'Drivers who text while driving cause more accidents than those who don\'t.' },
          { id: 'c', text: 'People ought to obey the traffic laws of their country.' },
        ],
        correct: 'b',
        explanation:
          'B describes a fact pattern across many drivers — descriptive. A and C prescribe what should happen — those are principles.',
      },
    },
  ],
  lsatSet: [],
  summary: {
    headline: 'Keyword fluency — locked in.',
    didWell: [
      'Translated LSAT-specific vocabulary rather than reading it as everyday English.',
      'Kept principle (prescriptive) and generalization (descriptive) separate.',
      'Recognized facts as serving premise/background roles, not standalone arguments.',
    ],
    watchFor: [
      'The word "presuppose" in long, abstract answer choices — always translate to "require."',
      'One-person claims dressed up as principles — principles apply to categories.',
    ],
    nextUp: 'Reading answer choices word-for-word for the six suspicious patterns.',
  },
};
