'use server'
import { NextResponse } from "next/server";

import fsPromises from 'fs/promises';
import path from 'path';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const tokenFilePath = path.join(process.cwd(), '/private/credentials/token.json');

// To handle a GET request to /api
export async function GET(request) {

    // const jsonData = await fsPromises.readFile(tokenFilePath);
    // const objectData = JSON.parse(jsonData);

    // return NextResponse.json({token:objectData}, { status: 200 });

    const oauth = await getOAuth()

      // return {
      //   props : { oauth }
      // }

    // console.log(process.env.NEXT_PUBLIC_GHL_LOCATION)
    // console.log(oauth.length)

    return NextResponse.json({token:oauth[0]}, { status: 200 });
}


async function getOAuth(body) {

  // var date = new Date()
  // date.setDate(date.getDate() + 1)

  // return {
  //       location: body.token.locationId,
  //       refresh_token: body.token.refresh_token,
  //       access_token: body.token.access_token,
  //       user_id: body.token.userId,
  //       expire_at: date.toISOString()
  //     }

  try {
    const oauthObj = await prisma.oauth.findMany({
            where: {
                // id: { in: [1, 2, 12] },
                // location: process.env.NEXT_PUBLIC_GHL_LOCATION
                location: process.env.NEXT_PUBLIC_GHL_LOCATION
            }
        })
    // return res.status(200).json(oauthObj, { success: true })
    if(oauthObj.length > 0){
        return oauthObj;
    }else{
        return ['You are not authorised.'];
    }

  } catch (error) {
    console.error('Request error', error)
    // res.status(500).json({ response: 'Error creating question', success: false })
    return error;
  }
}