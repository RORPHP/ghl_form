'use server'
import { NextResponse } from "next/server";

import fsPromises from 'fs/promises';
import path from 'path';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// const tokenFilePath = path.join(process.cwd(), '/private/credentials/token.json');

// To handle a GET request to /api
export async function GET(request) {
    const oauth = await getOAuth()
    return NextResponse.json({token:oauth[0]}, { status: 200 });
}

async function getOAuth(body) {

  try {
    const oauthObj = await prisma.oauth.findMany({
            where: {
                location: process.env.NEXT_PUBLIC_GHL_LOCATION
            }
        })

    if(oauthObj.length > 0){
        return oauthObj;
    }else{
        return ['You are not authorised.'];
    }

  } catch (error) {
    console.error('Request error', error)
    return error;
  }
}