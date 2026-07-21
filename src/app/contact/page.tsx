"use client";
import React, { useState } from "react";
import {
  Box,
  Stack,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Card,
  CardContent,
  Alert,
  Snackbar,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTheme } from "@mui/material/styles";
import {
  CONTACT_FORM_LIMITS,
  contactFormSchema,
  ContactFormData,
} from "@/lib/schemas";
import axios from "axios";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { profile } from "@/features/profile.config";

const contactDetails = [
  {
    icon: <EmailIcon sx={{ color: "secondary.main", fontSize: 24 }} />,
    title: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: <PhoneIcon sx={{ color: "secondary.main", fontSize: 24 }} />,
    title: "Phone",
    value: profile.phone,
    href: profile.phoneHref,
  },
  {
    icon: <LocationOnIcon sx={{ color: "secondary.main", fontSize: 24 }} />,
    title: "Location",
    value: profile.location,
  },
];

const socialLinks = [
  {
    title: "GitHub",
    href: profile.githubUrl,
    icon: <GitHubIcon fontSize="medium" />,
  },
  {
    title: "LinkedIn",
    href: profile.linkedInUrl,
    icon: <LinkedInIcon fontSize="medium" />,
  },
];

const inputSx = {
  "& .MuiInputBase-root": {
    borderRadius: "2px",
  },
};

const createEmptyContactFormData = (): ContactFormData => ({
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
});

const Contact = () => {
  const theme = useTheme();

  const cardSx = {
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "3px",
    boxShadow: "none",
    transition: "border-color 0.3s ease, transform 0.3s ease",
  };

  const [formData, setFormData] = useState<ContactFormData>(
    createEmptyContactFormData,
  );
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    severity: "success" | "error";
    message: string;
    open: boolean;
  }>({
    severity: "success",
    message: "",
    open: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const result = contactFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<ContactFormData> = {};
      const flattenedErrors = result.error.flatten().fieldErrors;

      (Object.keys(flattenedErrors) as Array<keyof ContactFormData>).forEach(
        (key) => {
          const messages = flattenedErrors[key];
          if (messages && messages.length > 0) {
            fieldErrors[key] = messages[0];
          }
        },
      );

      setErrors(fieldErrors);
      if (flattenedErrors.website?.length) {
        setSubmitStatus({
          open: true,
          severity: "error",
          message: "Unable to send this message. Please try again.",
        });
      }
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post("/api/send", result.data, {
        headers: { "Content-Type": "application/json" },
      });
      setSubmitStatus({
        open: true,
        severity: "success",
        message: "Message sent! I'll get back to you soon.",
      });
      setFormData(createEmptyContactFormData());
    } catch (error) {
      setSubmitStatus({
        open: true,
        severity: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitStatus((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", pb: { xs: 6, md: 10 } }}>
      <PageHero
        eyebrow="Contact"
        title="Let's work together"
        subtitle="Ready to improve a workflow, automate a process, build a dashboard, or shape a business system? Send the details and I will get back to you."
      />

      <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
        {/* Contact information */}
        <Box sx={{ width: { xs: "100%", lg: "40%" } }}>
          <Reveal>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 3, letterSpacing: "-0.01em" }}
            >
              Let&apos;s Connect
            </Typography>
          </Reveal>

          <Stack spacing={2.5}>
            {contactDetails.map((detail, index) => {
              const card = (
                <Card
                  sx={{
                    ...cardSx,
                    "&:hover": {
                      transform: "translateY(-3px)",
                      borderColor: theme.palette.text.primary,
                    },
                  }}
                >
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      {detail.icon}
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {detail.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {detail.value}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              );
              return (
                <Reveal key={detail.title} delay={index * 0.1}>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      {card}
                    </a>
                  ) : (
                    card
                  )}
                </Reveal>
              );
            })}

            <Reveal delay={0.3}>
              <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                {socialLinks.map((social) => (
                  <Tooltip key={social.title} title={social.title}>
                    <IconButton
                      component="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.title}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "2px",
                        color: "text.secondary",
                        border: `1px solid ${theme.palette.divider}`,
                        background: theme.palette.background.paper,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          color: "text.primary",
                          transform: "translateY(-3px)",
                          borderColor: theme.palette.text.primary,
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
            </Reveal>
          </Stack>
        </Box>

        {/* Contact form */}
        <Box sx={{ width: { xs: "100%", lg: "60%" } }}>
          <Reveal delay={0.15}>
            <Card sx={{ ...cardSx, p: { xs: 3, md: 4 } }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 3, letterSpacing: "-0.01em" }}
              >
                Send a Message
              </Typography>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="website"
                  value={formData.website || ""}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-10000px",
                    width: 1,
                    height: 1,
                    opacity: 0,
                  }}
                />
                <Stack spacing={3}>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      size="medium"
                      fullWidth
                      required
                      disabled={isSubmitting}
                      inputProps={{ maxLength: CONTACT_FORM_LIMITS.nameMax }}
                      sx={inputSx}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      size="medium"
                      fullWidth
                      required
                      disabled={isSubmitting}
                      inputProps={{ maxLength: CONTACT_FORM_LIMITS.emailMax }}
                      sx={inputSx}
                    />
                  </Stack>
                  <TextField
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={!!errors.subject}
                    helperText={errors.subject}
                    size="medium"
                    fullWidth
                    required
                    disabled={isSubmitting}
                    inputProps={{ maxLength: CONTACT_FORM_LIMITS.subjectMax }}
                    sx={inputSx}
                  />
                  <TextField
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    size="medium"
                    fullWidth
                    multiline
                    rows={5}
                    required
                    disabled={isSubmitting}
                    inputProps={{ maxLength: CONTACT_FORM_LIMITS.messageMax }}
                    sx={inputSx}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      endIcon={!isSubmitting && <SendIcon />}
                      disabled={isSubmitting}
                      sx={{
                        px: 4,
                        py: 1.4,
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: "0.95rem",
                        transition: "opacity 0.2s ease",
                        "&:hover": { opacity: 0.9 },
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </Box>
                </Stack>
              </form>
            </Card>
          </Reveal>
        </Box>
      </Stack>

      <Snackbar
        open={submitStatus.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={submitStatus.severity}
          sx={{ width: "100%" }}
        >
          {submitStatus.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
