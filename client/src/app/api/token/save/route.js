'use server'
import { NextRequest, NextResponse } from "next/server";

import fsPromises from 'fs/promises';
import path from 'path';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// const tokenFilePath = path.join(process.cwd(), '/private/credentials/token.json');

// To handle a POST request to /api
export async function POST(request) {
  
  const body = await request.json();
  
  var response =  await getOAuth(body)

  return NextResponse.json({response:response}, { status: 200 });

}

async function getOAuth(body){
  try {
    const oauthObj = await prisma.oauth.findMany({
            where: {
                location: process.env.NEXT_PUBLIC_GHL_LOCATION
            }
        })

    if(oauthObj.length > 0){
      return await updateOAuth(body)
    }else{
      return await saveOAuth(body)
    }

  } catch (error) {
    console.error('Request error', error)
    return error;
  }
}

async function saveOAuth(body) {

  var date = new Date()
  date.setDate(date.getDate() + 1)

  try {
    const newEntry = await prisma.oauth.create({
      data: {
        location: body.token.locationId,
        refresh_token: body.token.refresh_token,
        access_token: body.token.access_token,
        user_id: body.token.userId,
        expire_at: date.toISOString()
      }
    })

    return 'Authorisation successfull';
  } catch (error) {
    console.error('Request error', error)
    return error;
  }
}

async function updateOAuth(body) {

  var date = new Date()
  date.setDate(date.getDate() + 1)

  try {

    const oauthUpdateObj = await prisma.oauth.update({
      where: { id: 1 },
      data: { refresh_token: body.token.refresh_token,access_token: body.token.access_token,expire_at: date.toISOString() },
    })

    return 'Authorisation updated successfully';
  } catch (error) {
    console.error('Request error', error)
    return error;
  }
}
