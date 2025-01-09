import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { revalidatePath } from "@node_modules/next/cache";

export const GET = async (request, { params: { id } }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log("erreur", error);
    return new Response("Error while fetching prompt", { status: 500 });
  }
};

export const PATCH = async (request, { params: { id } }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(id).populate("creator");

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    revalidatePath("/");
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log("erreur", error);
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params: { id } }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(id);

    return new Response("Prompt deted succesfully", { status: 200 });
  } catch (error) {
    console.log("erreur", error);
    return new Response("Error while deleting prompt", { status: 500 });
  }
};
