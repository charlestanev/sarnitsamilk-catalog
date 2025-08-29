import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';

export async function GET() {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        return NextResponse.json(
            { message: 'Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env.local' },
            { status: 500 }
        );
    }

    try {
        await dbConnect();

        const existingUser = await User.findOne({ email: ADMIN_EMAIL });
        if (existingUser) {
            return NextResponse.json(
                { message: 'Admin user already exists.' },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

        await User.create({
            email: ADMIN_EMAIL,
            password: hashedPassword,
        });

        return NextResponse.json(
            { message: '✅ Admin user created successfully!' },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Error seeding admin user.', error: (error as Error).message },
            { status: 500 }
        );
    }
}