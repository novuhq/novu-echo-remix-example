import { Echo } from '@novu/echo';
import { renderEmail } from '~/emails/vercel-invite-user';

export const echo = new Echo({

  apiKey: process.env.NOVU_API_KEY,
  /**
   * Enable this flag only during local development
   * For production this should be false
   */
  devModeBypassAuthentication: true
});

const newSignup = echo.workflow('new-signup', async ({ step, payload }) => {
  // Send a welcome email
  await step.email('send-email', async (inputs) => {
    return {
      subject: `Welcome to sending emails with Novu & Remix`,
      body: renderEmail(inputs, payload),
    };
  }, {
    inputSchema: {
      type: "object",
      properties: {
        showJoinButton: { type: "boolean", default: true },
        buttonText: { type: "string", default: "Join the team" },
        userImage: {
          type: "string",
          default: "https://react-email-demo-bdj5iju9r-resend.vercel.app/static/vercel-user.png",
          format: "uri",
        },
        invitedByUsername: { type: "string", default: "Alan" },
        invitedByEmail: {
          type: "string",
          default: "alan.turing@example.com",
          format: "email",
        },
        teamName: { type: "string", default: "Team Awesome" },
        teamImage: {
          type: "string",
          default: "https://react-email-demo-bdj5iju9r-resend.vercel.app/static/vercel-team.png",
          format: "uri",
        },
        inviteLink: {
          type: "string",
          default: "https://vercel.com/teams/invite/foo",
          format: "uri",
        },
        inviteFromIp: { type: "string", default: "204.13.186.218" },
        inviteFromLocation: {
          type: "string",
          default: "São Paulo, Brazil",
        },
      },
    },
  });
  // JSON Schema for validation and type-safety. Zod, and others coming soon.
}, { payloadSchema: { properties: { text: { type: 'string' } } } });