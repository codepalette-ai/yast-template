import { Badge } from '@repo/design-system/components/ui/badge';
import { UserCheck, Users } from 'lucide-react';
import { type GetUsersParams, getUsers } from '@/actions/user.actions';
import { Header } from '@/components/dashboard-header';
import { UsersTable } from '@/components/users-table';

interface UsersPageProps {
  searchParams: Promise<{
    query?: string;
    offset?: string;
    limit?: string;
    orderBy?: string;
  }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const resolvedSearchParams = await searchParams;

  // Parse search params
  const params: GetUsersParams = {
    query: resolvedSearchParams.query,
    offset: resolvedSearchParams.offset
      ? Number.parseInt(resolvedSearchParams.offset, 10)
      : 0,
    limit: resolvedSearchParams.limit
      ? Number.parseInt(resolvedSearchParams.limit, 10)
      : 10,
    orderBy:
      (resolvedSearchParams.orderBy as GetUsersParams['orderBy']) ||
      '-created_at',
  };

  const { data, error } = await getUsers(params);

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="font-semibold text-destructive text-lg">
            Error loading users
          </h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header page="Users" pages={['Dashboard', 'Users']} />
      <div className="flex-1 space-y-8 p-8 pt-6">
        {/* Page Header */}
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <h1 className="font-bold text-3xl tracking-tight">Users</h1>
                <p className="text-muted-foreground">
                  Manage and monitor user accounts across your platform
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="flex items-center space-x-1" variant="outline">
              <UserCheck className="h-3 w-3" />
              <span>{data.totalCount} Total Users</span>
            </Badge>
          </div>
        </div>

        {/* Users Table */}
        <UsersTable
          initialParams={params}
          initialTotalCount={data.totalCount}
          initialUsers={data.users}
        />
      </div>
    </div>
  );
}
