"use client";

import { useEffect, useState, useTransition } from "react";
import { Badge, Box, Button, Container, Heading, Input } from "theme-ui";
import { getUsers, UserRow } from "./actions";

const headingCell = {
  fontFamily: "heading",
  letterSpacing: "headline",
};

const columns = ["ID", "Slack ID", "Email", "Profile", "Roles", "View"];

const Page = () => {
  const [query, setQuery] = useState("");
  const [allCount, setAllCount] = useState<number | null>(null);
  const [rows, setRows] = useState<UserRow[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getUsers().then((all) => setAllCount(all.length));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      startTransition(() => {
        getUsers(query).then(setRows);
      });
    }, 250);
    return () => clearTimeout(timeout);
  }, [query]);

  const filteredUsers = rows;

  return (
    <Box sx={{ color: "text", minHeight: "100vh", py: 4 }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 4,
            mb: 4,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Heading variant="title" color="red" sx={{ mb: 0 }}>
              Users
            </Heading>
            <Heading variant="subtitle" color="sheet" sx={{ ml: 1, mt: 0 }}>
              {allCount === null
                ? "Loading…"
                : `${filteredUsers.length} ${filteredUsers.length === 1 ? "person" : "people"}${
                    query ? " matched" : " logged"
                  }${query && allCount !== filteredUsers.length ? ` of ${allCount}` : ""}`}
            </Heading>
          </Box>
          <Input
            type="search"
            placeholder="Search users…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ maxWidth: "280px", fontSize: 1 }}
          />
        </Box>

        {allCount === 0 ? (
          <EmptyState>No users here yet</EmptyState>
        ) : allCount !== null && filteredUsers.length === 0 && !isPending ? (
          <EmptyState>No users match &ldquo;{query}&rdquo;</EmptyState>
        ) : (
          <Box
            sx={{
              border: "1px solid",
              borderColor: "border",
              borderRadius: "default",
              overflow: "hidden",
              overflowX: "auto",
              opacity: isPending ? 0.6 : 1,
              transition: "opacity .1s ease-in-out",
            }}
          >
            <Box as="table" sx={{ width: "100%", minWidth: "900px", borderCollapse: "separate", borderSpacing: 0 }}>
              <Box as="thead" sx={{ bg: "sheet" }}>
                <Box as="tr">
                  {columns.map((label) => (
                    <Box
                      as="th"
                      key={label}
                      sx={{
                        ...headingCell,
                        textAlign: "left",
                        py: 2,
                        px: 3,
                        fontSize: 0,
                        color: "muted",
                        verticalAlign: "bottom",
                        borderBottom: "2px solid",
                        borderColor: "border",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {label}
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box as="tbody" bg="dark">
                {filteredUsers.map((row, i) => {
                  const isLast = i === filteredUsers.length - 1;
                  return (
                    <Box
                      as="tr"
                      key={row.id}
                      sx={{ "&:hover": { bg: "sheet" }, transition: "background .125s ease-in-out" }}
                    >
                      <Box as="td" sx={{ ...headingCell, py: 3, px: 3, fontSize: 0, color: "muted", verticalAlign: "middle", borderBottom: isLast ? "none" : "1px solid", borderColor: "border", whiteSpace: "nowrap" }}>
                        {row.id}
                      </Box>
                      <Box as="td" sx={{ ...headingCell, py: 3, px: 3, fontSize: 0, color: "accent", verticalAlign: "middle", borderBottom: isLast ? "none" : "1px solid", borderColor: "border", whiteSpace: "nowrap" }}>
                        {row.slackId ?? "—"}
                      </Box>
                      <Box as="td" sx={{ ...headingCell, py: 3, px: 3, fontSize: 1, color: "text", verticalAlign: "middle", borderBottom: isLast ? "none" : "1px solid", borderColor: "border", whiteSpace: "nowrap" }}>
                        {row.email}
                      </Box>
                      <Box as="td" sx={{ py: 3, px: 3, fontSize: 1, color: "text", verticalAlign: "middle", borderBottom: isLast ? "none" : "1px solid", borderColor: "border" }}>
                        {row.slackName ? (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            {row.slackImage && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={row.slackImage}
                                alt={row.slackName}
                                style={{ height: 24, width: 24, borderRadius: "9999px" }}
                              />
                            )}
                            <span>{row.slackName}</span>
                          </Box>
                        ) : (
                          <Box as="span" sx={{ color: "muted" }}>—</Box>
                        )}
                      </Box>
                      <Box as="td" sx={{ ...headingCell, py: 3, px: 3, fontSize: 0, color: "secondary", verticalAlign: "middle", borderBottom: isLast ? "none" : "1px solid", borderColor: "border", whiteSpace: "nowrap" }}>
                        {row.role.map((role, ri) => (
                          <Badge
                            mx={1}
                            key={ri}
                            bg={role === "admin" ? "blue" : role === "superAdmin" ? "red" : "orange"}
                          >
                            {role}
                          </Badge>
                        ))}
                      </Box>
                      <Box as="td" sx={{ py: 3, px: 3, borderBottom: isLast ? "none" : "1px solid", borderColor: "border", verticalAlign: "middle" }}>
                        <Button
                          as="a"
                          onClick={()=>{`/admin/users/${row.id}`}}
                          sx={{ fontSize: 0, px: 3, py: 1, borderRadius: "full", fontWeight: "bold" }}
                        >
                          View
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "default",
        border: "2px dashed",
        borderColor: "border",
        bg: "sheet",
        px: 6,
        py: 8,
        textAlign: "center",
        color: "muted",
        fontSize: 2,
      }}
    >
      {children}
    </Box>
  );
}

export default Page;