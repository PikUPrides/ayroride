import { NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { RowDataPacket } from 'mysql2';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, company, phone, email, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required fields.' },
                { status: 400 }
            );
        }

        const [result] = await pool.execute<RowDataPacket[]>(
            'INSERT INTO contact_messages (name, company, phone, email, subject, message) VALUES (?, ?, ?, ?, ?, ?)',
            [name, company || null, phone || null, email, subject || null, message]
        );

        return NextResponse.json(
            { message: 'Message sent successfully', id: (result as any).insertId },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Database Error:', error);
        return NextResponse.json(
            {
                error: 'Failed to send message.',
                details: error.message,
                code: error.code,
                errno: error.errno,
                sqlState: error.sqlState,
                sqlMessage: error.sqlMessage,
                debug: {
                    hasHost: !!process.env.DB_HOST,
                    hasUser: !!process.env.DB_USER,
                    hasPass: !!process.env.DB_PASSWORD,
                    hasDb: !!process.env.DB_NAME,
                    // Show first 2 chars of user if exists, to verify it's loaded
                    userPrefix: process.env.DB_USER ? process.env.DB_USER.substring(0, 2) : 'MISSING'
                }
            },
            { status: 500 }
        );
    }
}
