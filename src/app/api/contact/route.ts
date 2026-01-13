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
                sqlMessage: error.sqlMessage
            },
            { status: 500 }
        );
    }
}
