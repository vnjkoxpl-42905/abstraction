import { useEffect, useState, useCallback } from 'react';
import type { Bootcamp, Module } from '@/content/types';

const KEY = 'abstraction.v1';

export type ModuleStatus = 'locked' | 'unlocked' | 'in_progress' | 'completed';

export interface CheckpointAttempt {
  response: string | string[];
  isCorrect: boolean;
  at: string;
}
export interface LsatAttempt {
  selected?: 'A' | 'B' | 'C' | 'D' | 'E';
  isCorrect?: boolean;
  stage: 1 | 2 | 3 | 4;
  at: string;
}

export interface ModuleProgress {
  status: ModuleStatus;
  sectionsCompleted: string[];
  resumeSectionSlug?: string;
  checkpointAttempts: Record<string, CheckpointAttempt>;
  lsatAttempts: Record<string, LsatAttempt>;
  lsatAttempted: boolean;
  score?: number;
  completedAt?: string;
}

export interface ProgressState {
  version: 1;
  modules: Record<string, ModuleProgress>;
  lastVisited?: { moduleSlug: string; sectionSlug?: string };
}

function emptyModule(): ModuleProgress {
  return {
    status: 'locked',
    sectionsCompleted: [],
    checkpointAttempts: {},
    lsatAttempts: {},
    lsatAttempted: false,
  };
}

function load(): ProgressState {
  if (typeof window === 'undefined') return { version: 1, modules: {} };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { version: 1, modules: {} };
    const parsed = JSON.parse(raw) as ProgressState;
    if (parsed.version !== 1) return { version: 1, modules: {} };
    return parsed;
  } catch {
    return { version: 1, modules: {} };
  }
}

function save(state: ProgressState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

// Ensure each module has an entry; M(0) unlocked; others locked until prior completes
export function hydrate(state: ProgressState, bootcamp: Bootcamp): ProgressState {
  const modules: Record<string, ModuleProgress> = { ...state.modules };
  const ordered = [...bootcamp.modules].sort((a, b) => a.order - b.order);
  ordered.forEach((m, i) => {
    if (!modules[m.slug]) modules[m.slug] = emptyModule();
    if (i === 0 && modules[m.slug].status === 'locked') {
      modules[m.slug].status = 'unlocked';
    }
    if (i > 0) {
      const prev = ordered[i - 1];
      const prevDone = modules[prev.slug]?.status === 'completed';
      if (prevDone && modules[m.slug].status === 'locked') {
        modules[m.slug].status = 'unlocked';
      }
    }
  });
  return { ...state, modules };
}

export function isModuleComplete(mp: ModuleProgress, module: Module) {
  const allSections = module.sections.every(s => mp.sectionsCompleted.includes(s.slug));
  return allSections && mp.lsatAttempted;
}

export function useProgress(bootcamp: Bootcamp) {
  const [state, setState] = useState<ProgressState>(() => hydrate(load(), bootcamp));

  useEffect(() => { save(state); }, [state]);

  const update = useCallback((fn: (s: ProgressState) => ProgressState) => {
    setState(prev => hydrate(fn(prev), bootcamp));
  }, [bootcamp]);

  const getModule = useCallback((slug: string) => state.modules[slug] ?? emptyModule(), [state]);

  const markSectionComplete = useCallback((moduleSlug: string, sectionSlug: string) => {
    update(s => {
      const mp = { ...(s.modules[moduleSlug] ?? emptyModule()) };
      if (!mp.sectionsCompleted.includes(sectionSlug)) {
        mp.sectionsCompleted = [...mp.sectionsCompleted, sectionSlug];
      }
      if (mp.status === 'unlocked') mp.status = 'in_progress';
      mp.resumeSectionSlug = sectionSlug;
      return {
        ...s,
        modules: { ...s.modules, [moduleSlug]: mp },
        lastVisited: { moduleSlug, sectionSlug },
      };
    });
  }, [update]);

  const recordCheckpoint = useCallback((moduleSlug: string, cpId: string, a: CheckpointAttempt) => {
    update(s => {
      const mp = { ...(s.modules[moduleSlug] ?? emptyModule()) };
      mp.checkpointAttempts = { ...mp.checkpointAttempts, [cpId]: a };
      if (mp.status === 'unlocked') mp.status = 'in_progress';
      return { ...s, modules: { ...s.modules, [moduleSlug]: mp } };
    });
  }, [update]);

  const recordLsat = useCallback((moduleSlug: string, qid: string, a: LsatAttempt) => {
    update(s => {
      const mp = { ...(s.modules[moduleSlug] ?? emptyModule()) };
      mp.lsatAttempts = { ...mp.lsatAttempts, [qid]: a };
      return { ...s, modules: { ...s.modules, [moduleSlug]: mp } };
    });
  }, [update]);

  const completeLsatSet = useCallback((moduleSlug: string, module: Module) => {
    update(s => {
      const mp = { ...(s.modules[moduleSlug] ?? emptyModule()) };
      mp.lsatAttempted = true;
      const totalQ = module.lsatSet.length;
      const correctCount = module.lsatSet.filter(q => mp.lsatAttempts[q.id]?.isCorrect).length;
      mp.score = totalQ ? Math.round((correctCount / totalQ) * 100) : 100;
      if (isModuleComplete(mp, module)) {
        mp.status = 'completed';
        mp.completedAt = new Date().toISOString();
      }
      return { ...s, modules: { ...s.modules, [moduleSlug]: mp } };
    });
  }, [update]);

  const setLastVisited = useCallback((moduleSlug: string, sectionSlug?: string) => {
    update(s => ({ ...s, lastVisited: { moduleSlug, sectionSlug } }));
  }, [update]);

  const resetAll = useCallback(() => {
    localStorage.removeItem(KEY);
    setState(hydrate({ version: 1, modules: {} }, bootcamp));
  }, [bootcamp]);

  return {
    state,
    getModule,
    markSectionComplete,
    recordCheckpoint,
    recordLsat,
    completeLsatSet,
    setLastVisited,
    resetAll,
  };
}
