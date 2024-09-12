import { useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useStatsigUser } from '@statsig/react-bindings';

type User = NonNullable<ReturnType<typeof useUser>['user']>;

const useOptimizerUser = () => {
  const { user: optimizerUser, updateUserAsync } = useStatsigUser();

  const updateOptimizerUser = useCallback(
    (user: User | null | undefined, orgId: string | null | undefined) => {
      updateUserAsync({
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
    [updateUserAsync, optimizerUser],
  );

  return { updateOptimizerUser };
};

export default useOptimizerUser;
