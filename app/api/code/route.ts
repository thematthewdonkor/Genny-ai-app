import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const client = new Groq({
  apiKey: process.env.GROP_API_KEY!,
});

export const POST = async (request: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { messages } = await request.json();

    if (!messages) {
      return new NextResponse("Message is required", { status: 400 });
    }

    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content:
            "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
        },
        ...messages,
      ],
    });

    return NextResponse.json(response.choices?.[0].message?.content);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
