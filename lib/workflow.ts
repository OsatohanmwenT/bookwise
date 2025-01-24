import { Client as QStashClient, resend } from "@upstash/qstash";
import { Client as WorkflowClient } from "@upstash/workflow";
import config from "@/lib/config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl!,
  token: config.env.upstash.qstashToken!,
});

const client = new QStashClient({ token: config.env.upstash.qstashToken });

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await client.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resend.resendToken }),
    },
    body: {
      from: "Osarenkhoe Osato <osarenkhoeosato@resend.dev>",
      to: [email],
      subject: subject,
      html: message,
    },
  });
};
