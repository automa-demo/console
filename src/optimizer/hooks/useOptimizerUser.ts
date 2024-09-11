import { useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useStatsigUser } from '@statsig/react-bindings';

type User = NonNullable<ReturnType<typeof useUser>['user']>;

const useOptimizerUser = () => {
  const { user: optimizerUser, updateUserSync } = useStatsigUser();

  const updateOptimizerUser = useCallback(
    (user: User | null | undefined, orgId: string | null | undefined) => {
      updateUserSync({
        userID: user?.id,
        email: user?.primaryEmailAddress?.emailAddress
          ? user.primaryEmailAddress.emailAddress
          : undefined,
        customIDs: {
          stableID: optimizerUser.customIDs?.stableID,
          ...(user && {
            orgID: orgId ? orgId : undefined,
          }),
        },
      });
    },
    [updateUserSync, optimizerUser],
  );

  return { updateOptimizerUser };
};

export default useOptimizerUser;
