import type { Module } from '../types';

export const m5: Module = {
  slug: 'difficult-traits',
  order: 5,
  title: 'Role Questions: Difficult Traits',
  subtitle: 'Three structural traps that separate 165+ scorers from everyone else.',
  orientation: {
    whatItIs:
      'Application module. You work through a curated set of the hardest real LSAT Role questions, each annotated with the difficult trait it tests. The three traits are: (1) IC vs. MC confusion, (2) causal chains ≠ argument structure, and (3) brutal abstraction in the stimulus.',
    whyItMatters:
      'The theory only pays off here. These questions expose exactly the moments where a student who "knows the method" still picks the wrong answer — because they misidentified the main conclusion, conflated a causal chain with an argument chain, or failed to decode an abstract stimulus.',
    youWillBeAbleTo: [
      'Distinguish an intermediate conclusion from the main conclusion under real test pressure.',
      'Analyze a causal chain without mistaking the middle term for an intermediate conclusion.',
      'Slow down on abstract stimuli, summarize each statement, and rearrange structurally before touching answer choices.',
      'Apply the "Describes-What-Didn\'t-Happen" and "Explanation red flag" filters on live questions.',
    ],
  },
  sections: [
    {
      slug: 'difficult-trait-1',
      title: 'Difficult Trait #1 — IC vs. MC confusion',
      kicker: 'Section 1',
      body:
`Structurally analyzing the stimulus is the first step to successfully tackling Role questions. In fact, complicated arguments with multiple premises, intermediate conclusions, and background information is the most common characteristic of harder Role questions.

**Difficult Trait #1: Make sure you are clearly categorizing each statement that appears in the stimulus and argument as you are reading it. Don't confuse the intermediate conclusion for the main conclusion.**

The LSAT loves to present the intermediate conclusion last, with a "thus" or "therefore" — making it look like the main conclusion. The main conclusion is often statement 1: a broad, summary-level claim that the rest of the argument is building toward.

**The test:** after you identify what looks like the conclusion, ask: *is there a broader claim somewhere else that this statement supports?* If yes, what you found is the intermediate conclusion, and that broader claim is the main conclusion.`,
      callout: {
        kind: 'warning',
        title: 'IC trap',
        body:
`A statement that begins with "thus" or "therefore" is NOT automatically the main conclusion. It may be an intermediate conclusion that supports a broader claim stated earlier. Always look for the most general, overarching claim in the stimulus.`,
      },
      checkpoint: {
        id: 'm5-dt1',
        kind: 'mcq',
        prompt:
          'Stimulus: "People\'s political behavior frequently does not match their rhetoric. Although many complain about government intervention, they tend not to re-elect inactive politicians. A politician\'s activity consists largely in passing laws that affect voters\' lives. Thus, voters often re-elect politicians whose behavior they resent." Which statement is the MAIN conclusion?',
        choices: [
          { id: 'a', text: '"Thus, voters often re-elect politicians whose behavior they resent." — it has "thus."' },
          { id: 'b', text: '"People\'s political behavior frequently does not match their rhetoric." — it\'s the broadest, summary-level claim.' },
          { id: 'c', text: '"They tend not to re-elect inactive politicians." — it introduces the key tension.' },
        ],
        correct: 'b',
        explanation:
          'The "thus" statement is the intermediate conclusion — it supports the broader claim in statement 1 that behavior doesn\'t match rhetoric. Statement 1 is the main conclusion because it is the most general claim and everything else leads to it.',
      },
    },
    {
      slug: 'difficult-trait-2',
      title: 'Difficult Trait #2 — Causal chains ≠ argument structure',
      kicker: 'Section 2',
      body:
`When a stimulus contains a causal or conditional chain — A → B → C — students often misread B as an intermediate conclusion. This is wrong.

> An intermediate conclusion is ALWAYS supported by a premise. A → B and B → C are two independent premises. Neither one supports the other. They combine to produce the conclusion A → C.

**Example:**

*Because Megan missed her morning coffee she was not paying attention to her surroundings. As a result she fell down the stairs on her way to school. So not getting your daily dose of caffeine can cause dangerous accidents.*

Causal chain: No Coffee (A) → Not Paying Attention (B) → Accident (C)

Structurally:
- Premise: A → B
- Premise: B → C
- Conclusion: A → C

"Not Paying Attention" (B) is NOT an intermediate conclusion — nothing in the argument supports it as a claim. It is part of a premise.

**The rule:** Always treat the structure of an argument (premise / IC / main conclusion) and the logical content of the argument (cause/effect, sufficient/necessary) as two distinct and separate issues.`,
      callout: {
        kind: 'takeaway',
        title: 'The key test',
        body:
`Ask: "Is this statement supported by another statement in the argument AND does it support a further statement?" Both conditions must be true for it to be an intermediate conclusion. If a middle-chain term is never itself supported by something else in the argument, it is a premise — not an IC.`,
      },
      checkpoint: {
        id: 'm5-dt2',
        kind: 'mcq',
        prompt:
          'Stimulus: "A warm atmosphere heats the oceans, leading to faster evaporation, and the resulting water vapor forms rain clouds more quickly. A warmer atmosphere also holds more moisture, resulting in larger clouds. In general, as water vapor in larger clouds condenses, heavier downpours are more likely to result." Is the last statement (larger clouds → heavier downpours) an intermediate conclusion or a premise?',
        choices: [
          { id: 'a', text: 'Intermediate conclusion — it sits in the middle of a causal chain.' },
          { id: 'b', text: 'Premise — it is an independent piece of support for the main conclusion; nothing in the argument supports it.' },
        ],
        correct: 'b',
        explanation:
          'It\'s a premise. The main conclusion is "a warmer atmosphere leads to more frequent heavy downpours." The last statement is one of three independent premises supporting that conclusion. Just because it appears last in a causal chain doesn\'t make it an intermediate conclusion.',
      },
    },
    {
      slug: 'difficult-trait-3',
      title: 'Difficult Trait #3 — Abstract stimuli',
      kicker: 'Section 3',
      body:
`Role questions are famous for brutally abstract stimuli. When faced with an abstract argument in the stimulus, don't be afraid to slow down, summarize each statement in plain English, and rearrange the information structurally before touching any answer choice.

**The process:**

1. Read each sentence. After each, write a one-line plain-English summary.
2. Ask: "What is this sentence doing? Supporting something? Being supported? Just stating a fact?"
3. Find the argument core. Identify: main conclusion, premises, and intermediate conclusion (if present).
4. Then, and only then, go to the answer choices.

**Example of an abstract stimulus made concrete:**

> "It would be a mistake to say that just because someone is not inclined to do otherwise, she or he does not deserve to be praised for doing what is right."

Plain English: "Lacking the temptation to do wrong doesn't mean you don't deserve credit for doing right."

Once you translate each sentence into plain English, the argument structure becomes visible — and the correct answer almost reveals itself.`,
      callout: {
        kind: 'note',
        body:
`Abstract stimuli reward the student who slows down. On hard Role questions, the student who reads faster loses; the student who maps the argument clearly before touching the answer choices wins.`,
      },
      checkpoint: {
        id: 'm5-dt3',
        kind: 'mcq',
        prompt:
          'When a Role question stimulus is highly abstract and you can\'t immediately see the structure, the correct first move is:',
        choices: [
          { id: 'a', text: 'Skip to the answer choices — the phrasing there will clarify what the stimulus is doing.' },
          { id: 'b', text: 'Summarize each statement in plain English, then map the argument structure before reading any answer choice.' },
          { id: 'c', text: 'Identify the conclusion only, then skip directly to eliminate Opposite and Out-of-Scope answers.' },
        ],
        correct: 'b',
        explanation:
          'Going to answer choices before mapping the structure on an abstract stimulus is the #1 cause of errors. The answer choices on hard Role questions are themselves abstract — without a clear structural map in hand, you will be guessing between two plausible-sounding wrong answers.',
      },
    },
    {
      slug: 'explanation-red-flag',
      title: 'The "explanation" red flag in answer choices',
      kicker: 'Section 4',
      body:
`On Role questions, the word **"explanation"** in an answer choice is a **red flag** — one of the most commonly exploited traps on hard questions.

> "On the LSAT, the word 'explanation' has a very strict and precise meaning: it simply means *cause*."

When you see "explanation" in an answer choice, the answer is claiming that some statement is a **cause** offered for an **effect**. Test that claim against the stimulus:

1. Identify what the answer says is being "explained" (the effect).
2. Identify what the answer says is doing the explaining (the cause).
3. Check the stimulus: does the author actually offer a *cause* for that *effect*?

**If the author rejects a proposed cause but doesn't offer their own, no explanation is present.**

This is the trap on PT79 S1 Q22. The consumer advocate *rejects* the economists' cause (willingness to pay = need), but does not offer a new causal explanation for price gouging. Answer A ("it disputes one explanation in order to make way for an alternative explanation") is wrong precisely because no alternative explanation is offered.`,
      callout: {
        kind: 'warning',
        title: 'Red flag',
        body:
`Every time you see the word **"explanation"** in a Role-question answer choice, pause. Ask: does the author actually offer a *cause* in this stimulus? If no cause is provided, any answer using "explanation" is wrong.`,
      },
      checkpoint: {
        id: 'm5-explanation',
        kind: 'mcq',
        prompt:
          'An answer choice reads: "It disputes one explanation in order to make way for an alternative explanation." For this to be correct, the stimulus must show:',
        choices: [
          { id: 'a', text: 'The author rejecting one proposed cause AND offering a different cause of their own.' },
          { id: 'b', text: 'The author rejecting one proposed cause — whether or not they offer an alternative.' },
          { id: 'c', text: 'The author questioning the evidence for a cause, without taking a position on what the real cause is.' },
        ],
        correct: 'a',
        explanation:
          '"Explanation" = cause. The answer requires TWO causes: one rejected and one offered as the replacement. If the author only rejects the first cause without providing a new one, this answer choice is wrong.',
      },
    },
  ],
  lsatSet: [
    {
      id: 'pt70-s4-q24',
      source: 'PT70 S4 Q24',
      trait: 'Difficult Trait #2 — causal chain ≠ intermediate conclusion',
      stimulus:
`Biologist: Scientists have discovered fossilized bacteria in rocks 3.5 billion years old. The fossils indicate that these bacteria were quite complex and so must have already had a long evolutionary history when fossilized 3.5 billion years ago. However, Earth is only 4.6 billion years old, so the first life on Earth must have appeared soon after the planet's formation, when conditions were extremely harsh. This suggests that life may be able to arise under many difficult conditions throughout the universe.`,
      stem:
`Which one of the following most accurately describes the role played in the biologist's argument by the claim that fossilized bacteria discovered in rocks 3.5 billion years ago must have had a long evolutionary history?`,
      choices: [
        { letter: 'A', text: 'It is a claim for which no support is provided in the argument, and that is used to illustrate the conclusion of the argument as a whole' },
        { letter: 'B', text: 'It is a claim for which no support is provided in the argument, and that itself is used to support a claim that in turn lends support to the conclusion of the argument as a whole' },
        { letter: 'C', text: 'It is a claim for which some support is provided in the argument, and that itself is used to support another claim that in turn lends support to the conclusion of the argument as a whole' },
        { letter: 'D', text: 'It is a claim for which some support is provided in the argument, and that itself is not used to support any other claim in the argument' },
        { letter: 'E', text: 'It is a claim for which some support is provided in the argument, and that itself is used to support two distinct conclusions, neither of which is intended to provide support for the other' },
      ],
      correct: 'C',
      structureMap:
`Fact: Bacteria fossilized 3.5 billion years ago were complex.
Support for IC #1: complexity implies long evolutionary history.
IC #1 (quoted statement): Bacteria must have had a long evolutionary history when fossilized 3.5 billion years ago.
Background: Earth is only 4.6 billion years old.
IC #2: Life first appeared soon after Earth formed, under harsh conditions.
Main Conclusion: Life may be able to arise under many difficult conditions throughout the universe.

The quoted statement is IC #1 — supported by the complexity evidence, and itself supporting IC #2 which supports the main conclusion.`,
      explanation:
`The quoted statement sits in the middle of an argument chain. It has support (the bacteria were complex → must have long history) and it provides support (leading to the deduction that life appeared under harsh early-Earth conditions). That's an intermediate conclusion.

- **A** and **B** are wrong: support IS provided (bacteria complexity).
- **C** is correct: support is provided, and the statement itself supports a further intermediate conclusion (IC #2), which supports the main conclusion.
- **D** is wrong: it IS used to support another claim.
- **E** is wrong: there are not two independent conclusions in this argument.`,
    },
    {
      id: 'pt70-s1-q17',
      source: 'PT70 S1 Q17',
      trait: 'Difficult Trait #2 — causal chain ≠ intermediate conclusion',
      stimulus:
`Meteorologist: Heavy downpours are likely to become more frequent if Earth's atmosphere becomes significantly warmer. A warm atmosphere heats the oceans, leading to faster evaporation, and the resulting water vapor forms rain clouds more quickly. A warmer atmosphere also holds more moisture, resulting in larger clouds. In general, as water vapor in larger clouds condenses, heavier downpours are more likely to result.`,
      stem:
`Which one of the following most accurately describes the role played in the meteorologist's argument by the claim that, in general, as water vapor in larger clouds condenses, heavier downpours are more likely to result?`,
      choices: [
        { letter: 'A', text: 'It is the only conclusion in the argument' },
        { letter: 'B', text: 'It is the conclusion of the argument as a whole but is not the only explicitly stated conclusion in the argument' },
        { letter: 'C', text: 'It is a statement that the argument is intended to support but is not the conclusion of the argument as a whole' },
        { letter: 'D', text: 'It is used to support the only conclusion in the argument' },
        { letter: 'E', text: 'It provides a causal explanation of the phenomenon described by the conclusion of the argument as a whole, but it is not intended to provide support for that conclusion' },
      ],
      correct: 'D',
      structureMap:
`Conclusion (Statement 1): Warmer atmosphere → more frequent heavy downpours.
Premise 1 (Statement 2): Warm atmosphere → faster evaporation → rain clouds form faster.
Premise 2 (Statement 3): Warmer atmosphere → more moisture → larger clouds.
Premise 3 (Statement 4, quoted): Larger clouds → heavier downpours.

Three independent premises support the same conclusion. The quoted statement is Premise 3 — no other statement supports it, and it supports the main conclusion directly.`,
      explanation:
`This is a causal chain stimulus: warm atmosphere → (faster evaporation / larger clouds) → heavier downpours. But the fact that the quoted statement sits in the middle of the causal chain does NOT make it an intermediate conclusion. No other statement in the argument supports the claim that "larger clouds → heavier downpours." It is an unsupported premise.

- **A**: wrong — there is a conclusion (statement 1) and the quoted statement is not it.
- **B**: wrong — the quoted statement is not the conclusion at all.
- **C**: wrong — the argument doesn't support the quoted statement; the quoted statement supports the argument.
- **D**: correct — it is a premise supporting the main (only) conclusion.
- **E**: wrong — the causal relationship does not mean it fails to support the conclusion.`,
    },
    {
      id: 'pt87-s3-q8',
      source: 'PT87 S3 Q8',
      trait: 'Difficult Trait #1 — spotting an IC that isn\'t there',
      stimulus:
`Astronomer: Conditions in our solar system have probably favored the emergence of life more than conditions in most other solar systems of similar age. Any conceivable form of life depends on the presence of adequate amounts of chemical elements heavier than hydrogen and helium, and our sun has an unusually high abundance of these heavier elements of its age.`,
      stem:
`Which one of the following most accurately describes the role played in the astronomer's argument by the claim that any conceivable form of life depends on chemical elements heavier than hydrogen and helium?`,
      choices: [
        { letter: 'A', text: 'It is a statement for which no evidence is provided and that is part of the evidence offered for the argument\'s only conclusion' },
        { letter: 'B', text: 'It is a statement for which no evidence is provided and that is offered as support for another statement that in turn is offered as support for the conclusion of the argument as a whole' },
        { letter: 'C', text: 'It is a statement for which some evidence is provided and that itself is offered as support for the conclusion of the argument as a whole' },
        { letter: 'D', text: 'It is the conclusion of the argument as a whole and is supported by another statement for which support is offered' },
        { letter: 'E', text: 'It is one of two conclusions in the argument, neither of which is offered as support for the other' },
      ],
      correct: 'A',
      structureMap:
`Conclusion: Our solar system has probably favored the emergence of life more than most others.
Premise 1 (quoted): Life requires elements heavier than hydrogen and helium.
Premise 2: Our sun has an unusually high abundance of heavier elements.

No intermediate conclusion. Both premises are independent and support the conclusion directly.`,
      explanation:
`Two independent premises support one conclusion. The quoted statement is a premise with no support provided for it — it's stated as a given. No intermediate conclusion exists.

- **A** is correct: no evidence provided, it's a premise (part of the evidence for the only conclusion).
- **B** is wrong: it implies an intermediate conclusion exists — it doesn't.
- **C** is wrong: the quoted statement is NOT an intermediate conclusion (no evidence is provided for it).
- **D** is wrong: the quoted statement is not the conclusion.
- **E** is wrong: there is only one conclusion, not two.`,
    },
    {
      id: 'pt79-s1-q22',
      source: 'PT79 S1 Q22',
      trait: 'Difficult Trait #2 — "explanation" red flag + opposing viewpoint structure',
      stimulus:
`Consumer advocate: Economists reason that price gouging – increasing the price of goods when no alternative seller is available – is efficient because it allocates goods to people whose willingness to pay more shows that they really need these goods. But willingness to pay is not proportional to need. In the real world, some people simply cannot pay as much as others. As a result, a price increase will allocate goods to people with the most money, not to those with the most need.`,
      stem:
`Which one of the following most accurately describes the role played in the consumer advocate's argument by the claim that willingness to pay is not proportional to need?`,
      choices: [
        { letter: 'A', text: 'It disputes one explanation in order to make way for an alternative explanation' },
        { letter: 'B', text: 'It is the overall conclusion of the argument' },
        { letter: 'C', text: 'It is a component of reasoning disputed in the argument' },
        { letter: 'D', text: 'It is a general principle whose validity the argument questions' },
        { letter: 'E', text: 'It denies a claim that the argument takes to be assumed in the reasoning that it rejects' },
      ],
      correct: 'E',
      structureMap:
`Economists' argument (rejected by consumer advocate):
  Assumption: willingness to pay ∝ need
  Premise: price gouging allocates goods to those willing to pay most
  Conclusion: price gouging is efficient (goods go to those who need them most)

Consumer advocate's argument:
  Premise: some people simply cannot pay as much as others
  IC (quoted statement): willingness to pay is NOT proportional to need  ← attacks economists' assumption
  Conclusion: price increase allocates goods to richest, not most needy

The quoted statement is the consumer advocate's intermediate conclusion — it denies the assumption embedded in the economists' reasoning.`,
      explanation:
`The economists' argument rests on an unstated assumption: that willingness to pay is proportional to need. The quoted statement directly denies that assumption. That is exactly what E describes: "it denies a claim that the argument takes to be assumed in the reasoning that it rejects."

- **A** is the most tempting wrong answer. "Explanation" = cause. The consumer advocate never offers a new causal explanation — they only reject the economists' cause. No alternative explanation = A is wrong.
- **B**: the conclusion is the last statement ("price increase allocates goods to richest").
- **C**: the quoted statement is part of the *consumer advocate's* reasoning, not the reasoning being disputed.
- **D**: the quoted statement is the consumer advocate's own claim, not a principle whose validity is questioned.`,
    },
    {
      id: 'pt59-s2-q7',
      source: 'PT59 S2 Q7',
      trait: 'Difficult Trait #2 — distinguishing "what the argument explains" from "what the argument purports to explain"',
      stimulus:
`Columnist: It has been noted that attending a live musical performance is a richer experience than listening to recorded music. Some say that this is merely because we do not see the performers when we listen to recorded music. However, there must be some other reason, for there is relatively little difference between listening to someone read a story over the radio and listening to someone in the same room read a story.`,
      stem:
`Which one of the following most accurately expresses the role played in the argument by the observation that attending a live musical performance is a richer experience than is listening to recorded music?`,
      choices: [
        { letter: 'A', text: 'It is what the columnist\'s argument purports to show' },
        { letter: 'B', text: 'It is the reason given for the claim that the columnist\'s argument is attempting to undermine' },
        { letter: 'C', text: 'It is what the columnist\'s argument purports to explain' },
        { letter: 'D', text: 'It is what the columnist\'s argument purports to refute' },
        { letter: 'E', text: 'It is what the position that the columnist tries to undermine is purported to explain' },
      ],
      correct: 'E',
      structureMap:
`Statement 1 (quoted): Phenomenon — live music is a richer experience than recorded music. [Not part of the columnist's argument]
Statement 2: Opposing viewpoint — "some say" this is because we don't see the performers.
Statement 3: Columnist's conclusion — there must be some other reason.
Columnist's premise: there is little difference between radio story and in-person story (so "seeing" isn't the factor).

Structure:
Phenomenon (quoted) ← the position in S2 purports to explain it.
Columnist rejects S2's explanation using a counterexample.`,
      explanation:
`The quoted observation (live music > recorded music) is the *phenomenon*. The columnist doesn't explain it — the columnist only rejects one proposed explanation ("because we can't see the performers") with a counterexample. So the quoted observation is what the position the columnist attacks *purports to explain*. That's E.

- **A**: the columnist doesn't conclude that live music is richer — that's taken as given.
- **B**: reverses cause/effect; the quoted statement is the effect, not the reason for anything.
- **C**: the columnist does NOT explain the phenomenon — they only reject someone else's explanation.
- **D**: the columnist doesn't refute the observation — they accept it and dispute the proposed cause.
- **E**: correct. Keyword extraction: "position the columnist tries to undermine" = the "because we don't see performers" claim. What does that position purport to explain? The richer live-music experience.`,
    },
    {
      id: 'pt51-s3-q23',
      source: 'PT51 S3 Q23',
      trait: 'Difficult Trait #3 — abstract stimulus requiring full structural mapping',
      stimulus:
`Ethicist: It would be a mistake to say that just because someone is not inclined to do otherwise, she or he does not deserve to be praised for doing what is right. For although we do consider people especially virtuous if they successfully resist a desire to do what is wrong, they are certainly no less virtuous if they have succeeded in extinguishing all such desires.`,
      stem:
`The assertion that people are considered especially virtuous if they successfully resist a desire to do what is wrong plays which one of the following roles in the ethicist's argument?`,
      choices: [
        { letter: 'A', text: 'It is a claim for which the argument attempts to provide justification' },
        { letter: 'B', text: 'It makes an observation that, according to the argument, is insufficient to justify the claim that the argument concludes is false' },
        { letter: 'C', text: 'It is a claim, acceptance of which, the argument contends, is a primary obstacle to some people having an adequate conception of virtue' },
        { letter: 'D', text: 'It is, according to the argument, a commonly held opinion that is nevertheless false' },
        { letter: 'E', text: 'It reports an observation that, according to the argument, serves as evidence for the truth of its conclusion' },
      ],
      correct: 'B',
      structureMap:
`Conclusion (negated claim): It is NOT the case that lacking the inclination to do wrong means you don't deserve praise for doing right.
Quoted statement (observation): We consider people especially virtuous when they resist a desire to do wrong.
Ethicist's point: Even if that observation is true, it doesn't justify concluding that someone without the desire to do wrong is less praiseworthy — they are "certainly no less virtuous."

The quoted statement is an observation acknowledged as true but held to be insufficient to support the opposing conclusion (that no-temptation people don't deserve praise).`,
      explanation:
`Plain-English translation of the quoted assertion: "People who resist temptation are seen as especially virtuous."

The ethicist concedes this is true — but argues it doesn't justify concluding that those who never had the temptation are *less* praiseworthy. The quoted statement is an observation that the ethicist acknowledges while arguing it is *insufficient* to justify the claim the argument concludes is false (that no-temptation = no deserved praise).

That matches Pattern #4: "It makes an observation that, according to the argument, is insufficient to justify the claim that the argument concludes is false."

- **A**: the argument does not justify the quoted claim — it concedes it and moves on.
- **C**: the argument doesn't say this belief is an "obstacle to adequate conception of virtue."
- **D**: the ethicist doesn't say the observation is false — just insufficient.
- **E**: the quoted observation is not offered as evidence *for* the conclusion; it's acknowledged as a consideration that doesn't defeat it.`,
    },
  ],
  summary: {
    headline: 'Three difficult traits — mapped and defanged.',
    didWell: [
      'Identified the main conclusion even when "thus" pointed to an intermediate conclusion.',
      'Resisted treating a middle term in a causal chain as an intermediate conclusion.',
      'Used the explanation red flag to eliminate A on PT79 S1 Q22.',
      'Applied keyword extraction on abstract answer choices (E on PT59 S2 Q7).',
    ],
    watchFor: [
      '"Explanation" and "purports to explain" — always ask: does the author actually offer a cause?',
      '"Thus" at the end of a stimulus — verify it\'s not an IC by looking for a broader claim earlier.',
      'Any causal chain A→B→C — B is almost never an IC unless something else supports B.',
    ],
  },
};
