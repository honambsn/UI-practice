//import { Email } from './../../../node_modules/postal-mime/postal-mime.d';
//import { EmailTemplate } from '../../../components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST() {
  try {
    // const { data, error } = await resend.emails.send({
    //   from: 'System <onboarding@resend.dev>',
    //   to: ['delivered@resend.dev'],
    //   subject: 'Hello world',
    //   html: '<p>Email Body</p>'
    // });

    if (!fromEmail) {
      throw new Error('FROM_EMAIL is not defined');
    }

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: ['delivered@resend.dev'],
      subject: 'Hello world',
      html: '<p>Email Body</p>'
    });
    

    if (error) {
      return NextResponse.json(
        { message: error.message || 'Email send failed' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error : unknown) {
    const message =
    error instanceof Error ? error.message : 'Internal server error';

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'GET OK' });
}

//https://youtu.be/Kb1f5bvF6f4?list=PLaYsth8JnnBRRuHargaQ3o7md60bOTNak&t=6199