//import { Email } from './../../../node_modules/postal-mime/postal-mime.d';
//import { EmailTemplate } from '../../../components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'System <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Hello world',
      html: '<p>Email Body</p>'
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

//https://youtu.be/Kb1f5bvF6f4?list=PLaYsth8JnnBRRuHargaQ3o7md60bOTNak&t=5002