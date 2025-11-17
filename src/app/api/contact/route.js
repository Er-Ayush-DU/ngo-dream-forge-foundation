// app/api/contact/route.js
import { NextResponse } from 'next/server';
import Contact from '@/models/Contact';
import { dbConnect } from '@/lib/mongoose';

export async function POST(request) {
  try {
    await dbConnect();

    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const newContact = await Contact.create({
      name,
      email,
      message
    });

    return NextResponse.json(
      { message: 'Thank you! We will contact you soon.', data: newContact },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Try again!' },
      { status: 500 }
    );
  }
}