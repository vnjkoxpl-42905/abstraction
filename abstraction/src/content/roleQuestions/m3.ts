import type { Module } from '../types';

// Each of the 14 stems from the Homework PDF, with translation drills.
// For each: raw stem, student commits to a plain-English translation (short answer),
// then the canonical translation is revealed.

interface StemEntry { id: string; raw: string; translation: string; keywords: string[]; }

const stems: StemEntry[] = [
  {
    id: '1',
    raw: 'It is used to illustrate the general principle that the argument presupposes.',
    keywords: ['illustrate', 'general principle', 'presupposes'],
    translation:
      'The quoted statement is an example of a rule (applying to many cases) that the argument *requires* to be true. Three requirements: the statement is an example; behind it is a should/shouldn\'t rule; and the argument needs that rule to stand.',
  },
  {
    id: '2',
    raw: 'It is an illustration of a premise that is used to support the argument\'s conclusion.',
    keywords: ['illustration', 'premise'],
    translation:
      'The quoted statement is an example of one of the argument\'s premises. Isolate the premise(s); ask whether the quoted statement is a concrete instance of what that premise is claiming.',
  },
  {
    id: '3',
    raw: 'It is used to counter a consideration that might be taken to undermine the argument\'s conclusion.',
    keywords: ['counter', 'undermine'],
    translation:
      'The quoted statement is a pre-emptive strike against a potential counter-argument. The author anticipates an objection and uses this statement to shut it down in advance.',
  },
  {
    id: '4',
    raw: 'It makes an observation that, according to the argument, is insufficient to justify the claim that the argument concludes is false.',
    keywords: ['observation', 'insufficient', 'concludes is false'],
    translation:
      'There are two viewpoints. The author argues *against* an opponent\'s claim. The opponent supported their claim with an observation, and the author says that observation isn\'t enough to prove the claim.',
  },
  {
    id: '5',
    raw: 'It describes a phenomenon for which the argument\'s conclusion is offered as an explanation.',
    keywords: ['phenomenon', 'explanation'],
    translation:
      '"Explanation" = cause. The quoted statement describes an effect, and the argument\'s conclusion is the *cause* offered for that effect. Cause-and-effect reasoning with the cause in the conclusion.',
  },
  {
    id: '6',
    raw: 'It is a general principle whose validity the argument questions.',
    keywords: ['general principle', 'questions'],
    translation:
      'The quoted statement is a prescriptive rule (applies to a category, should/shouldn\'t), and the author is arguing *against* its truth.',
  },
  {
    id: '7',
    raw: 'It denies a claim that the argument takes to be assumed in the reasoning it rejects.',
    keywords: ['denies', 'assumed', 'rejects'],
    translation:
      'The author rejects an opponent\'s reasoning. Specifically, the author goes after an *assumption* the opponent\'s argument rests on. Two arguments present; the quoted statement denies the opponent\'s assumption.',
  },
  {
    id: '8',
    raw: 'It is a claim for which no justification is provided but that is required to establish the argument\'s main conclusion.',
    keywords: ['no justification', 'required'],
    translation:
      'A premise (no justification) that is necessary for the main conclusion. If untrue, the conclusion fails.',
  },
  {
    id: '9',
    raw: 'It is a claim for which justification is provided and that, if true, establishes the truth of the argument\'s main conclusion.',
    keywords: ['justification provided', 'establishes'],
    translation:
      'An intermediate conclusion (justification *is* provided) that guarantees the main conclusion.',
  },
  {
    id: '10',
    raw: 'It is what the author\'s argument purports to explain.',
    keywords: ['explain'],
    translation:
      'Same structure as #5: the author describes a phenomenon and argues for its cause. The quoted statement is the phenomenon being explained.',
  },
  {
    id: '11',
    raw: 'It is a hypothesis that the argument attempts to undermine by calling into question the sufficiency of the evidence.',
    keywords: ['hypothesis', 'undermine', 'sufficiency of the evidence'],
    translation:
      '"Hypothesis" = a potential causal explanation (usually science/medicine stimuli). The author challenges the hypothesis by saying the available evidence isn\'t enough to support it.',
  },
  {
    id: '12',
    raw: 'It is the conclusion of the argument as a whole but is not the only explicitly stated conclusion of the argument.',
    keywords: ['conclusion as a whole', 'not the only'],
    translation:
      'The main conclusion — and the argument also contains an intermediate conclusion. Both boxes must be checked.',
  },
  {
    id: '13',
    raw: 'It is a statement that the argument is intended to support but is not the conclusion of the argument as a whole.',
    keywords: ['intended to support', 'not the conclusion of the whole'],
    translation:
      'Supported by the argument but not the main conclusion → intermediate conclusion.',
  },
  {
    id: '14',
    raw: 'It is a statement for which some evidence is provided and that is the conclusion of the argument as a whole.',
    keywords: ['some evidence provided', 'conclusion of the whole'],
    translation:
      'The main conclusion, for which evidence is provided. The "some evidence provided" clause just confirms that premises support it — standard main-conclusion structure.',
  },
];

export const m3: Module = {
  slug: 'question-stems',
  order: 3,
  title: 'Decoding Question Stems',
  subtitle: 'Translating the fourteen most abstract question stems into plain English.',
  orientation: {
    whatItIs:
      'A translation drill over the fourteen most common abstract Role-question stems. For each stem, you commit to your own plain-English translation before the canonical translation is revealed.',
    whyItMatters:
      'You cannot pick the right answer to a question you haven\'t decoded. These stems are where most students lose the question before they even read the stimulus.',
    youWillBeAbleTo: [
      'Translate any abstract stem by extracting keywords.',
      'Distinguish "premise," "intermediate conclusion," and "main conclusion" stems at a glance.',
      'Spot cause/effect stems ("explanation," "hypothesis," "phenomenon").',
      'Recognize "counter-argument" and "denies an assumption" structures.',
    ],
  },
  sections: stems.map((s, i) => ({
    slug: `stem-${s.id}`,
    title: `Stem ${s.id} — Translate it`,
    kicker: `${i + 1} of 14`,
    body:
`> ${s.raw}

**Keywords to extract**: ${s.keywords.map(k => `*${k}*`).join(', ')}.

Before revealing the canonical translation, commit to your own. What would the stimulus have to look like for this to be the correct answer?`,
    application: {
      prompt: 'Write your plain-English translation of the stem above. What must be true in the stimulus for this answer to be correct?',
      placeholder: 'Translate the abstract language into what the argument must contain…',
      modelAnswer: s.translation,
    },
    checkpoint: {
      id: `m3-stem-${s.id}-gate`,
      kind: 'short',
      prompt: `In a few words: what is the single most important keyword in this stem?`,
      correct: s.keywords[0],
      hint: 'The one word that, if misread, collapses the whole translation.',
      explanation: `The load-bearing keyword here is **${s.keywords[0]}** — its LSAT-specific meaning drives the entire translation. (All ${s.keywords.length} keywords matter: ${s.keywords.join(', ')}.)`,
    },
  })),
  lsatSet: [],
  summary: {
    headline: 'Fourteen abstract stems — decoded.',
    didWell: [
      'Extracted load-bearing keywords before translating.',
      'Recognized premise / intermediate conclusion / main conclusion signatures.',
      'Separated cause-effect stems from structural-role stems.',
    ],
    watchFor: [
      'Stems that mention a *second* argument or opposing view — those trigger different structural expectations.',
      '"Explanation" and "hypothesis" → always cause/effect.',
    ],
    nextUp: 'The three-step Role-question method and the 15-pattern answer-choice taxonomy.',
  },
};
