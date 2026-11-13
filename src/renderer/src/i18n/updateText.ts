/**
 * Localized prose for the update UI.
 *
 * `@shared/updateState` stays the single source of truth for state, action,
 * tone and busy. It renders English because the main process and the tests
 * use it too, so the renderer re-derives only the human-readable text here,
 * the same way UpdatesSection already does for the Settings block.
 */
import type { TFunction } from 'i18next';
import { clampPercent, pendingVersion, type UpdateStatus } from '@shared/updateState';

export function localizedInstallSteps(t: TFunction, platform: string): { os: string; steps: string[] } {
  if (platform === 'darwin') {
    return { os: 'macOS', steps: [t('updateText.stepsMac1'), t('updateText.stepsMac2')] };
  }
  if (platform === 'win32') {
    return { os: 'Windows', steps: [t('updateText.stepsWin1'), t('updateText.stepsWin2')] };
  }
  return { os: 'Linux', steps: [t('updateText.stepsLinux1'), t('updateText.stepsLinux2')] };
}

/** Label and tooltip for the title-bar badge, mirroring describeUpdate(). */
export function localizedBadge(
  t: TFunction,
  status: UpdateStatus | null,
  v: string
): { label: string | null; title: string } {
  if (status?.state === 'downloading') {
    const percent = clampPercent(status.percent);
    return {
      label: t('updateText.badgeDownloading', { percent }),
      title: t('updateText.badgeDownloadingTitle', { version: status.version, percent })
    };
  }
  const pending = pendingVersion(status, v);
  if (pending) {
    if (status?.state === 'downloaded') {
      return { label: t('updateText.badgeRestart', { version: pending }), title: t('updateText.badgeRestartTitle', { version: pending }) };
    }
    if (status?.state === 'available') {
      return { label: t('updateText.badgeUpdate', { version: pending }), title: t('updateText.badgeUpdateTitle', { version: pending }) };
    }
    const why = status?.state === 'available-manual' && status.reason
      ? t('updateText.badgeManualWhy', { reason: status.reason }) : '';
    return {
      label: t('updateText.badgeDownload', { version: pending }),
      title: t('updateText.badgeDownloadTitle', { version: pending }) + why
    };
  }
  switch (status?.state) {
    case 'checking':
      return { label: t('updateText.badgeChecking'), title: t('updateText.badgeCheckingTitle', { v }) };
    case 'error':
      return { label: t('updateText.badgeFailed'), title: t('updateText.badgeFailedTitle', { message: status.message }) };
    case 'not-available':
    case 'just-updated':
      return { label: t('updateText.badgeLatest'), title: t('updateText.badgeLatestTitle', { v }) };
    case 'idle':
    default:
      return { label: null, title: t('updateText.badgeIdleTitle', { v }) };
  }
}
