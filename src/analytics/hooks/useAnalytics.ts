import { useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { EventProperties } from '@segment/analytics-next';

import { environment } from 'env';

import useAnalyticsContext from './useAnalyticsContext';

const useAnalytics = () => {
  const { orgId } = useAuth();

  const { analytics, anonymousId } = useAnalyticsContext();

  const identify = useCallback(
    (
      userId: string | null | undefined,
      emailAddress: string | null | undefined,
      orgId: string | null | undefined,
    ) => {
      if (!userId || !emailAddress || !orgId) {
        return;
      }

      analytics.identify(userId, {
        email: emailAddress,
      });

      analytics.group(
        orgId,
        {},
        {
          integrations: {
            Statsig: false,
          },
        },
      );
    },
    [analytics],
  );

  const track = useCallback(
    (eventName: string, properties: EventProperties = {}) => {
      analytics.track(eventName, {
        ...properties,
        statsigEnvironment: {
          tier: environment,
        },
        statsigCustomIDs: [...(orgId ? ['orgID', orgId] : [])],
      });
    },
    [analytics, orgId],
  );

  const page = useCallback(
    (category?: string, name?: string, properties: EventProperties = {}) => {
      analytics.page(category, name, {
        ...properties,
        statsigEnvironment: {
          tier: environment,
        },
        statsigCustomIDs: [...(orgId ? ['orgID', orgId] : [])],
      });
    },
    [analytics, orgId],
  );

  return { anonymousId, identify, track, page };
};

export default useAnalytics;
