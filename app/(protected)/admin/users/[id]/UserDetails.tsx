"use client";

import { Badge, Box, Container, Heading, Text } from "theme-ui";
import type { UserRow } from "../actions";

const headingCell = {
  fontFamily: "heading",
  letterSpacing: "headline",
};

export default function UserDetails({ userData }: { userData: UserRow }) {
  return (
    <Box sx={{ color: "text", minHeight: "100vh", py: 4 }}>
      <Container>
        <Box sx={{ mb: 4 }}>
          <Heading variant="title" color="red" sx={{ mb: 0 }}>
            {userData.slackName || userData.email}
          </Heading>

          <Heading
            variant="subtitle"
            color="secondary"
            sx={{ ml: 1, mt: 0 }}
            
          >
            {userData.slackId ?? "User details"}
          </Heading>
        </Box>

        <Box
          sx={{
            border: "1px solid",
            borderColor: "border",
            borderRadius: "default",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              bg: "dark",
              px: 3,
              py: 2,
              borderBottom: "2px solid",
              borderColor: "border",
            }}
          >
            <Text
              sx={{
                ...headingCell,
                fontSize: 0,
                color: "muted",
              }}
            >
              User details
            </Text>
          </Box>

          <Box
            sx={{
              bg: "dark",
              p: 4,
              display: "flex",
              gap: 4,
              alignItems: "flex-start",
            }}
          >
            {userData.slackImage && (
              <img
                src={userData.slackImage}
                alt={userData.slackName ?? userData.email}
                style={{
                  height: 64,
                  width: 64,
                  borderRadius: "9999px",
                  flexShrink: 0,
                }}
              />
            )}

            <Box
              sx={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: [
                  "1fr",
                  "repeat(1, minmax(0, 1fr))",
                ],
                gap: 4,
              }}
            >
              <Field label="ID" value={userData.id} />
              <Field label="Email" value={userData.email} />
              <Field
                label="Slack ID"
                value={userData.slackId ?? "—"}
                accent
              />
              <Field
                label="Slack name"
                value={userData.slackName ?? "—"}
              />

              <Box>
                <Text
                  sx={{
                    ...headingCell,
                    display: "block",
                    fontSize: 0,
                    color: "muted",
                    mb: 2,
                  }}
                >
                  Roles
                </Text>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  {userData.role.map((role, i) => (
                    <Badge
                      key={`${role}-${i}`}
                      bg={
                        role === "admin"
                          ? "blue"
                          : role === "superAdmin"
                            ? "red"
                            : "orange"
                      }
                    >
                      {role}
                    </Badge>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function Field({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <Box>
      <Text
        sx={{
          ...headingCell,
          display: "block",
          fontSize: 0,
          color: "white",
          mb: 1,
        }}
      >
        {label}
      </Text>

      <Text
        sx={{
          fontSize: 1,
          color: accent ? "accent" : "text",
          wordBreak: "break-word",
        }}
      >
        {value}
      </Text>
    </Box>
  );
}