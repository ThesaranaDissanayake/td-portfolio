import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Skill } from "@/features/skills.config";

interface SkillChipProps {
  itemList: Skill[];
}

/**
 * Minimal bordered chips with a brand-color dot — matches the home
 * page tech marquee styling.
 */
const SkillChip = ({ itemList }: SkillChipProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {itemList.map((skill) => (
        <Stack
          key={skill.id}
          direction="row"
          alignItems="center"
          spacing={0.75}
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: "50px",
            border: `1px solid ${theme.palette.divider}`,
            background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            transition: "border-color 0.2s",
            "&:hover": { borderColor: skill.color },
          }}
        >
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: skill.color,
              flexShrink: 0,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: "0.8rem",
              color: "text.secondary",
              whiteSpace: "nowrap",
            }}
          >
            {skill.label}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
};

export default SkillChip;
