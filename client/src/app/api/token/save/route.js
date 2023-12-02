'use server'
import { NextRequest, NextResponse } from "next/server";

import fsPromises from 'fs/promises';
import path from 'path';

const tokenFilePath = path.join(process.cwd(), '/private/credentials/token.json');

// To handle a POST request to /api
export async function POST(request) {
  
  const body = await request.json();
  const updatedData = JSON.stringify(body.token);
  await fsPromises.writeFile(tokenFilePath, updatedData);

  return NextResponse.json({response:'Authorisation successfull'}, { status: 200 });
}

