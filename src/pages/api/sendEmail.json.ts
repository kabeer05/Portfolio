import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const to = import.meta.env.RESEND_EMAIL;
const from = import.meta.env.RESEND_EMAIL;

export const prerender = false;

export const POST: APIRoute = async ({ params, request }) => {
  const body = await request.json();
  const { name, message, email } = body;

  if (!name || !message || !email) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const html = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;

  const response = await resend.emails.send({
    to,
    from,
    subject: `New message from ${name}`,
    html,
  });

  if (response.data) {
    return new Response(JSON.stringify(response.data), {
      status: 200,
      statusText: "OK",
    });
  } else {
    return new Response(JSON.stringify(response.error), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
