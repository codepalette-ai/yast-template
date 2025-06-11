import { getUsers, GetUsersParams } from "@/actions/user.actions";
import { UsersTable } from "@/components/users-table";
import { Users, UserCheck } from "lucide-react";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Header } from "@/components/header";

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
    offset: resolvedSearchParams.offset ? parseInt(resolvedSearchParams.offset, 10) : 0,
    limit: resolvedSearchParams.limit ? parseInt(resolvedSearchParams.limit, 10) : 10,
    orderBy: resolvedSearchParams.orderBy as GetUsersParams['orderBy'] || '-created_at',
  };

  const { data, error } = await getUsers(params);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-destructive">Error loading users</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        pages={["Dashboard", "Users"]}
        page="Users"
      ></Header>
    <div className="flex-1 space-y-8 p-8 pt-6">
      {/* Page Header */}
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Users</h1>
              <p className="text-muted-foreground">
                Manage and monitor user accounts across your platform
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <UserCheck className="h-3 w-3" />
            <span>{data.totalCount} Total Users</span>
          </Badge>
        </div>
      </div>

      {/* Users Table */}
      <UsersTable
        initialUsers={data.users}
        initialTotalCount={data.totalCount}
        initialParams={params}
      />
    </div>
    </div>
  );
}