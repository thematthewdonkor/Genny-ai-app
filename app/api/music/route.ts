import Replicate from "replicate";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export const POST = async (request: NextRequest) => {
  try {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { prompt } = await request.json();

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e0",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);

    return new NextResponse("Internal error", { status: 500 });
  }
};
