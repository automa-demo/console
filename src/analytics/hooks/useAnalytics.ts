import { useCallback } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { EventProperties } from '@segment/analytics-next';

import { environment } from 'env';

import useAnalyticsContext from './useAnalyticsContext';

type User = NonNullable<ReturnType<typeof useUser>['user']>;

const useAnalytics = () => {
  const { orgId } = useAuth();

  const { analytics, anonymousId } = useAnalyticsContext();

  const identify = useCallback(
    (user: User | null | undefined, orgId: string | null | undefined) => {
      if (!user || !orgId) {
        return;
      }

      analytics.identify(user.id, {
        email: user.emailAddresses.find(
          (e) => e.emailAddress === user!.primaryEmailAddressId,
        )?.emailAddress,
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
