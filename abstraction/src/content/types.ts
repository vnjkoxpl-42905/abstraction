export type CheckpointKind = 'mcq' | 'multi' | 'short';

export interface Choice {
  id: string;
  text: string;
  redFlag?: boolean; // triggers visible red-flag callout
}

export interface Checkpoint {
  id: string;
  prompt: string;
  kind: CheckpointKind;
  choices?: Choice[];
  correct: string | string[]; // id(s) or canonical short answer
  explanation: string;
  hint?: string;
}

export interface Callout {
  kind: 'takeaway' | 'warning' | 'note';
  title?: string;
  body: string;
}

export interface Application {
  prompt: string;
  placeholder?: string;
  modelAnswer: string;
}

export interface Section {
  slug: string;
  title: string;
  kicker?: string;
  body: string; // light markdown: **bold**, *em*, blank-line paragraphs, lines starting "- " = bullets
  callout?: Callout;
  checkpoint?: Checkpoint;
  application?: Application;
}

export interface LsatChoice { letter: 'A' | 'B' | 'C' | 'D' | 'E'; text: string; }
export interface LsatQuestion {
  id: string;
  source: string; // e.g. "PT34 S3 Q14"
  trait?: string;
  stimulus: string;
  stem: string;
  choices: LsatChoice[];
  correct: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  structureMap: string; // what the argument actually does
}

export interface Orientation {
  whatItIs: string;
  whyItMatters: string;
  youWillBeAbleTo: string[];
}

export interface CompletionSummary {
  headline: string;
  didWell: string[];
  watchFor: string[];
  nextUp?: string;
}

export interface Module {
  slug: string;
  title: string;
  subtitle: string;
  order: number;
  orientation: Orientation;
  sections: Section[];
  lsatSet: LsatQuestion[];
  summary: CompletionSummary;
}

export interface Bootcamp {
  slug: string;
  title: string;
  tagline: string;
  modules: Module[];
}
