/**
 * Display-time translation of an agent's `action` line.
 *
 * `action` is data: the store, hooks and tests compare these exact English
 * words, so they stay English where they are set. Only the fixed status words
 * the app writes itself are translated here, when they are shown; a live
 * action from the agent's terminal ("edit App.tsx", "bash npm test") passes
 * through unchanged.
 */
import i18n from './index';

const FIXED: Record<string, string> = {
  'awaiting': 'actionText.awaiting',
  'waiting on you': 'actionText.waitingOnYou',
  'waiting on god': 'actionText.waitingOnGod',
  'reconnecting…': 'actionText.reconnecting',
  'archived': 'actionText.archived',
  'running the floor': 'actionText.runningFloor',
  'compacting context': 'actionText.compacting',
  'resumed': 'actionText.resumed',
  'thinking': 'actionText.thinking',
  'idle': 'actionText.idle',
  'reading inbox': 'actionText.readingInbox',
  'starting up': 'actionText.startingUp',
  'revived after sleep': 'actionText.revived',
  'session not found — fresh start': 'misc.sessionNotFound'
};

export function localizeAction(action: string | undefined | null): string {
  const a = (action ?? '').trim();
  const key = FIXED[a];
  return key ? i18n.t(key) : a;
}
