import { NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, company, phone, email, subject, message, zip } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required fields.' },
                { status: 400 }
            );
        }

        // Validate Phone (US format) - optional but if provided must be valid
        if (phone) {
            const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
            if (!phoneRegex.test(phone)) {
                return NextResponse.json(
                    { error: 'Invalid phone number format. Use (XXX) XXX-XXXX' },
                    { status: 400 }
                );
            }
        }

        // Validate Zip (Texas format) - optional but if provided must be valid
        if (zip) {
            const zipRegex = /^7[5-9]\d{3}$/;
            if (!zipRegex.test(zip)) {
                return NextResponse.json(
                    { error: 'Invalid Texas Zip Code. Must be 5 digits and start with 75-79.' },
                    { status: 400 }
                );
            }
        }

        // Append Zip to message since we might not have a column for it
        let finalMessage = message;
        if (zip) {
            finalMessage += `\n\n[Zip Code: ${zip}]`;
        }

        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO contact_messages (name, company, phone, email, subject, message) VALUES (?, ?, ?, ?, ?, ?)',
            [name, company || null, phone || null, email, subject || null, finalMessage]
        );

        return NextResponse.json(
            { message: 'Message sent successfully', id: result.insertId },
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
                    activeEnvCheck: {
                        DB_HOST: process.env.DB_HOST || '(undefined)',
                        DB_USER: process.env.DB_USER || '(undefined)',
                        DB_NAME: process.env.DB_NAME || '(undefined)',
                        // Don't show full password, just 'SET' or 'NOT SET'
                        DB_PASSWORD_STATUS: process.env.DB_PASSWORD ? 'SET (Length: ' + process.env.DB_PASSWORD.length + ')' : 'NOT SET',
                    },
                    connectionConfig: {
                        host: process.env.DB_HOST,
                        user: process.env.DB_USER,
                        database: process.env.DB_NAME,
                    }
                }
            },
            { status: 500 }
        );
    }
}
