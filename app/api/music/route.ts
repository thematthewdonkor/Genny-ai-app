import Replicate from "replicate";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export const POST = async (request: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { prompt } = await request.json();
    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const input = {
      prompt,
      bitrate: 256000,
      sample_rate: 44100,
      audio_format: "mp3",
    };

    const response = await replicate.run("minimax/music-1.5", { input });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Music API error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
