'use client';

import { getUsers } from '@/actions/user.actions';
import type { GetUsersParams, User as UserType } from '@/types';
import {
  Avatar,
  AvatarFallback,
} from '@repo/design-system/components/ui/avatar';
import { Badge } from '@repo/design-system/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { Input } from '@repo/design-system/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@repo/design-system/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/design-system/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/design-system/components/ui/table';
import { Filter, Mail, Phone, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';

interface UsersTableProps {
  initialUsers: UserType[];
  initialTotalCount: number;
  initialParams: GetUsersParams;
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function UsersTable({
  initialUsers,
  initialTotalCount,
  initialParams,
}: UsersTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isInitialMount = useRef(true);

  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [searchQuery, setSearchQuery] = useState(initialParams.query || '');
  const [orderBy, setOrderBy] = useState(
    initialParams.orderBy || '-created_at'
  );
  const [limit, setLimit] = useState(initialParams.limit || 10);
  const [offset, setOffset] = useState(initialParams.offset || 0);

  // Debounce search query with 500ms delay
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(totalCount / limit);

  const updateUsers = useCallback((params: GetUsersParams) => {
    startTransition(async () => {
      const result = await getUsers(params);
      if (result.success) {
        setUsers(result.data.users);
        setTotalCount(result.data.totalCount);
      }
    });
  }, []);

  const updateURL = useCallback(
    (params: GetUsersParams) => {
      const url = new URL(window.location.href);
      if (params.query) {
        url.searchParams.set('query', params.query);
      } else {
        url.searchParams.delete('query');
      }
      if (params.offset) {
        url.searchParams.set('offset', params.offset.toString());
      } else {
        url.searchParams.delete('offset');
      }
      if (params.limit && params.limit !== 10) {
        url.searchParams.set('limit', params.limit.toString());
      } else {
        url.searchParams.delete('limit');
      }
      if (params.orderBy && params.orderBy !== '-created_at') {
        url.searchParams.set('orderBy', params.orderBy);
      } else {
        url.searchParams.delete('orderBy');
      }

      router.replace(url.pathname + url.search, { scroll: false });
    },
    [router]
  );

  // Effect to handle debounced search
  useEffect(() => {
    // Skip the initial mount to prevent unnecessary API call
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Only search if query is empty or has 3+ characters
    if (debouncedSearchQuery === '' || debouncedSearchQuery.length >= 3) {
      setOffset(0); // Reset to first page
      const params = {
        query: debouncedSearchQuery || undefined,
        offset: 0,
        limit,
        orderBy,
      };
      updateUsers(params);
      updateURL(params);
    }
  }, [debouncedSearchQuery, updateURL, updateUsers, limit, orderBy]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleOrderChange = (value: string) => {
    const newOrderBy = value as GetUsersParams['orderBy'];
    setOrderBy(newOrderBy || '-created_at');
    setOffset(0); // Reset to first page
    const params = {
      query: debouncedSearchQuery || undefined,
      offset: 0,
      limit,
      orderBy: newOrderBy,
    };
    updateUsers(params);
    updateURL(params);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setOffset(0); // Reset to first page
    const params = {
      query: debouncedSearchQuery || undefined,
      offset: 0,
      limit: newLimit,
      orderBy,
    };
    updateUsers(params);
    updateURL(params);
  };

  const handlePageChange = (newPage: number) => {
    const newOffset = (newPage - 1) * limit;
    setOffset(newOffset);
    const params = {
      query: debouncedSearchQuery || undefined,
      offset: newOffset,
      limit,
      orderBy,
    };
    updateUsers(params);
    updateURL(params);
  };

  const formatDate = (timestamp: number | string) => {
    const date =
      typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getUserInitials = (user: UserType) => {
    // For UserType, we don't have firstName/lastName, so we'll use email or username
    if (user.emailAddress) {
      return user.emailAddress[0]?.toUpperCase() || 'U';
    }
    if (user.username) {
      return user.username[0]?.toUpperCase() || 'U';
    }
    return 'U';
  };

  const getUserDisplayName = (user: UserType) => {
    if (user.username) {
      return user.username;
    }
    if (user.emailAddress) {
      return user.emailAddress.split('@')[0];
    }
    return 'Unnamed User';
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-muted-foreground" />
                <Input
                  placeholder="Search users (min 3 characters)..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                />
                {searchQuery.length > 0 && searchQuery.length < 3 && (
                  <p className="mt-1 text-muted-foreground text-xs">
                    Enter at least 3 characters to search
                  </p>
                )}
              </div>
            </div>

            {/* Sort Order */}
            <Select value={orderBy} onValueChange={handleOrderChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-created_at">Newest First</SelectItem>
                <SelectItem value="created_at">Oldest First</SelectItem>
                <SelectItem value="first_name">First Name A-Z</SelectItem>
                <SelectItem value="-first_name">First Name Z-A</SelectItem>
                <SelectItem value="last_name">Last Name A-Z</SelectItem>
                <SelectItem value="-last_name">Last Name Z-A</SelectItem>
                <SelectItem value="email_address">Email A-Z</SelectItem>
                <SelectItem value="-email_address">Email Z-A</SelectItem>
                <SelectItem value="-last_active_at">Last Active</SelectItem>
                <SelectItem value="-last_sign_in_at">Last Sign In</SelectItem>
              </SelectContent>
            </Select>

            {/* Items per page */}
            <Select
              value={limit.toString()}
              onValueChange={(value: string) =>
                handleLimitChange(Number(value))
              }
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 per page</SelectItem>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="25">25 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
                <SelectItem value="100">100 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            {isPending && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50">
                <div className="h-8 w-8 animate-spin rounded-full border-primary border-b-2" />
              </div>
            )}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="py-8 text-center text-muted-foreground"
                    >
                      {searchQuery.length > 0 && searchQuery.length < 3
                        ? 'Enter at least 3 characters to search'
                        : 'No users found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>
                              {getUserInitials(user)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {getUserDisplayName(user)}
                            </div>
                            {user.username && (
                              <div className="text-muted-foreground text-sm">
                                @{user.username}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {user.emailAddress && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span>{user.emailAddress}</span>
                            </div>
                          )}
                          {user.phoneNumber && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <span>{user.phoneNumber}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                      <TableCell>
                        {user.lastActiveAt ? (
                          <div className="text-sm">
                            {formatDate(user.lastActiveAt)}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Never
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            Showing {offset + 1} to {Math.min(offset + limit, totalCount)} of{' '}
            {totalCount} users
          </div>
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                  />
                </PaginationItem>
              )}

              {/* Page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      isActive={pageNum === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pageNum);
                      }}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
