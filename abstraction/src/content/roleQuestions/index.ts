import type { Bootcamp } from '../types';
import { m1 } from './m1';
import { m2 } from './m2';
import { m3 } from './m3';
import { m4 } from './m4';
import { m5 } from './m5';

export const bootcamp: Bootcamp = {
  slug: 'role-questions',
  title: 'Role Questions',
  tagline: 'Master the most structurally demanding question type on the LSAT.',
  modules: [m1, m2, m3, m4, m5],
};
