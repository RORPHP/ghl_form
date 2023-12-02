'use server'
import { NextResponse } from "next/server";

import fsPromises from 'fs/promises';
import path from 'path';

const tokenFilePath = path.join(process.cwd(), '/private/credentials/token.json');

// To handle a GET request to /api
export async function GET(request) {

    const jsonData = await fsPromises.readFile(tokenFilePath);
    const objectData = JSON.parse(jsonData);

    return NextResponse.json({token:objectData}, { status: 200 });
}
