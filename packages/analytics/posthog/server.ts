import 'server-only';
import { PostHog } from 'posthog-node';
import { keys } from '../keys';

const posthogKey = keys().NEXT_PUBLIC_POSTHOG_KEY;

export const analytics = posthogKey
  ? new PostHog(posthogKey, {
      host: keys().NEXT_PUBLIC_POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
    })
  : null;
