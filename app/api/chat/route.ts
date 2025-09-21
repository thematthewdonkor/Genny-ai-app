import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const POST = async (request: NextRequest) => {
  try {
    const { isAuthenticated } = await auth();

    // Protect the route by checking if the user is signed in
    if (!isAuthenticated) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { messages } = await request.json();

    const client = new Groq({
      apiKey: process.env.GROP_API_KEY!,
    });

    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages,
    });

    const assistantText = response.choices?.[0].message?.content || "";

    return new Response(JSON.stringify({ assistantText }));
  } catch (error) {
    console.log(error);
  }
};
