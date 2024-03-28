import React, { useMemo, useState } from 'react';
import { AnalyticsBrowser, ID } from '@segment/analytics-next';

import { isProduction } from 'env';

import { useAsyncEffect } from 'shared';
import AnalyticsContext from 'analytics/context';

import { AnalyticsProviderProps } from './types';

const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [anonymousId, setAnonymousId] = useState<ID | null>(null);

  const isAnalyticsEnabled = true;

  const analytics = useMemo(() => {
    const analytics = new AnalyticsBrowser();
    const apiHost = import.meta.env.VITE_SEGMENT_HOST;

    if (isAnalyticsEnabled) {
      analytics.load(
        {
          writeKey: import.meta.env.VITE_SEGMENT_KEY,
        },
        apiHost
          ? {
              integrations: {
                'Segment.io': {
                  apiHost: `${apiHost}/v1`,
                },
              },
            }
          : undefined,
      );
    }

    return analytics;
  }, [isAnalyticsEnabled]);

  useAsyncEffect(async () => {
    if (isAnalyticsEnabled) {
      const anonymousId = (await analytics.user()).anonymousId();
      setAnonymousId(anonymousId);
    }

    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return null;
  }

  return (
    <AnalyticsContext.Provider
      value={{
        analytics,
        anonymousId,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsProvider;
