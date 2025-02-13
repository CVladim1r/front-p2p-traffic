import { useCallback, useEffect, useRef } from 'react';
import { AdController, ShowPromiseResult } from '../../types/adsgram';
/**
 * Check Typescript section
 * and use your path to adsgram types
 */
// import type { AdController, ShowPromiseResult } from 'ads';

export interface useAdsgramParams {
  blockId: string;
  debug?: boolean
  onReward?: () => void;
  onError?: (result: ShowPromiseResult) => void;
}

export function useAdsgram({ blockId, debug, onReward, onError }: useAdsgramParams): () => Promise<void> {
  const AdControllerRef = useRef<AdController | undefined>(undefined);

  useEffect(() => {
    AdControllerRef.current = window.Adsgram?.init({ blockId, debug: debug ?? true, debugBannerType: 'FullscreenMedia' });
  }, [blockId]);

  return useCallback(async () => {
    if (AdControllerRef.current) {
      AdControllerRef.current
        .show()
        .then(() => {
          // user watch ad till the end or close it in interstitial format
          onReward?.();
        })
        .catch((result: ShowPromiseResult) => {
          // user get error during playing ad
          onError?.(result);
          if (import.meta.env.DEV)
            onReward?.()
        });
    } else {
      onError?.({
        error: true,
        done: false,
        state: 'load',
        description: 'Adsgram script not loaded',
      });
    }
  }, [onError, onReward]);
}