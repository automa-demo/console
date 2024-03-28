import { useCallback, useContext } from 'react';
import { EventProperties } from '@segment/analytics-next';
import { useUser, useAuth } from '@clerk/clerk-react';

import { environment } from 'env';

import AnalyticsContext from 'analytics/context';

type User = NonNullable<ReturnType<typeof useUser>['user']>;

const useAnalytics = () => {
  const { orgId } = useAuth();

  const { analytics, anonymousId } = useContext(AnalyticsContext);

  if (!analytics) {
    throw new Error(
      '`useAnalytics` must be used within an `AnalyticsProvider`',
    );
  }

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

  return { anonymousId, identify, track };
};

export default useAnalytics;
