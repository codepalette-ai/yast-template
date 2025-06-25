'use server';
import type { User } from '@repo/auth/server';
import { createClerkClient } from '@repo/auth/server';
import { env } from '@/env';
import type { GetUsersParams, User as UserType } from '@/types';
import { errorResponse, type Result, successResponse, tryCatch } from '@/utils';

// Re-export GetUsersParams for use in other files
export type { GetUsersParams } from '@/types';

export async function getUsers(
  params: GetUsersParams = {}
): Promise<Result<{ users: UserType[]; totalCount: number }>> {
  const clerk = createClerkClient({
    secretKey: env.CLERK_USER_SECRET_KEY,
  });

  // Set default values
  const {
    limit = 10,
    offset = 0,
    orderBy = '-created_at',
    query,
    emailAddress,
    phoneNumber,
    username,
    userId,
    organizationId,
  } = params;

  const { data, error } = await tryCatch(
    clerk.users.getUserList({
      limit,
      offset,
      orderBy,
      query,
      emailAddress,
      phoneNumber,
      username,
      userId,
      organizationId,
    })
  );

  if (error) {
    return errorResponse(error.message);
  }

  const { data: users, totalCount } = data as {
    data: User[];
    totalCount: number;
  };

  return successResponse({
    users: users.map((user) => ({
      id: user.id,
      emailAddress: user.emailAddresses[0]?.emailAddress || '',
      phoneNumber: user.phoneNumbers[0]?.phoneNumber || '',
      username: user.username || '',
      lastActiveAt: user.lastActiveAt
        ? new Date(user.lastActiveAt).toISOString()
        : '',
    })),
    totalCount,
  });
}
