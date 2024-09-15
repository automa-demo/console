import { useCallback } from 'react';
import { useStatsigUser } from '@statsig/react-bindings';

const useOptimizerUser = () => {
  const { user: optimizerUser, updateUserAsync } = useStatsigUser();

  const updateOptimizerUser = useCallback(
    (
      userId: string | null | undefined,
      emailAddress: string | null | undefined,
      orgId: string | null | undefined,
    ) => {
      updateUserAsync({
        userID: userId ?? undefined,
        email: emailAddress ?? undefined,
        customIDs: {
          stableID: optimizerUser.customIDs?.stableID,
          ...(userId && {
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
