import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { revalidatePath } from "@node_modules/next/cache";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();

    const newPrompt = new Prompt({ creator: userId, tag, prompt });

    await newPrompt.save();

    revalidatePath("/");
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log("erreur", error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
